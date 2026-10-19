import { motion, useReducedMotion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { CategoryBreakdown } from '../components/CategoryBreakdown'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
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
  const reduce = useReducedMotion()

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

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Week review
        </h1>
        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          {sunday
            ? 'Sunday check-in — no pressure, just clarity.'
            : 'Your week so far (full Sunday summary unlocks on Sunday).'}
        </p>
      </div>

      <motion.section
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-2"
      >
        {[
          { label: 'Received', value: summary.received },
          { label: 'Spent', value: summary.spent },
          {
            label: sunday ? 'Left' : 'Balance',
            value: sunday ? summary.left : balance,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-[var(--color-card)] p-3 text-center dark:bg-[var(--color-card-dark)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              {item.label}
            </p>
            <p className="mt-1 font-display text-lg font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
              {formatPeso(item.value)}
            </p>
          </div>
        ))}
      </motion.section>

      <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
        <h2 className="mb-3 font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Category breakdown
        </h2>
        <CategoryBreakdown breakdown={breakdown} />
      </section>

      {sunday && (
        <section className="rounded-[var(--radius-card)] bg-[var(--color-chip)]/70 p-4 dark:bg-[var(--color-chip-dark)]/80">
          <h2 className="font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
            Move your leftovers?
          </h2>
          {balance <= 0 ? (
            <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              Nothing to move right now — that’s fine. Your balance stays as is.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                You have {formatPeso(balance)} still spendable. Want to tuck some
                into a goal?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setMoveOpen(true)} disabled={!canMove}>
                  Move to a goal
                </Button>
                <Button variant="ghost" onClick={() => undefined}>
                  Skip — keep in balance
                </Button>
              </div>
            </>
          )}
        </section>
      )}

      <Sheet open={moveOpen} onOpenChange={setMoveOpen}>
        <SheetContent>
          <SheetTitle>Move leftovers</SheetTitle>
          <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            Pick one goal and an amount.
          </p>
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setSelectedGoal(g.id)}
                  className={`tap-highlight-none rounded-full px-4 py-2 text-sm font-semibold ${
                    selectedGoal === g.id
                      ? 'bg-[var(--color-accent)] text-white dark:bg-[var(--color-accent-dark)] dark:text-[#1a1028]'
                      : 'bg-[var(--color-chip)] text-[var(--color-heading)] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]'
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
              Confirm move
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
