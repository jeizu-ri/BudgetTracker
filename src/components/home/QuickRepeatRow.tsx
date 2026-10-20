import type { RecentExpense } from '../../lib/money'
import { formatPeso } from '../../lib/money'
import type { ExpenseCategory } from '../../types'

export function QuickRepeatRow({
  recents,
  onRepeat,
}: {
  recents: RecentExpense[]
  onRepeat: (amount: number, category: ExpenseCategory) => void
}) {
  if (recents.length === 0) return null

  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {recents.map((r) => (
        <button
          key={`${r.category}-${r.amount}`}
          type="button"
          onClick={() => onRepeat(r.amount, r.category)}
          className="tap-highlight-none flex shrink-0 flex-col items-start rounded-frame bg-frame px-3.5 py-2.5 text-left active:opacity-80"
        >
          <span className="edge text-[11px] leading-none text-frame-muted">
            {r.category}
          </span>
          <span className="numeral mt-1.5 text-[22px] text-frame-ink">
            {formatPeso(r.amount)}
          </span>
        </button>
      ))}
    </div>
  )
}
