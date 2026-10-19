import { useState } from 'react'
import { BottomNav } from './components/BottomNav'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BudgetProvider } from './contexts/BudgetContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { ConfigMissingPage } from './pages/ConfigMissingPage'
import { GoalsPage } from './pages/GoalsPage'
import { HomePage } from './pages/HomePage'
import { ReviewPage } from './pages/ReviewPage'
import { SettingsPage } from './pages/SettingsPage'
import { SignInPage } from './pages/SignInPage'
import type { TabId } from './types'

function Shell() {
  const { user, loading, configured } = useAuth()
  const [tab, setTab] = useState<TabId>('home')

  if (!configured) return <ConfigMissingPage />
  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-[var(--color-muted)]">
        Loading…
      </div>
    )
  }
  if (!user) return <SignInPage />

  return (
    <BudgetProvider>
      <div className="mx-auto min-h-dvh max-w-lg safe-pt safe-px pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        <header className="py-3">
          <p className="text-sm font-semibold text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
            Budget
          </p>
        </header>
        <main>
          {tab === 'home' && <HomePage />}
          {tab === 'goals' && <GoalsPage />}
          {tab === 'review' && <ReviewPage />}
          {tab === 'settings' && <SettingsPage />}
        </main>
      </div>
      <BottomNav active={tab} onChange={setTab} />
    </BudgetProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Shell />
      </AuthProvider>
    </ThemeProvider>
  )
}
