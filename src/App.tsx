import { useState } from 'react'
import { AppMark } from './components/AppMark'
import { BottomNav } from './components/BottomNav'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BudgetProvider } from './contexts/BudgetContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { weekRangeLabel } from './lib/dates'
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
      <div
        className="safe-pt safe-px flex min-h-dvh flex-col items-center justify-center gap-4"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <AppMark />
        <p className="text-sm text-muted">Loading…</p>
      </div>
    )
  }
  if (!user) return <SignInPage />

  return (
    <BudgetProvider>
      <div className="mx-auto min-h-dvh w-full max-w-lg safe-pt safe-px pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:max-w-2xl">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-rule pb-3">
          <AppMark />
          <p className="edge text-[13px] leading-none text-muted">
            {weekRangeLabel()}
          </p>
        </header>
        <main id="main-content">
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
