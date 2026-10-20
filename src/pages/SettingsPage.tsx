import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { SectionTitle } from '../components/ui/section-title'
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
    <div className="page-stack">
      <PageIntro title="Settings" />

      <section>
        <SectionTitle>
          <Label htmlFor="starting" className="edge text-[17px] leading-none">
            Starting balance
          </Label>
        </SectionTitle>
        <p className="mt-3 text-sm text-muted">
          Cash in the wallet when you first set up the app.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            id="starting"
            inputMode="decimal"
            value={starting}
            onChange={(e) =>
              setStarting(e.target.value.replace(/[^\d.]/g, ''))
            }
            className="font-tabular"
          />
          <Button onClick={saveStarting} className="shrink-0 sm:px-6">
            Save
          </Button>
        </div>
        {saved && (
          <p className="mt-2 text-sm font-semibold text-ink" role="status">
            Saved.
          </p>
        )}
      </section>

      <section>
        <SectionTitle>Theme</SectionTitle>
        <Button
          variant="secondary"
          className="mt-4 w-full justify-between"
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <>
              Contact sheet <Sun className="h-5 w-5" strokeWidth={1.75} />
            </>
          ) : (
            <>
              Darkroom <Moon className="h-5 w-5" strokeWidth={1.75} />
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
