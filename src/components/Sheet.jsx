import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[430px] rounded-t-2xl bg-surface px-5 pb-6 pt-4 shadow-card animate-[sheet-up_0.2s_ease-out]"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
      >
        <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-surface-line" />
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-base font-medium text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring -mr-1 -mt-1 rounded-full p-1.5 text-ink-soft"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
      <style>{`
        @keyframes sheet-up {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="sheet-up"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
