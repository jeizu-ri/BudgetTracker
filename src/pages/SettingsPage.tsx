import { Moon, Sun } from 'lucide-react'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { SectionTitle } from '../components/ui/section-title'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export function SettingsPage() {
  const { logOut } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="page-stack">
      <PageIntro title="Settings" />

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
