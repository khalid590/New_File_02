import { WifiOff, RotateCw } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col gap-5 bg-surface-sunken px-4 pb-8 pt-6">
      <div className="animate-pulse space-y-5" role="status" aria-label="Loading order tracking">
        <div className="h-6 w-40 rounded-md bg-surface-line" />
        <div className="rounded-2xl border border-surface-line bg-surface p-4">
          <div className="h-4 w-24 rounded bg-surface-line" />
          <div className="mt-3 h-3 w-full rounded bg-surface-line" />
          <div className="mt-2 h-2 w-2/3 rounded bg-surface-line" />
        </div>
        <div className="space-y-4 rounded-2xl border border-surface-line bg-surface p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-surface-line" />
              <div className="h-3 w-32 rounded bg-surface-line" />
            </div>
          ))}
        </div>
        <div className="h-24 rounded-2xl border border-surface-line bg-surface" />
      </div>
      <span className="sr-only">Loading order tracking\u2026</span>
    </div>
  )
}

export function ErrorScreen({ onRetry }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-[430px] flex-col items-center justify-center gap-4 bg-surface-sunken px-6 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-delay-light text-delay">
        <WifiOff size={26} />
      </span>
      <div>
        <p className="font-display text-lg font-medium text-ink">Couldn\u2019t load tracking</p>
        <p className="mt-1.5 text-sm text-ink-soft">
          Check your connection and try again. Your order hasn\u2019t been affected.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="focus-ring mt-2 flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white active:scale-[0.98]"
      >
        <RotateCw size={15} />
        Try again
      </button>
    </div>
  )
}
