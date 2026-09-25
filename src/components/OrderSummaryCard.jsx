import { Package, MapPin } from 'lucide-react'

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function OrderSummaryCard({ order, expanded, onToggle }) {
  const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="rounded-2xl border border-surface-line bg-surface shadow-card">
      <button
        type="button"
        onClick={onToggle}
        className="focus-ring flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3.5"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-route-light text-route">
            <Package size={18} />
          </span>
          <div className="text-left">
            <p className="font-display text-sm font-medium text-ink">Order {order.orderId}</p>
            <p className="text-xs text-ink-soft">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} · placed {formatDate(order.placedAt)}
            </p>
          </div>
        </div>
        <span className="text-xs font-medium text-route">{expanded ? 'Hide details' : 'View details'}</span>
      </button>

      {expanded && (
        <div className="border-t border-surface-line px-4 pb-4 pt-3">
          <ul className="divide-y divide-surface-line">
            {order.items.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <span className="text-ink">
                  {item.name}
                  <span className="text-ink-soft"> ×{item.qty}</span>
                </span>
                <span className="text-ink-soft">${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t border-surface-line pt-2.5 text-sm font-medium">
            <span className="text-ink">Total</span>
            <span className="text-ink">${total.toFixed(2)}</span>
          </div>
          <div className="mt-3.5 flex items-start gap-2 rounded-xl bg-surface-sunken px-3 py-2.5 text-sm text-ink-soft">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            <span>{order.address}</span>
          </div>
        </div>
      )}
    </div>
  )
}
