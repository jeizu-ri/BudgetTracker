import { Plus, Wallet } from 'lucide-react'
import { AnimatedBalance } from '../AnimatedBalance'
import { Button } from '../ui/button'
import { formatPeso } from '../../lib/money'
import type { Entry } from '../../types'
import { WeekFrames } from './WeekFrames'

/** The balance is printed straight on the sheet, then the week's frames, then the actions. */
export function BalanceHero({
  balance,
  pace,
  daysUntilMonday,
  overAmount,
  entries,
  onFixBalance,
  onLogExpense,
  onAddAllowance,
}: {
  balance: number
  pace: number
  daysUntilMonday: number
  overAmount: number | null
  entries: Entry[]
  onFixBalance: () => void
  onLogExpense: () => void
  onAddAllowance: () => void
}) {
  return (
    <section aria-label="Current balance" className="space-y-6">
      <div>
        <p className="edge text-sm leading-none text-muted">Spendable</p>
        <div className="mt-2">
          <AnimatedBalance value={balance} />
        </div>
        <p className="mt-3 text-[15px] text-body">
          <span className="font-tabular font-semibold text-ink">
            {formatPeso(pace)}
          </span>{' '}
          a day for {daysUntilMonday} {daysUntilMonday === 1 ? 'day' : 'days'}{' '}
          until Monday
        </p>
        {overAmount != null && (
          <p className="mt-2 text-sm font-medium text-warn">
            About {formatPeso(overAmount)} over this week.
          </p>
        )}
      </div>

      <WeekFrames entries={entries} onTodayPress={onLogExpense} />

      <div className="space-y-2">
        <Button size="lg" className="w-full" onClick={onLogExpense}>
          <Plus className="h-5 w-5" strokeWidth={2.25} />
          Log expense
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={onAddAllowance}
        >
          <Wallet className="h-5 w-5" strokeWidth={1.75} />
          Add allowance
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted hover:text-ink"
          onClick={onFixBalance}
        >
          Fix my balance
        </Button>
      </div>
    </section>
  )
}
