import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../contexts/AuthContext'
import { useBudget } from '../contexts/BudgetContext'
import { useTheme } from '../contexts/ThemeContext'

export function SettingsPage() {
  const { logOut } = useAuth()
  const { settings, setStartingBalance } = useBudget()
  const { theme, toggleTheme } = useTheme()
  const [starting, setStarting] = useState(String(settings.startingBalance))
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setStarting(String(settings.startingBalance))
  }, [settings.startingBalance])

  const saveStarting = async () => {
    const n = Number(starting)
    if (Number.isNaN(n) || n < 0) return
    await setStartingBalance(n)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-5 pb-4">
      <div>
        <h1 className="font-display text-2xl font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Settings
        </h1>
        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          Starting point and preferences.
        </p>
      </div>

      <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
        <Label htmlFor="starting">Starting balance</Label>
        <p className="mt-1 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          What she had in her wallet when she first started using the app.
        </p>
        <div className="mt-3 flex gap-2">
          <Input
            id="starting"
            inputMode="decimal"
            value={starting}
            onChange={(e) =>
              setStarting(e.target.value.replace(/[^\d.]/g, ''))
            }
          />
          <Button onClick={saveStarting}>Save</Button>
        </div>
        {saved && (
          <p className="mt-2 text-sm text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
            Saved.
          </p>
        )}
      </section>

      <section className="rounded-[var(--radius-card)] bg-[var(--color-card)] p-4 dark:bg-[var(--color-card-dark)]">
        <p className="font-medium text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Appearance
        </p>
        <Button
          variant="secondary"
          className="mt-3 w-full justify-between"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              Light mode <Sun className="h-5 w-5" />
            </>
          ) : (
            <>
              Dark mode <Moon className="h-5 w-5" />
            </>
          )}
        </Button>
      </section>

      <Button variant="outline" className="w-full" onClick={() => logOut()}>
        Sign out
      </Button>
    </div>
  )
}
