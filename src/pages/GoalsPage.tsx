import { motion, useReducedMotion } from 'framer-motion'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DecorativePhoto } from '../components/DecorativePhoto'
import { ProgressBar } from '../components/ProgressBar'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '../components/ui/sheet'
import { useBudget } from '../contexts/BudgetContext'
import { calculateBalance, formatPeso, goalProgress } from '../lib/money'
import type { Goal } from '../types'

const CAMERA_GOAL_HINT = 'X-T5'

export function GoalsPage() {
  const {
    goals,
    entries,
    settings,
    addGoal,
    updateGoal,
    deleteGoal,
    addEntry,
  } = useBudget()
  const balance = useMemo(
    () => calculateBalance(settings.startingBalance, entries),
    [settings.startingBalance, entries],
  )

  const [sheet, setSheet] = useState<'add' | 'edit' | 'deposit' | null>(null)
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null)
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [depositAmount, setDepositAmount] = useState('')
  const reduce = useReducedMotion()

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
    await addEntry({
      timestamp: Date.now(),
      type: 'goal_deposit',
      amount: n,
      goalId: activeGoal.id,
    })
    setSheet(null)
  }

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
            Savings goals
          </h1>
          <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            Move money when you’re ready — it leaves your spendable balance.
          </p>
        </div>
        <Button size="icon" onClick={openAdd} aria-label="Add goal">
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <ul className="space-y-4">
        {goals.map((g, i) => {
          const { saved, percent } = goalProgress(g, entries)
          const showCamera = g.name.includes(CAMERA_GOAL_HINT)
          return (
            <motion.li
              key={g.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="overflow-hidden rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[0_12px_40px_-24px_rgba(91,33,182,0.35)] dark:bg-[var(--color-card-dark)]"
            >
              {showCamera && (
                <DecorativePhoto
                  src="/assets/camera.jpg"
                  alt="Fujifilm X-T5 camera goal"
                  className="h-36 w-full rounded-none"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
                      {g.name}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
                      {formatPeso(saved)} of {formatPeso(g.target)}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="tap-highlight-none rounded-xl p-2 text-[var(--color-muted)]"
                      aria-label="Edit goal"
                      onClick={() => openEdit(g)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="tap-highlight-none rounded-xl p-2 text-[var(--color-muted)]"
                      aria-label="Delete goal"
                      onClick={() => deleteGoal(g.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <ProgressBar percent={percent} />
                </div>
                <Button
                  variant="secondary"
                  className="mt-4 w-full"
                  onClick={() => openDeposit(g)}
                  disabled={balance <= 0}
                >
                  Move money here
                </Button>
              </div>
            </motion.li>
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
              placeholder="Goal name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              inputMode="decimal"
              placeholder="Target amount"
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
          <SheetTitle>Move to {activeGoal?.name}</SheetTitle>
          <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
            Available: {formatPeso(balance)}
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
    </div>
  )
}
