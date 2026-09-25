import { Check, Clock, TriangleAlert } from 'lucide-react'
import { STAGES } from '../data/mockOrders'

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

/**
 * Renders the four-stage lifecycle as a vertical waybill-style timeline.
 * Stage state is derived, not stored, so it can't drift from currentStageIndex.
 */
export default function DeliveryTimeline({ order }) {
  const isDelayed = order.issue === 'delayed'

  return (
    <ol className="relative">
      {STAGES.map((stage, i) => {
        const isComplete = i < order.currentStageIndex
        const isCurrent = i === order.currentStageIndex
        const isFuture = i > order.currentStageIndex
        const isLast = i === STAGES.length - 1
        const historyEntry = order.history.find((h) => h.stage === stage)

        let circleClasses = 'border-2 border-surface-line bg-surface text-ink-soft/40'
        let icon = <span className="h-1.5 w-1.5 rounded-full bg-current" />

        if (isComplete) {
          circleClasses = 'bg-route border-2 border-route text-white'
          icon = <Check size={14} strokeWidth={3} />
        } else if (isCurrent && isDelayed) {
          circleClasses = 'bg-delay border-2 border-delay text-white'
          icon = <TriangleAlert size={14} strokeWidth={2.5} />
        } else if (isCurrent) {
          circleClasses = 'bg-stamp border-2 border-stamp text-white'
          icon = <Clock size={14} strokeWidth={2.5} />
        }

        return (
          <li key={stage} className="relative flex gap-4 pb-7 last:pb-0">
            {!isLast && (
              <span
                className={`absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-[2px] ${
                  isComplete ? 'bg-route' : 'bg-surface-line'
                }`}
                aria-hidden="true"
              />
            )}
            <span
              className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ${circleClasses}`}
            >
              {icon}
            </span>
            <div className="pt-1">
              <p
                className={`font-display text-[15px] font-medium ${
                  isFuture ? 'text-ink-soft/60' : 'text-ink'
                }`}
              >
                {isCurrent && isDelayed ? 'Delayed in transit' : stage}
              </p>
              {historyEntry && (
                <>
                  <p className="mt-0.5 text-sm text-ink-soft">{historyEntry.note}</p>
                  <p className="mt-1 text-xs text-ink-soft/70">{formatTime(historyEntry.timestamp)}</p>
                </>
              )}
              {isFuture && !historyEntry && (
                <p className="mt-0.5 text-sm text-ink-soft/50">Not yet reached</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
