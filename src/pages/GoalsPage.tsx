import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PageIntro } from '../components/PageIntro'
import { ProgressBar } from '../components/ProgressBar'
import { UndoToast } from '../components/UndoToast'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
import { Surface } from '../components/ui/surface'
import { useBudget } from '../contexts/BudgetContext'
import { useOfferUndo } from '../hooks/useOfferUndo'
import { calculateBalance, formatPeso, goalProgress } from '../lib/money'
import type { Goal } from '../types'

export function GoalsPage() {
  const {
    goals,
    entries,
    settings,
    addGoal,
    updateGoal,
    deleteGoal,
    addEntry,
    removeEntry,
  } = useBudget()
  const { undoMessage, offerUndo, dismissUndo, performUndo } =
    useOfferUndo(removeEntry)
  const balance = useMemo(
    () => calculateBalance(settings.startingBalance, entries),
    [settings.startingBalance, entries],
  )

  const [sheet, setSheet] = useState<'add' | 'edit' | 'deposit' | null>(null)
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null)
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [depositAmount, setDepositAmount] = useState('')

  const openAdd = () => {
    setName('')
    setTarget('')
    setSheet('add')
  }

  const openEdit = (g: Goal) => {
    setActiveGoal(g)
    setName(g.name)
    setTarget(String(g.target))
    setSheet('edit')
  }

  const openDeposit = (g: Goal) => {
    setActiveGoal(g)
    setDepositAmount('')
    setSheet('deposit')
  }

  const saveNew = async () => {
    const t = Number(target)
    if (!name.trim() || !t || t <= 0) return
    await addGoal(name.trim(), t)
    setSheet(null)
  }

  const saveEdit = async () => {
    if (!activeGoal) return
    const t = Number(target)
    if (!name.trim() || !t || t <= 0) return
    await updateGoal(activeGoal.id, { name: name.trim(), target: t })
    setSheet(null)
  }

  const saveDeposit = async () => {
    if (!activeGoal) return
    const n = Number(depositAmount)
    if (!n || n <= 0 || n > balance) return
    const id = await addEntry({
      timestamp: Date.now(),
      type: 'goal_deposit',
      amount: n,
      goalId: activeGoal.id,
    })
    setSheet(null)
    await offerUndo(id, `Moved ${formatPeso(n)} to goal`)
  }

  return (
    <div className="page-stack">
      <div className="flex items-start justify-between gap-3">
        <PageIntro
          title="Goals"
          description="Money you move here leaves spendable balance."
        />
        <Button size="icon" className="shrink-0" onClick={openAdd} aria-label="Add goal">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {goals.length === 0 && (
        <p className="text-[15px] text-muted">
          No goals yet. Tap + to add one.
        </p>
      )}

      <ul className="flex flex-col gap-8">
        {goals.map((g) => {
          const { saved, percent } = goalProgress(g, entries)
          return (
            <li key={g.id}>
              <Surface as="div">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold leading-snug text-ink">
                      {g.name}
                    </h2>
                    <p className="mt-1 font-tabular text-[15px] text-body">
                      {formatPeso(saved)} of {formatPeso(g.target)}
                    </p>
                  </div>
                  <div className="-mr-2 flex shrink-0">
                    <button
                      type="button"
                      className="tap-highlight-none flex h-11 w-11 items-center justify-center text-muted hover:text-ink"
                      aria-label="Edit goal"
                      onClick={() => openEdit(g)}
                    >
                      <Pencil className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      className="tap-highlight-none flex h-11 w-11 items-center justify-center text-muted hover:text-accent"
                      aria-label="Delete goal"
                      onClick={() => {
                        if (window.confirm(`Delete "${g.name}"? Money already moved to it stays out of your balance.`))
                          void deleteGoal(g.id)
                      }}
                    >
                      <Trash2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar percent={percent} />
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => openDeposit(g)}
                  disabled={balance <= 0}
                >
                  Move money
                </Button>
              </Surface>
            </li>
          )
        })}
      </ul>

      <Sheet
        open={sheet === 'add' || sheet === 'edit'}
        onOpenChange={(o) => !o && setSheet(null)}
      >
        <SheetContent>
          <SheetTitle>{sheet === 'add' ? 'New goal' : 'Edit goal'}</SheetTitle>
          <div className="mt-5 space-y-3">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              inputMode="decimal"
              placeholder="Target (₱)"
              value={target}
              onChange={(e) => setTarget(e.target.value.replace(/[^\d.]/g, ''))}
            />
            <Button
              size="lg"
              className="w-full"
              onClick={sheet === 'add' ? saveNew : saveEdit}
            >
              Save
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet
        open={sheet === 'deposit'}
        onOpenChange={(o) => !o && setSheet(null)}
      >
        <SheetContent>
          <SheetTitle>{activeGoal?.name}</SheetTitle>
          <p className="mt-2 text-sm text-muted">
            Available {formatPeso(balance)}
          </p>
          <div className="mt-5 space-y-3">
            <Input
              inputMode="decimal"
              placeholder="Amount"
              value={depositAmount}
              onChange={(e) =>
                setDepositAmount(e.target.value.replace(/[^\d.]/g, ''))
              }
            />
            <Button size="lg" className="w-full" onClick={saveDeposit}>
              Confirm
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <UndoToast
        message={undoMessage}
        onUndo={performUndo}
        onDismiss={dismissUndo}
      />
    </div>
  )
}
