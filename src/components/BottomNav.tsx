import { CalendarDays, Home, Settings, Target } from 'lucide-react'
import { cn } from '../lib/utils'
import type { TabId } from '../types'

const tabs: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'review', label: 'Review', icon: CalendarDays },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function BottomNav({
  active,
  onChange,
}: {
  active: TabId
  onChange: (tab: TabId) => void
}) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-chip)]/80 bg-[var(--color-card)]/95 backdrop-blur-md safe-pb safe-px dark:border-[var(--color-chip-dark)] dark:bg-[var(--color-card-dark)]/95"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around pt-2 pb-1">
        {tabs.map(({ id, label, icon: Icon }) => {
          const selected = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                'tap-highlight-none flex min-h-[52px] min-w-[64px] flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition-colors active:scale-[0.97]',
                selected
                  ? 'text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]'
                  : 'text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]',
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={selected ? 2.25 : 2} />
              {label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
