import { CalendarDays, Home, Settings, Target } from 'lucide-react'
import { cn } from '../lib/utils'
import type { TabId } from '../types'
import { GreaseMark } from './ui/GreaseMark'

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
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-paper safe-pb"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-2xl divide-x divide-rule safe-px">
        {tabs.map(({ id, label, icon: Icon }) => {
          const selected = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-current={selected ? 'page' : undefined}
              className="tap-highlight-none flex min-h-[58px] flex-1 items-center justify-center"
            >
              <span
                className={cn(
                  'relative flex flex-col items-center gap-1 px-4 py-1.5 text-[11px] font-semibold transition-colors',
                  selected ? 'text-ink' : 'text-muted',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={selected ? 2.25 : 1.75} />
                {label}
                {selected && <GreaseMark key={id} className="-inset-x-0.5 inset-y-0" />}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
