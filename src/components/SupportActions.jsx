import { MessageCircle, FileWarning } from 'lucide-react'

export default function SupportActions({ onContactSupport, onReportIssue, reportLabel }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onContactSupport}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-surface-line bg-surface py-3 text-sm font-medium text-ink shadow-card active:scale-[0.98]"
      >
        <MessageCircle size={16} />
        Contact support
      </button>
      <button
        type="button"
        onClick={onReportIssue}
        className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-surface-line bg-surface py-3 text-sm font-medium text-ink shadow-card active:scale-[0.98]"
      >
        <FileWarning size={16} />
        {reportLabel || 'Report an issue'}
      </button>
    </div>
  )
}
