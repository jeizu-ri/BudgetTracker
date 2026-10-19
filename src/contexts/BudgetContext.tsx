import { createContext, useContext } from 'react'
import { useBudgetData } from '../hooks/useBudgetData'
import { useAuth } from './AuthContext'

type BudgetContextValue = ReturnType<typeof useBudgetData>

const BudgetContext = createContext<BudgetContextValue | null>(null)

export function BudgetProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const data = useBudgetData(user?.uid)
  return (
    <BudgetContext.Provider value={data}>{children}</BudgetContext.Provider>
  )
}

export function useBudget() {
  const ctx = useContext(BudgetContext)
  if (!ctx) throw new Error('useBudget must be used within BudgetProvider')
  return ctx
}
