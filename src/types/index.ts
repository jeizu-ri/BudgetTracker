export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'School',
  'Fun',
  'Bills',
  'Other',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]

export type EntryType =
  | 'income'
  | 'expense'
  | 'goal_deposit'
  | 'balance_fix'

export interface Entry {
  id: string
  timestamp: number
  type: EntryType
  amount: number
  category?: ExpenseCategory
  goalId?: string
}

export interface Goal {
  id: string
  name: string
  target: number
  /** Small JPEG data URL of what the user is saving for. */
  image?: string
}

export interface UserSettings {
  startingBalance: number
}

export type TabId = 'home' | 'goals' | 'review' | 'settings'
