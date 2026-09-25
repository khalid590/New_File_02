import { useEffect, useState } from 'react'
import OrderTrackingScreen from './components/OrderTrackingScreen'
import { LoadingScreen, ErrorScreen } from './components/StateScreens'
import { mockOrders, scenarioLabels } from './data/mockOrders'

const SCENARIOS = ['onTime', 'delayed', 'deliveredNotReceived', 'trackingPending', 'loading', 'error']

export default function App() {
  const [scenario, setScenario] = useState('onTime')
  const [ready, setReady] = useState(false)

  // Simulate a brief network fetch whenever the scenario changes, so the
  // loading state is genuinely reachable rather than only a static mock.
  useEffect(() => {
    setReady(false)
    if (scenario === 'loading' || scenario === 'error') return
    const t = setTimeout(() => setReady(true), 500)
    return () => clearTimeout(t)
  }, [scenario])

  const renderScreen = () => {
    if (scenario === 'error') return <ErrorScreen onRetry={() => setScenario('onTime')} />
    if (scenario === 'loading' || !ready) return <LoadingScreen />
    return <OrderTrackingScreen order={mockOrders[scenario]} />
  }

  return (
    <div className="font-body text-ink">
      {/* Demo-only control for reviewers to see every required state from one
          deployed URL. Not part of the product UI itself. */}
      <div className="sticky top-0 z-20 overflow-x-auto border-b border-surface-line bg-ink px-3 py-2">
        <div className="mx-auto flex max-w-[430px] gap-1.5">
          {SCENARIOS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setScenario(key)}
              className={`focus-ring shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                scenario === key ? 'bg-stamp text-ink' : 'bg-white/10 text-white/70'
              }`}
            >
              {scenarioLabels[key]}
            </button>
          ))}
        </div>
      </div>
      {renderScreen()}
    </div>
  )
}
