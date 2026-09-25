import { useState } from 'react'
import { Phone, Mail, MessageSquareText, CircleCheck } from 'lucide-react'
import Sheet from './Sheet'

const CONTACT_OPTIONS = [
  { key: 'chat', label: 'Chat with support', detail: 'Typical reply in under 3 minutes', icon: MessageSquareText },
  { key: 'call', label: 'Call support', detail: '(800) 555-0148 \u00b7 8am\u20138pm CT', icon: Phone },
  { key: 'email', label: 'Email support', detail: 'orders@example.com', icon: Mail },
]

export function ContactSupportSheet({ open, onClose, order }) {
  return (
    <Sheet open={open} onClose={onClose} title={`Contact support about ${order.orderId}`}>
      <p className="mb-4 text-sm text-ink-soft">
        A specialist can see this order\u2019s tracking history and shipping details automatically.
      </p>
      <div className="space-y-2">
        {CONTACT_OPTIONS.map(({ key, label, detail, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={onClose}
            className="focus-ring flex w-full items-center gap-3 rounded-xl border border-surface-line px-3.5 py-3 text-left active:scale-[0.99]"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-route-light text-route">
              <Icon size={16} />
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{label}</span>
              <span className="block text-xs text-ink-soft">{detail}</span>
            </span>
          </button>
        ))}
      </div>
    </Sheet>
  )
}

const REASONS_BY_SCENARIO = {
  delayed: ['Package still hasn\u2019t moved', 'I need it by a specific date', 'Something else'],
  deliveredNotReceived: [
    'I checked around the delivery location and it\u2019s not there',
    'A neighbor or front desk may have it',
    'I think this was delivered to the wrong address',
    'Something else',
  ],
  default: ['Item arrived damaged', 'Wrong item received', 'Missing item from order', 'Something else'],
}

export function ReportIssueSheet({ open, onClose, order }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const reasons = REASONS_BY_SCENARIO[order.scenario] || REASONS_BY_SCENARIO.default

  const handleClose = () => {
    onClose()
    // Reset after the close animation has time to run.
    setTimeout(() => {
      setSelected(null)
      setSubmitted(false)
    }, 200)
  }

  if (submitted) {
    return (
      <Sheet open={open} onClose={handleClose} title="Report received">
        <div className="flex flex-col items-center py-4 text-center">
          <span className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-arrive-light text-arrive">
            <CircleCheck size={26} />
          </span>
          <p className="text-sm text-ink">
            We\u2019ve flagged order {order.orderId} for review. A specialist will follow up by email within 24
            hours, and you won\u2019t need to reorder in the meantime.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="focus-ring mt-5 w-full rounded-xl bg-ink py-3 text-sm font-medium text-white active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </Sheet>
    )
  }

  return (
    <Sheet open={open} onClose={handleClose} title={`Report a delivery issue`}>
      <p className="mb-4 text-sm text-ink-soft">Order {order.orderId} \u00b7 what\u2019s going on?</p>
      <div className="space-y-2">
        {reasons.map((reason) => (
          <label
            key={reason}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
              selected === reason ? 'border-route bg-route-light text-ink' : 'border-surface-line text-ink'
            }`}
          >
            <input
              type="radio"
              name="issue-reason"
              className="h-4 w-4 accent-route"
              checked={selected === reason}
              onChange={() => setSelected(reason)}
            />
            {reason}
          </label>
        ))}
      </div>
      <button
        type="button"
        disabled={!selected}
        onClick={() => setSubmitted(true)}
        className="focus-ring mt-4 w-full rounded-xl bg-ink py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-ink-soft/30 disabled:text-ink-soft active:scale-[0.98]"
      >
        Submit report
      </button>
    </Sheet>
  )
}
