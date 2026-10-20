import { useState } from 'react'
import { EXPENSE_CATEGORIES, type ExpenseCategory } from '../types'
import { Button } from './ui/button'
import { GreaseMark } from './ui/GreaseMark'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetTitle } from './ui/sheet'

interface QuickAddSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (amount: number, category: ExpenseCategory) => void
  initialAmount?: string
  initialCategory?: ExpenseCategory
}

export function QuickAddSheet({
  open,
  onOpenChange,
  onAdd,
  initialAmount = '',
  initialCategory,
}: QuickAddSheetProps) {
  const [amount, setAmount] = useState(initialAmount)
  const [category, setCategory] = useState<ExpenseCategory | null>(
    initialCategory ?? null,
  )

  const reset = () => {
    setAmount('')
    setCategory(null)
  }

  const handleAdd = () => {
    const n = Number(amount)
    if (!n || n <= 0 || !category) return
    onAdd(n, category)
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        onOpenAutoFocus={(e) => {
          if (initialAmount) e.preventDefault()
        }}
      >
        <SheetTitle>Log expense</SheetTitle>

        <div className="mt-5 space-y-5">
          <Input
            inputMode="decimal"
            placeholder="Amount"
            aria-label="Amount in pesos"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
            className="h-14 text-2xl font-semibold"
            autoFocus
          />

          <div className="flex flex-wrap gap-x-3 gap-y-3.5" role="group" aria-label="Category">
            {EXPENSE_CATEGORIES.map((c) => {
              const selected = category === c
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={selected}
                  className={`tap-highlight-none relative min-h-11 rounded-control border px-4 text-[15px] font-semibold ${
                    selected
                      ? 'border-frame bg-frame text-frame-ink'
                      : 'border-rule bg-transparent text-ink'
                  }`}
                >
                  {c}
                  {selected && <GreaseMark key={c} className="-inset-[6px]" />}
                </button>
              )
            })}
          </div>

          <Button
            size="lg"
            className="w-full"
            disabled={!amount || !category}
            onClick={handleAdd}
          >
            Add
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
