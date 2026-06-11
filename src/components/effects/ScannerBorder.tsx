import type { ReactNode } from 'react'

interface ScannerBorderProps {
  children: ReactNode
  className?: string
  /** Show the moving horizontal scan line (on by default). */
  scanning?: boolean
  /** Corner bracket color class, e.g. 'border-voltage'. */
  cornerClass?: string
}

/**
 * HUD-style frame: four glowing corner brackets and an optional
 * scan line sweeping vertically. Pure CSS — wraps any panel.
 */
export default function ScannerBorder({
  children,
  className = '',
  scanning = true,
  cornerClass = 'border-voltage',
}: ScannerBorderProps) {
  const corner = `absolute w-5 h-5 ${cornerClass} opacity-80 pointer-events-none`
  return (
    <div className={`relative ${className}`}>
      {children}
      <span aria-hidden="true" className={`${corner} top-0 left-0 border-t-2 border-l-2 rounded-tl-md`} />
      <span aria-hidden="true" className={`${corner} top-0 right-0 border-t-2 border-r-2 rounded-tr-md`} />
      <span aria-hidden="true" className={`${corner} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} />
      <span aria-hidden="true" className={`${corner} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} />
      {scanning && (
        <span
          aria-hidden="true"
          className="absolute inset-x-1 h-px pointer-events-none animate-scan-y"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.55), transparent)',
            boxShadow: '0 0 12px rgba(56,189,248,0.45)',
          }}
        />
      )}
    </div>
  )
}
