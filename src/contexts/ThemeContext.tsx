import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type Theme = 'light' | 'dark'
export type Palette = 'classic' | 'violet'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
  palette: Palette
  setPalette: (p: Palette) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'budget-theme'
const PALETTE_KEY = 'budget-palette'

/** Browser chrome colour per palette and mode (matches each palette's paper). */
const CHROME: Record<Palette, Record<Theme, string>> = {
  classic: { light: '#ece5d3', dark: '#13110e' },
  violet: { light: '#ebe6f3', dark: '#120e1c' },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  const [palette, setPaletteState] = useState<Palette>(() =>
    localStorage.getItem(PALETTE_KEY) === 'violet' ? 'violet' : 'classic',
  )

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('theme-violet', palette === 'violet')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', CHROME[palette][theme])
    localStorage.setItem(STORAGE_KEY, theme)
    localStorage.setItem(PALETTE_KEY, palette)
  }, [theme, palette])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const setPalette = useCallback((p: Palette) => setPaletteState(p), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'light' ? 'dark' : 'light')),
    [],
  )

  const value = useMemo(
    () => ({ theme, toggleTheme, setTheme, palette, setPalette }),
    [theme, toggleTheme, setTheme, palette, setPalette],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
