import { supabase } from './supabase'

/**
 * Client-side media pipeline for the admin dashboard:
 * compress images in the browser (canvas → WebP) so uploads stay
 * free-tier friendly, then push to Supabase Storage with the
 * authenticated admin session. RLS storage policies only allow
 * authenticated writes, so this never works for anonymous visitors.
 */

/** Free-tier friendly compression targets. */
export const MEDIA_MAX_DIM = 1600 // px, long edge of full images
export const MEDIA_QUALITY = 0.8
export const THUMB_MAX_DIM = 420
export const THUMB_QUALITY = 0.7
export const VIDEO_MAX_BYTES = 50 * 1024 * 1024 // hard cap
export const VIDEO_WARN_BYTES = 8 * 1024 * 1024 // advisory

/** Timestamped, url-safe storage filename from the original name. */
export function fileSlug(name: string): string {
  const base =
    name
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 40) || 'file'
  return `${Date.now()}-${base}`
}

export function formatBytes(n: number): string {
  return n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`
}

/** Downscale + re-encode an image to WebP entirely in the browser. */
export async function compressImage(file: File, maxDim: number, quality: number): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const w = Math.max(1, Math.round(bitmap.width * scale))
  const h = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas not supported in this browser')
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', quality))
  if (!blob) throw new Error('Image compression failed')
  return blob
}

export interface UploadResult {
  path: string
  publicUrl: string
}

/** Upload to a public bucket and return its public URL. */
export async function uploadToBucket(
  bucket: string,
  path: string,
  body: Blob | File,
  contentType: string,
): Promise<UploadResult> {
  if (!supabase) throw new Error('Supabase is not configured')
  const { error } = await supabase.storage.from(bucket).upload(path, body, {
    contentType,
    cacheControl: '31536000', // 1 year — files are timestamp-named, never reused
    upsert: false,
  })
  if (error) throw new Error(error.message)
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { path, publicUrl: data.publicUrl }
}

export interface TravelMediaUpload {
  media_type: 'image' | 'video'
  public_url: string
  thumbnail_url: string | null
  storage_path: string
}

/**
 * One-shot travel media upload:
 *  - images: compressed full-size → travel-media, auto-generated
 *    thumbnail → travel-thumbnails
 *  - videos: uploaded as-is to travel-media (compress before choosing
 *    the file; hard-capped at 50 MB)
 */
export async function uploadTravelMedia(
  file: File,
  onStatus?: (msg: string) => void,
): Promise<TravelMediaUpload> {
  const slug = fileSlug(file.name)

  if (file.type.startsWith('video/')) {
    if (file.size > VIDEO_MAX_BYTES) {
      throw new Error(`Video is ${formatBytes(file.size)} — compress it under 50 MB first (e.g. HandBrake, H.264 720p).`)
    }
    onStatus?.(`Uploading video (${formatBytes(file.size)})…`)
    const ext = file.name.split('.').pop() || 'mp4'
    const media = await uploadToBucket('travel-media', `${slug}.${ext}`, file, file.type)
    return { media_type: 'video', public_url: media.publicUrl, thumbnail_url: null, storage_path: media.path }
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Unsupported file type — choose an image or a video.')
  }

  onStatus?.('Compressing image…')
  const full = await compressImage(file, MEDIA_MAX_DIM, MEDIA_QUALITY)
  const thumb = await compressImage(file, THUMB_MAX_DIM, THUMB_QUALITY)

  onStatus?.(`Uploading image (${formatBytes(full.size)}) + thumbnail (${formatBytes(thumb.size)})…`)
  const media = await uploadToBucket('travel-media', `${slug}.webp`, full, 'image/webp')
  const thumbnail = await uploadToBucket('travel-thumbnails', `${slug}-thumb.webp`, thumb, 'image/webp')

  return {
    media_type: 'image',
    public_url: media.publicUrl,
    thumbnail_url: thumbnail.publicUrl,
    storage_path: media.path,
  }
}
