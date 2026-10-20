import { useMemo, useState } from 'react'
import { CategoryBreakdown } from '../components/CategoryBreakdown'
import { GoalHistory } from '../components/GoalHistory'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
import { SectionTitle } from '../components/ui/section-title'
import { useBudget } from '../contexts/BudgetContext'
import { isSundayInManila } from '../lib/dates'
import {
  calculateBalance,
  categoryBreakdown,
  formatPeso,
  weekSummary,
} from '../lib/money'

export function ReviewPage() {
  const { entries, goals, settings, addEntry } = useBudget()
  const balance = useMemo(
    () => calculateBalance(settings.startingBalance, entries),
    [settings.startingBalance, entries],
  )
  const summary = useMemo(() => weekSummary(entries), [entries])
  const breakdown = useMemo(() => categoryBreakdown(entries), [entries])
  const sunday = isSundayInManila()

  const [keepDismissed, setKeepDismissed] = useState(false)
  const [moveOpen, setMoveOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)
  const [moveAmount, setMoveAmount] = useState('')

  const canMove = balance > 0 && goals.length > 0

  const onMove = async () => {
    if (!selectedGoal) return
    const n = Number(moveAmount)
    if (!n || n <= 0 || n > balance) return
    await addEntry({
      timestamp: Date.now(),
      type: 'goal_deposit',
      amount: n,
      goalId: selectedGoal,
    })
    setMoveOpen(false)
    setMoveAmount('')
    setSelectedGoal(null)
  }

  const stats = [
    { label: 'In', value: summary.received },
    { label: 'Out', value: summary.spent },
    {
      label: sunday ? 'Left' : 'Balance',
      value: sunday ? summary.left : balance,
    },
  ]

  return (
    <div className="page-stack">
      <PageIntro
        title="Review"
        description={
          sunday
            ? 'Sunday — move leftovers if you want.'
            : 'Week totals (Mon–Sun, Manila time).'
        }
      />

      <section>
        <dl className="border-t border-rule">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between border-b border-rule py-3.5"
            >
              <dt className="edge text-base leading-none text-muted">
                {item.label}
              </dt>
              <dd className="numeral text-[34px] text-ink">
                {formatPeso(item.value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <SectionTitle>Categories</SectionTitle>
        <div className="mt-4">
          <CategoryBreakdown breakdown={breakdown} />
        </div>
      </section>

      <GoalHistory entries={entries} goals={goals} />

      {sunday && !keepDismissed && (
        <section>
          <SectionTitle>Leftovers</SectionTitle>
          {balance <= 0 ? (
            <p className="mt-4 text-[15px] text-muted">Nothing left to move.</p>
          ) : (
            <>
              <p className="mt-4 text-[15px] text-body">
                {formatPeso(balance)} still spendable.
              </p>
              <div className="mt-4 flex flex-col gap-1">
                <Button onClick={() => setMoveOpen(true)} disabled={!canMove}>
                  Move to a goal
                </Button>
                <Button
                  variant="ghost"
                  className="text-muted hover:text-ink"
                  onClick={() => setKeepDismissed(true)}
                >
                  Keep in balance
                </Button>
              </div>
            </>
          )}
        </section>
      )}
      <Sheet open={moveOpen} onOpenChange={setMoveOpen}>
        <SheetContent>
          <SheetTitle>Move to goal</SheetTitle>
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap gap-x-3 gap-y-3" role="group" aria-label="Goal">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoal(g.id)}
                  aria-pressed={selectedGoal === g.id}
                  className={`tap-highlight-none relative min-h-11 rounded-control border px-4 text-[15px] font-semibold ${
                    selectedGoal === g.id
                      ? 'border-frame bg-frame text-frame-ink'
                      : 'border-rule text-ink'
                  }`}
                >
                  {g.name}
                </button>
              ))}
            </div>
            <Input
              inputMode="decimal"
              placeholder="Amount"
              value={moveAmount}
              onChange={(e) =>
                setMoveAmount(e.target.value.replace(/[^\d.]/g, ''))
              }
            />
            <Button
              size="lg"
              className="w-full"
              disabled={!selectedGoal}
              onClick={onMove}
            >
              Confirm
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
