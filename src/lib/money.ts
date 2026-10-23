import { isInCurrentWeekManila } from './dates'
import type { Entry, ExpenseCategory, Goal } from '../types'

export function entryDelta(entry: Entry): number {
  switch (entry.type) {
    case 'income':
      return entry.amount
    case 'expense':
      return -Math.abs(entry.amount)
    case 'goal_deposit':
      return -Math.abs(entry.amount)
    case 'balance_fix':
      return entry.amount
    default:
      return 0
  }
}

export function calculateBalance(
  startingBalance: number,
  entries: Entry[],
): number {
  const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp)
  return sorted.reduce((bal, e) => bal + entryDelta(e), startingBalance)
}

export function balanceFixDelta(
  currentBalance: number,
  realCash: number,
): number {
  return realCash - currentBalance
}

export function describeEntry(
  entry: Entry,
  goalName?: string,
): { title: string; subtitle: string } {
  const when = new Date(entry.timestamp).toLocaleString('en-PH', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
  switch (entry.type) {
    case 'income':
      return { title: `Allowance in · ${formatPeso(entry.amount)}`, subtitle: when }
    case 'expense':
      return {
        title: `${entry.category ?? 'Expense'} · ${formatPeso(entry.amount)}`,
        subtitle: when,
      }
    case 'goal_deposit':
      return {
        title: `Moved to ${goalName ?? 'goal'} · ${formatPeso(entry.amount)}`,
        subtitle: when,
      }
    case 'balance_fix':
      return {
        title:
          entry.amount < 0
            ? `Unlogged spending · ${formatPeso(Math.abs(entry.amount))}`
            : `Balance adjustment · +${formatPeso(entry.amount)}`,
        subtitle: when,
      }
    default:
      return { title: 'Entry', subtitle: when }
  }
}

export function formatPeso(amount: number): string {
  const rounded = Math.round(amount)
  const abs = Math.abs(rounded).toLocaleString('en-PH')
  if (rounded < 0) return `-₱${abs}`
  return `₱${abs}`
}

export function dailyPace(balance: number, daysUntilMonday: number): number {
  if (daysUntilMonday <= 0) return balance
  return balance / daysUntilMonday
}

export function weeklyOverspend(
  entries: Entry[],
  now = new Date(),
): number | null {
  const weekEntries = entries.filter((e) =>
    isInCurrentWeekManila(e.timestamp, now),
  )
  const income = weekEntries
    .filter((e) => e.type === 'income')
    .reduce((s, e) => s + e.amount, 0)
  const spent = weekEntries
    .filter((e) => e.type === 'expense')
    .reduce((s, e) => s + e.amount, 0)
  if (income <= 0) return null
  const over = spent - income
  return over > 0 ? over : null
}

export function weekSummary(entries: Entry[], now = new Date()) {
  const weekEntries = entries.filter((e) =>
    isInCurrentWeekManila(e.timestamp, now),
  )
  const received = weekEntries
    .filter((e) => e.type === 'income')
    .reduce((s, e) => s + e.amount, 0)
  const spent = weekEntries
    .filter((e) => e.type === 'expense')
    .reduce((s, e) => s + e.amount, 0)
  const goalMoves = weekEntries
    .filter((e) => e.type === 'goal_deposit')
    .reduce((s, e) => s + e.amount, 0)
  return { received, spent, goalMoves, left: received - spent - goalMoves }
}

export function categoryBreakdown(
  entries: Entry[],
  now = new Date(),
): Partial<Record<ExpenseCategory, number>> {
  const out: Partial<Record<ExpenseCategory, number>> = {}
  for (const e of entries) {
    if (e.type !== 'expense' || !e.category) continue
    if (!isInCurrentWeekManila(e.timestamp, now)) continue
    out[e.category] = (out[e.category] ?? 0) + e.amount
  }
  return out
}

export function goalSaved(entries: Entry[], goalId: string): number {
  return entries
    .filter((e) => e.type === 'goal_deposit' && e.goalId === goalId)
    .reduce((s, e) => s + e.amount, 0)
}

export function goalProgress(
  goal: Goal,
  entries: Entry[],
): { saved: number; percent: number } {
  const saved = goalSaved(entries, goal.id)
  const percent =
    goal.target > 0 ? Math.min(100, (saved / goal.target) * 100) : 0
  return { saved, percent }
}

export interface RecentExpense {
  amount: number
  category: ExpenseCategory
}

export function recentExpensePresets(
  entries: Entry[],
  limit = 4,
): RecentExpense[] {
  const seen = new Set<string>()
  const result: RecentExpense[] = []
  const sorted = [...entries]
    .filter((e) => e.type === 'expense' && e.category)
    .sort((a, b) => b.timestamp - a.timestamp)
  for (const e of sorted) {
    const key = `${e.category}-${e.amount}`
    if (seen.has(key)) continue
    seen.add(key)
    result.push({ amount: e.amount, category: e.category! })
    if (result.length >= limit) break
  }
  return result
}

/** Amounts you've logged as allowance before (most recent first), for one-tap chips. */
export function recentAllowanceAmounts(entries: Entry[], limit = 3): number[] {
  const seen = new Set<number>()
  const result: number[] = []
  const sorted = [...entries]
    .filter((e) => e.type === 'income')
    .sort((a, b) => b.timestamp - a.timestamp)
  for (const e of sorted) {
    if (seen.has(e.amount)) continue
    seen.add(e.amount)
    result.push(e.amount)
    if (result.length >= limit) break
  }
  // New to the app: offer sensible starters until real history exists.
  for (const starter of [1000, 500]) {
    if (result.length >= 2) break
    if (!seen.has(starter)) {
      seen.add(starter)
      result.push(starter)
    }
  }
  return result
}
