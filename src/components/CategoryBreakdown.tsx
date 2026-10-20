import { formatPeso } from '../lib/money'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types'

export function CategoryBreakdown({
  breakdown,
}: {
  breakdown: Partial<Record<ExpenseCategory, number>>
}) {
  const rows = EXPENSE_CATEGORIES.map((cat) => ({
    cat,
    amount: breakdown[cat] ?? 0,
  }))
    .filter((r) => r.amount > 0)
    .sort((a, b) => b.amount - a.amount)
  const total = rows.reduce((s, r) => s + r.amount, 0)

  if (total <= 0) {
    return <p className="text-[15px] text-muted">No spending this week.</p>
  }

  return (
    <ul className="space-y-4">
      {rows.map(({ cat, amount }, i) => (
        <li key={cat}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] font-semibold text-ink">{cat}</span>
            <span className="font-tabular text-[15px] text-body">
              {formatPeso(amount)}
            </span>
          </div>
          <div className="mt-1.5 h-[3px] bg-rule/60">
            <div
              className={`h-full ${i === 0 ? 'bg-accent' : 'bg-ink'}`}
              style={{ width: `${(amount / total) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
