import { Check, Moon, Sun } from 'lucide-react'
import { PageIntro } from '../components/PageIntro'
import { Button } from '../components/ui/button'
import { SectionTitle } from '../components/ui/section-title'
import { useAuth } from '../contexts/AuthContext'
import { useTheme, type Palette } from '../contexts/ThemeContext'

/** Preview swatches [paper, frame, accent] so each option shows its own colours. */
const SWATCHES: Record<Palette, Record<'light' | 'dark', string[]>> = {
  classic: {
    light: ['#ece5d3', '#14110e', '#b23219'],
    dark: ['#13110e', '#2d2821', '#f0654a'],
  },
  violet: {
    light: ['#ebe6f3', '#1b1430', '#6d28d9'],
    dark: ['#120e1c', '#2b2340', '#b794f6'],
  },
}

const PALETTES: { id: Palette; name: string; note: string }[] = [
  { id: 'classic', name: 'Classic', note: 'Red pencil' },
  { id: 'violet', name: 'Violet', note: 'Purple pencil' },
]

export function SettingsPage() {
  const { logOut } = useAuth()
  const { theme, toggleTheme, palette, setPalette } = useTheme()

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

      <section>
        <SectionTitle>Palette</SectionTitle>
        <div
          role="radiogroup"
          aria-label="Palette"
          className="mt-4 grid grid-cols-2 gap-3"
        >
          {PALETTES.map((p) => {
            const selected = palette === p.id
            const [paper, frame, accent] = SWATCHES[p.id][theme]
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setPalette(p.id)}
                className={`tap-highlight-none flex min-h-24 flex-col justify-between gap-3 rounded-control border bg-transparent p-3 text-left transition-colors ${
                  selected
                    ? 'border-ink ring-1 ring-ink'
                    : 'border-rule hover:border-ink'
                }`}
              >
                <span className="flex gap-1" aria-hidden>
                  {[paper, frame, accent].map((c, i) => (
                    <span
                      key={i}
                      className="h-6 flex-1 rounded-frame border border-rule"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </span>
                <span className="flex items-end justify-between gap-2">
                  <span>
                    <span className="block text-[15px] font-semibold leading-tight text-ink">
                      {p.name}
                    </span>
                    <span className="block text-sm text-muted">{p.note}</span>
                  </span>
                  {selected && (
                    <Check
                      className="h-5 w-5 shrink-0 text-ink"
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <Button variant="outline" className="w-full" onClick={() => logOut()}>
        Sign out
      </Button>
    </div>
  )
}
