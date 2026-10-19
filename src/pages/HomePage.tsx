import { motion, useReducedMotion } from 'framer-motion'
import { Plus, Trash2, Wrench } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AnimatedBalance } from '../components/AnimatedBalance'
import { CategoryBreakdown } from '../components/CategoryBreakdown'
import { QuickAddSheet } from '../components/QuickAddSheet'
import { RememberWhyCard } from '../components/RememberWhyCard'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
import { useBudget } from '../contexts/BudgetContext'
import { daysUntilNextMonday, isMondayInManila } from '../lib/dates'
import {
  balanceFixDelta,
  calculateBalance,
  categoryBreakdown,
  dailyPace,
  formatPeso,
  recentExpensePresets,
  weeklyOverspend,
} from '../lib/money'
import type { ExpenseCategory } from '../types'

export function HomePage() {
  const { entries, settings, addEntry, removeEntry } = useBudget()
  const balance = useMemo(
    () => calculateBalance(settings.startingBalance, entries),
    [settings.startingBalance, entries],
  )
  const days = daysUntilNextMonday()
  const pace = dailyPace(balance, days)
  const over = weeklyOverspend(entries)
  const breakdown = useMemo(() => categoryBreakdown(entries), [entries])
  const recents = useMemo(() => recentExpensePresets(entries), [entries])

  const [quickOpen, setQuickOpen] = useState(false)
  const [preset, setPreset] = useState<{
    amount?: string
    category?: ExpenseCategory
  }>({})
  const [allowanceOpen, setAllowanceOpen] = useState(false)
  const [allowanceAmount, setAllowanceAmount] = useState('4000')
  const [fixOpen, setFixOpen] = useState(false)
  const [realCash, setRealCash] = useState('')
  const reduce = useReducedMotion()

  const recentList = useMemo(
    () =>
      [...entries]
        .sort((a, b) => b.timestamp - a.timestamp)
        .filter((e) => e.type === 'expense')
        .slice(0, 8),
    [entries],
  )

  const logExpense = async (amount: number, category: ExpenseCategory) => {
    await addEntry({
      timestamp: Date.now(),
      type: 'expense',
      amount,
      category,
    })
  }

  const onAllowance = async () => {
    const n = Number(allowanceAmount)
    if (!n || n <= 0) return
    await addEntry({ timestamp: Date.now(), type: 'income', amount: n })
    setAllowanceOpen(false)
  }

  const onFixBalance = async () => {
    const real = Number(realCash)
    if (Number.isNaN(real)) return
    const delta = balanceFixDelta(balance, real)
    if (delta === 0) {
      setFixOpen(false)
      return
    }
    await addEntry({
      timestamp: Date.now(),
      type: 'balance_fix',
      amount: delta,
    })
    setFixOpen(false)
    setRealCash('')
  }

  return (
    <div className="space-y-5 pb-4">
      {isMondayInManila() && (
        <motion.button
          type="button"
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setAllowanceOpen(true)}
          className="tap-highlight-none w-full rounded-[var(--radius-card)] bg-[var(--color-chip)] px-4 py-3 text-left text-sm font-medium text-[var(--color-heading)] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]"
        >
          Did your allowance come in? Tap to log it →
        </motion.button>
      )}

      <section
        className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#7c3aed] via-[#6d28d9] to-[#5b21b6] p-6 shadow-[0_20px_50px_-20px_rgba(91,33,182,0.65)]"
      >
        <p className="text-sm font-medium text-white/80">Available now</p>
        <div className="mt-2">
          <AnimatedBalance value={balance} />
        </div>
        <p className="mt-4 text-sm text-white/85">
          About {formatPeso(pace)} a day until Monday
        </p>
        {over != null && (
          <p className="mt-2 text-sm font-medium text-[#f5c4cb]">
            You’re {formatPeso(over)} over for the week — still okay, just a
            nudge.
          </p>
        )}
        <Button
          variant="secondary"
          size="sm"
          className="mt-4 bg-white/15 text-white hover:bg-white/25"
          onClick={() => setFixOpen(true)}
        >
          <Wrench className="h-4 w-4" />
          Fix my balance
        </Button>
      </section>

      <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
              Quick add
            </p>
            <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              Amount → category → done
            </p>
          </div>
          <Button
            size="icon"
            className="rounded-2xl"
            onClick={() => {
              setPreset({})
              setQuickOpen(true)
            }}
            aria-label="Add expense"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        {recents.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {recents.map((r) => (
              <button
                key={`${r.category}-${r.amount}`}
                type="button"
                className="tap-highlight-none rounded-full bg-[var(--color-chip)] px-3 py-2 text-sm font-semibold text-[var(--color-heading)] active:scale-[0.97] dark:bg-[var(--color-chip-dark)] dark:text-[var(--color-heading-dark)]"
                onClick={() => logExpense(r.amount, r.category)}
              >
                {r.category} {formatPeso(r.amount)}
              </button>
            ))}
          </div>
        )}
      </section>

      <RememberWhyCard />

      <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
        <h2 className="mb-3 font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Where it went this week
        </h2>
        <CategoryBreakdown breakdown={breakdown} />
      </section>

      {recentList.length > 0 && (
        <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
          <h2 className="mb-3 font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
            Recent expenses
          </h2>
          <ul className="space-y-2">
            {recentList.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between gap-2 rounded-2xl bg-[var(--color-chip)]/60 px-3 py-2.5 dark:bg-[var(--color-chip-dark)]/80"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
                    {e.category} · {formatPeso(e.amount)}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                    {new Date(e.timestamp).toLocaleString('en-PH', {
                      timeZone: 'Asia/Manila',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  className="tap-highlight-none rounded-xl p-2 text-[var(--color-muted)] hover:bg-white/50 dark:hover:bg-black/20"
                  aria-label="Delete entry"
                  onClick={() => removeEntry(e.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <QuickAddSheet
        open={quickOpen}
        onOpenChange={setQuickOpen}
        onAdd={logExpense}
        initialAmount={preset.amount}
        initialCategory={preset.category}
      />

      <Sheet open={allowanceOpen} onOpenChange={setAllowanceOpen}>
        <SheetContent>
          <SheetTitle>Allowance in</SheetTitle>
          <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            How much came in today?
          </p>
          <div className="mt-5 space-y-3">
            <Input
              inputMode="decimal"
              value={allowanceAmount}
              onChange={(e) =>
                setAllowanceAmount(e.target.value.replace(/[^\d.]/g, ''))
              }
              className="text-xl font-semibold"
            />
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setAllowanceAmount('4000')}
            >
              ₱4,000
            </Button>
            <Button size="lg" className="w-full" onClick={onAllowance}>
              Add to balance
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={fixOpen} onOpenChange={setFixOpen}>
        <SheetContent>
          <SheetTitle>Fix my balance</SheetTitle>
          <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            Type how much cash you actually have. We’ll log the gap as unlogged
            spending.
          </p>
          <div className="mt-5 space-y-3">
            <Input
              inputMode="decimal"
              placeholder="Real cash on hand"
              value={realCash}
              onChange={(e) =>
                setRealCash(e.target.value.replace(/[^\d.]/g, ''))
              }
              className="text-xl font-semibold"
            />
            <Button size="lg" className="w-full" onClick={onFixBalance}>
              Update balance
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
