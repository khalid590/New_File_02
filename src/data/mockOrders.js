// Static mock data. In a real app these would come from an orders/tracking API.
// Each order uses the same four-stage lifecycle the current app already has
// (Processing -> Shipped -> Out for Delivery -> Delivered), plus metadata the
// redesign needs to explain delays, disputes, and "no tracking yet" clearly.

export const STAGES = ['Processing', 'Shipped', 'Out for delivery', 'Delivered']

const baseItems = [
  { name: 'Ceramic pour-over dripper', qty: 1, price: 28 },
  { name: 'Bag of light roast beans, 12oz', qty: 2, price: 36 },
]

export const mockOrders = {
  // 1. Healthy order, on schedule, currently out for delivery.
  onTime: {
    scenario: 'onTime',
    orderId: '#48219',
    trackingNumber: '1Z999AA10123456784',
    carrier: 'UPS',
    placedAt: '2026-09-22T14:32:00',
    estimatedDelivery: '2026-09-25T20:00:00',
    currentStageIndex: 2,
    issue: null,
    history: [
      { stage: 'Processing', timestamp: '2026-09-22T14:32:00', note: 'Order confirmed and being prepared.' },
      { stage: 'Shipped', timestamp: '2026-09-23T09:10:00', note: 'Left the Columbus, OH facility.' },
      { stage: 'Out for delivery', timestamp: '2026-09-25T07:45:00', note: 'On the truck for today\u2019s delivery.' },
    ],
    items: baseItems,
    address: '118 Birchwood Ave, Apt 3, Austin, TX 78702',
  },

  // 2. Delayed — estimated window has passed.
  delayed: {
    scenario: 'delayed',
    orderId: '#48117',
    trackingNumber: '1Z999AA10199887766',
    carrier: 'UPS',
    placedAt: '2026-09-18T11:05:00',
    estimatedDelivery: '2026-09-23T20:00:00',
    currentStageIndex: 1,
    issue: 'delayed',
    delayReason: 'Weather delays at the regional sorting facility.',
    history: [
      { stage: 'Processing', timestamp: '2026-09-18T11:05:00', note: 'Order confirmed and being prepared.' },
      { stage: 'Shipped', timestamp: '2026-09-19T16:20:00', note: 'Left the Columbus, OH facility.' },
      { stage: 'In transit', timestamp: '2026-09-22T08:00:00', note: 'Held at regional facility \u2014 severe weather.' },
    ],
    items: baseItems,
    address: '118 Birchwood Ave, Apt 3, Austin, TX 78702',
  },

  // 3. Marked delivered, but the customer says it never arrived.
  deliveredNotReceived: {
    scenario: 'deliveredNotReceived',
    orderId: '#47960',
    trackingNumber: '1Z999AA10188112233',
    carrier: 'UPS',
    placedAt: '2026-09-15T09:40:00',
    estimatedDelivery: '2026-09-19T20:00:00',
    currentStageIndex: 3,
    issue: 'not_received',
    deliveredAt: '2026-09-19T15:12:00',
    deliveryNote: 'Left at front door',
    history: [
      { stage: 'Processing', timestamp: '2026-09-15T09:40:00', note: 'Order confirmed and being prepared.' },
      { stage: 'Shipped', timestamp: '2026-09-16T10:00:00', note: 'Left the Columbus, OH facility.' },
      { stage: 'Out for delivery', timestamp: '2026-09-19T08:30:00', note: 'On the truck for today\u2019s delivery.' },
      { stage: 'Delivered', timestamp: '2026-09-19T15:12:00', note: 'Left at front door.' },
    ],
    items: baseItems,
    address: '118 Birchwood Ave, Apt 3, Austin, TX 78702',
  },

  // 4. Order exists but the carrier hasn't reported tracking yet.
  trackingPending: {
    scenario: 'trackingPending',
    orderId: '#48304',
    trackingNumber: null,
    carrier: 'UPS',
    placedAt: '2026-09-25T08:15:00',
    estimatedDelivery: '2026-09-29T20:00:00',
    currentStageIndex: 0,
    issue: 'tracking_pending',
    history: [
      { stage: 'Processing', timestamp: '2026-09-25T08:15:00', note: 'Order confirmed and being prepared.' },
    ],
    items: baseItems,
    address: '118 Birchwood Ave, Apt 3, Austin, TX 78702',
  },
}

export const scenarioLabels = {
  onTime: 'On time',
  delayed: 'Delayed',
  deliveredNotReceived: 'Delivered, not received',
  trackingPending: 'Tracking not available yet',
  loading: 'Loading',
  error: 'Error',
}
