import { formatPeso } from '../lib/money'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types'

export function CategoryBreakdown({
  breakdown,
}: {
  breakdown: Partial<Record<ExpenseCategory, number>>
}) {
  const total = EXPENSE_CATEGORIES.reduce(
    (s, c) => s + (breakdown[c] ?? 0),
    0,
  )
  if (total <= 0) {
    return (
      <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
        No spending logged this week yet.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {EXPENSE_CATEGORIES.map((cat) => {
        const amount = breakdown[cat] ?? 0
        if (amount <= 0) return null
        const pct = (amount / total) * 100
        return (
          <li key={cat}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="font-medium text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
                {cat}
              </span>
              <span className="text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                {formatPeso(amount)}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--color-chip)] dark:bg-[var(--color-chip-dark)]">
              <div
                className="h-full rounded-full bg-[var(--color-accent)]/80 dark:bg-[var(--color-accent-dark)]/80"
                style={{ width: `${pct}%` }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
