import { useMemo, useState } from 'react'
import { CategoryBreakdown } from '../components/CategoryBreakdown'
import { QuickAddSheet } from '../components/QuickAddSheet'
import { RecentActivity } from '../components/RecentActivity'
import { RememberWhyCard } from '../components/RememberWhyCard'
import { UndoToast } from '../components/UndoToast'
import { BalanceHero } from '../components/home/BalanceHero'
import { QuickRepeatRow } from '../components/home/QuickRepeatRow'
import { useOfferUndo } from '../hooks/useOfferUndo'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
import { SectionTitle } from '../components/ui/section-title'
import { useBudget } from '../contexts/BudgetContext'
import { daysUntilNextMonday } from '../lib/dates'
import {
  balanceFixDelta,
  calculateBalance,
  categoryBreakdown,
  dailyPace,
  formatPeso,
  recentAllowanceAmounts,
  recentExpensePresets,
  weeklyOverspend,
} from '../lib/money'
import type { ExpenseCategory } from '../types'

export function HomePage() {
  const { entries, goals, settings, addEntry, removeEntry } = useBudget()
  const { undoMessage, offerUndo, dismissUndo, performUndo } =
    useOfferUndo(removeEntry)
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
  const [allowanceAmount, setAllowanceAmount] = useState('')
  const allowanceValue = Number(allowanceAmount) || 0
  const allowanceChips = useMemo(() => recentAllowanceAmounts(entries), [entries])
  const [fixOpen, setFixOpen] = useState(false)
  const [realCash, setRealCash] = useState('')

  const logExpense = async (amount: number, category: ExpenseCategory) => {
    const id = await addEntry({
      timestamp: Date.now(),
      type: 'expense',
      amount,
      category,
    })
    await offerUndo(id, `Logged ${category} ${formatPeso(amount)}`)
  }

  const onAllowance = async () => {
    const n = Number(allowanceAmount)
    if (!n || n <= 0) return
    const id = await addEntry({ timestamp: Date.now(), type: 'income', amount: n })
    setAllowanceOpen(false)
    setAllowanceAmount('')
    await offerUndo(id, `Added allowance ${formatPeso(n)}`)
  }

  const onFixBalance = async () => {
    if (realCash.trim() === '') return
    const real = Number(realCash)
    if (Number.isNaN(real)) return
    const delta = balanceFixDelta(balance, real)
    if (delta === 0) {
      setFixOpen(false)
      return
    }
    const id = await addEntry({
      timestamp: Date.now(),
      type: 'balance_fix',
      amount: delta,
    })
    setFixOpen(false)
    setRealCash('')
    await offerUndo(id, 'Balance updated')
  }

  return (
    <div className="page-stack">
      <BalanceHero
        balance={balance}
        pace={pace}
        daysUntilMonday={days}
        overAmount={over}
        entries={entries}
        onFixBalance={() => setFixOpen(true)}
        onAddAllowance={() => {
          setAllowanceAmount('')
          setAllowanceOpen(true)
        }}
        onLogExpense={() => {
          setPreset({})
          setQuickOpen(true)
        }}
      />

      {recents.length > 0 && (
        <section>
          <SectionTitle className="mb-3">Log again</SectionTitle>
          <QuickRepeatRow recents={recents} onRepeat={logExpense} />
        </section>
      )}

      <RememberWhyCard />

      <section>
        <SectionTitle>This week</SectionTitle>
        <div className="mt-4">
          <CategoryBreakdown breakdown={breakdown} />
        </div>
      </section>

      <RecentActivity
        entries={entries}
        goals={goals}
        onUndo={(id) => removeEntry(id)}
      />

      <UndoToast
        message={undoMessage}
        onUndo={performUndo}
        onDismiss={dismissUndo}
      />

      <QuickAddSheet
        open={quickOpen}
        onOpenChange={setQuickOpen}
        onAdd={logExpense}
        initialAmount={preset.amount}
        initialCategory={preset.category}
      />

      <Sheet open={allowanceOpen} onOpenChange={setAllowanceOpen}>
        <SheetContent>
          <SheetTitle>Add allowance</SheetTitle>
          <p className="mt-2 text-sm text-muted">
            Type what you just received. It is added to what you have left.
          </p>
          <div className="mt-5 space-y-4">
            <Input
              inputMode="decimal"
              placeholder="Amount received"
              aria-label="Allowance received in pesos"
              value={allowanceAmount}
              onChange={(e) =>
                setAllowanceAmount(e.target.value.replace(/[^\d.]/g, ''))
              }
              className="h-14 text-2xl font-semibold"
              autoFocus
            />

            <div
              className="flex flex-wrap gap-x-3 gap-y-3"
              role="group"
              aria-label="Quick amounts"
            >
              {allowanceChips.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAllowanceAmount(String(amt))}
                  aria-pressed={Number(allowanceAmount) === amt}
                  className={`tap-highlight-none min-h-11 rounded-control border px-4 text-[15px] font-semibold ${
                    Number(allowanceAmount) === amt
                      ? 'border-frame bg-frame text-frame-ink'
                      : 'border-rule bg-transparent text-ink'
                  }`}
                >
                  {formatPeso(amt)}
                </button>
              ))}
            </div>

            {allowanceValue > 0 && (
              <p className="text-[15px] text-body" aria-live="polite">
                {formatPeso(balance)} left + {formatPeso(allowanceValue)} ={' '}
                <span className="font-tabular font-bold text-ink">
                  {formatPeso(balance + allowanceValue)}
                </span>
              </p>
            )}

            <Button
              size="lg"
              className="w-full"
              disabled={allowanceValue <= 0}
              onClick={onAllowance}
            >
              Add
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={fixOpen} onOpenChange={setFixOpen}>
        <SheetContent>
          <SheetTitle>Fix balance</SheetTitle>
          <p className="mt-2 text-sm text-muted">
            Enter cash you actually have. We log the difference.
          </p>
          <div className="mt-5 space-y-3">
            <Input
              inputMode="decimal"
              placeholder="Cash on hand"
              value={realCash}
              onChange={(e) =>
                setRealCash(e.target.value.replace(/[^\d.]/g, ''))
              }
              className="text-lg font-semibold"
            />
            <Button
              size="lg"
              className="w-full"
              disabled={realCash.trim() === ''}
              onClick={onFixBalance}
            >
              Update
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
