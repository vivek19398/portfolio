import { useRef, useState } from 'react'
import {
  compressImage,
  fileSlug,
  formatBytes,
  MEDIA_MAX_DIM,
  MEDIA_QUALITY,
  uploadToBucket,
  uploadTravelMedia,
  type TravelMediaUpload,
} from '../../lib/uploadMedia'

type UploadState = { phase: 'idle' } | { phase: 'busy'; msg: string } | { phase: 'error'; msg: string } | { phase: 'done'; msg: string }

function StatusLine({ state }: { state: UploadState }) {
  if (state.phase === 'idle') return null
  const color =
    state.phase === 'error' ? 'text-crimson' : state.phase === 'done' ? 'text-voltage' : 'text-ash'
  return (
    <p className={`text-xs mt-1.5 ${color}`} role={state.phase === 'error' ? 'alert' : 'status'}>
      {state.phase === 'busy' && '⟳ '}
      {state.phase === 'done' && '✓ '}
      {state.msg}
    </p>
  )
}

/**
 * "Upload image" button for any cover-image URL field: compresses in
 * the browser (WebP) and uploads to the given bucket, then fills the
 * URL via onUploaded.
 */
export function CoverUploadButton({
  bucket,
  onUploaded,
}: {
  bucket: string
  onUploaded: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploadState>({ phase: 'idle' })

  async function handleFile(file: File | undefined) {
    if (!file) return
    try {
      setState({ phase: 'busy', msg: 'Compressing…' })
      const blob = await compressImage(file, MEDIA_MAX_DIM, MEDIA_QUALITY)
      setState({ phase: 'busy', msg: `Uploading ${formatBytes(blob.size)}…` })
      const { publicUrl } = await uploadToBucket(bucket, `${fileSlug(file.name)}.webp`, blob, 'image/webp')
      onUploaded(publicUrl)
      setState({ phase: 'done', msg: `Uploaded (${formatBytes(blob.size)})` })
    } catch (e) {
      setState({ phase: 'error', msg: e instanceof Error ? e.message : 'Upload failed' })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="shrink-0">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={state.phase === 'busy'}
        onClick={() => inputRef.current?.click()}
        className="text-xs font-mono uppercase tracking-wider text-voltage border border-voltage/40 rounded-lg px-3 py-2 hover:bg-voltage/10 transition-colors disabled:opacity-50 whitespace-nowrap"
      >
        {state.phase === 'busy' ? 'Uploading…' : '⤒ Upload image'}
      </button>
      <StatusLine state={state} />
    </div>
  )
}

/**
 * Drop-zone for the Travel Media editor: picks an image or video,
 * compresses images + auto-generates the thumbnail, uploads both, and
 * fills media_type, public_url, thumbnail_url, and storage_path at once.
 */
export function MediaUploader({ onUploaded }: { onUploaded: (patch: TravelMediaUpload) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [state, setState] = useState<UploadState>({ phase: 'idle' })
  const [dragOver, setDragOver] = useState(false)

  async function handleFile(file: File | undefined) {
    if (!file) return
    try {
      const result = await uploadTravelMedia(file, (msg) => setState({ phase: 'busy', msg }))
      onUploaded(result)
      setState({
        phase: 'done',
        msg:
          result.media_type === 'image'
            ? 'Image + thumbnail uploaded — fields filled below.'
            : 'Video uploaded — fields filled below (add a thumbnail image if you like).',
      })
    } catch (e) {
      setState({ phase: 'error', msg: e instanceof Error ? e.message : 'Upload failed' })
    } finally {
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        disabled={state.phase === 'busy'}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          void handleFile(e.dataTransfer.files?.[0])
        }}
        className={`w-full rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors disabled:opacity-60 ${
          dragOver ? 'border-voltage bg-voltage/10' : 'border-white/15 hover:border-voltage/50'
        }`}
      >
        <span className="block text-sm text-mist font-medium">
          {state.phase === 'busy' ? 'Working…' : '⤒ Upload photo or video'}
        </span>
        <span className="block text-xs text-ash mt-1">
          Click or drop a file — images are auto-compressed to WebP and a thumbnail is generated for you.
          Videos upload as-is (compress under ~8 MB first; 50 MB max).
        </span>
      </button>
      <StatusLine state={state} />
    </div>
  )
}
