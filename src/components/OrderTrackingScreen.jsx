import { useState } from 'react'
import { ChevronLeft, TriangleAlert, PackageSearch, CircleAlert, Truck } from 'lucide-react'
import DeliveryTimeline from './DeliveryTimeline'
import OrderSummaryCard from './OrderSummaryCard'
import SupportActions from './SupportActions'
import { ContactSupportSheet, ReportIssueSheet } from './SupportSheets'

function formatEstimate(iso) {
  const d = new Date(iso)
  const now = new Date('2026-09-25T12:00:00')
  const sameDay = d.toDateString() === now.toDateString()
  const dateLabel = sameDay
    ? 'today'
    : d.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })
  const timeLabel = d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  return { dateLabel, timeLabel }
}

/**
 * The status banner is the "clear at a glance" surface the brief asks for:
 * one line that names the situation and one line that names the next step,
 * with color and icon reinforcing (never carrying alone) the meaning.
 */
function StatusBanner({ order }) {
  if (order.issue === 'delayed') {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-delay/20 bg-delay-light px-4 py-3.5">
        <TriangleAlert size={20} className="mt-0.5 shrink-0 text-delay" />
        <div>
          <p className="font-display text-sm font-medium text-ink">Running later than expected</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            {order.delayReason} We\u2019ll email you the moment it moves again \u2014 no action needed yet.
          </p>
        </div>
      </div>
    )
  }

  if (order.issue === 'not_received') {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-delay/20 bg-delay-light px-4 py-3.5">
        <CircleAlert size={20} className="mt-0.5 shrink-0 text-delay" />
        <div>
          <p className="font-display text-sm font-medium text-ink">Marked delivered, but you flagged it missing</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Carrier noted "{order.deliveryNote}." Check nearby spots and with neighbors first \u2014 if it\u2019s
            still missing, report it below and we\u2019ll take it from there.
          </p>
        </div>
      </div>
    )
  }

  if (order.issue === 'tracking_pending') {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-route/15 bg-route-light px-4 py-3.5">
        <PackageSearch size={20} className="mt-0.5 shrink-0 text-route" />
        <div>
          <p className="font-display text-sm font-medium text-ink">Tracking is on its way</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Your order is confirmed. The carrier usually reports the first scan within 24 hours of pickup \u2014
            we\u2019ll update this page automatically.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-2xl border border-arrive/15 bg-arrive-light px-4 py-3.5">
      <Truck size={20} className="mt-0.5 shrink-0 text-arrive" />
      <div>
        <p className="font-display text-sm font-medium text-ink">On schedule</p>
        <p className="mt-0.5 text-sm text-ink-soft">Your order is on the truck for today\u2019s delivery.</p>
      </div>
    </div>
  )
}

export default function OrderTrackingScreen({ order }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  const estimate = formatEstimate(order.estimatedDelivery)
  const reportLabel = order.issue === 'not_received' ? 'Report not received' : 'Report an issue'

  return (
    <div className="mx-auto min-h-screen max-w-[430px] bg-surface-sunken pb-10">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-surface-line bg-surface/90 px-4 py-3.5 backdrop-blur">
        <button type="button" className="focus-ring -ml-1.5 rounded-full p-1.5 text-ink" aria-label="Back">
          <ChevronLeft size={22} />
        </button>
        <div>
          <p className="font-display text-[15px] font-semibold text-ink">Track order</p>
          <p className="text-xs text-ink-soft">{order.orderId}</p>
        </div>
      </header>

      <main className="space-y-4 px-4 pt-4">
        <StatusBanner order={order} />

        <section className="rounded-2xl border border-surface-line bg-surface p-4 shadow-card">
          <p className="text-xs font-medium text-ink-soft">
            {order.issue === 'not_received' ? 'Delivered' : 'Estimated delivery'}
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">
            {order.issue === 'not_received' ? 'Sep 19, 3:12 PM' : `${estimate.dateLabel}, ${estimate.timeLabel}`}
          </p>
          {order.trackingNumber && (
            <p className="mt-2 font-mono text-[13px] tracking-tight text-ink-soft">
              {order.carrier} \u00b7 {order.trackingNumber}
            </p>
          )}
        </section>

        <section className="rounded-2xl border border-surface-line bg-surface p-4 shadow-card">
          <p className="mb-4 text-xs font-medium text-ink-soft">Progress</p>
          <DeliveryTimeline order={order} />
        </section>

        <OrderSummaryCard order={order} expanded={detailsOpen} onToggle={() => setDetailsOpen((v) => !v)} />

        <SupportActions
          onContactSupport={() => setContactOpen(true)}
          onReportIssue={() => setReportOpen(true)}
          reportLabel={reportLabel}
        />
      </main>

      <ContactSupportSheet open={contactOpen} onClose={() => setContactOpen(false)} order={order} />
      <ReportIssueSheet open={reportOpen} onClose={() => setReportOpen(false)} order={order} />
    </div>
  )
}
