import { Undo2 } from 'lucide-react'
import { useMemo } from 'react'
import { describeEntry } from '../lib/money'
import type { Entry, Goal } from '../types'
import { SectionTitle } from './ui/section-title'

/** A small frame mark: solid for money in or saved, hollow for spent, red for a balance fix. */
function entryMark(type: Entry['type']): string {
  switch (type) {
    case 'income':
    case 'goal_deposit':
      return 'border-ink bg-ink'
    case 'balance_fix':
      return 'border-accent bg-accent'
    default:
      return 'border-ink bg-transparent'
  }
}

export function RecentActivity({
  entries,
  goals,
  onUndo,
  limit = 12,
}: {
  entries: Entry[]
  goals: Goal[]
  onUndo: (id: string) => void
  limit?: number
}) {
  const goalNames = useMemo(
    () => new Map(goals.map((g) => [g.id, g.name])),
    [goals],
  )

  const list = useMemo(
    () => [...entries].sort((a, b) => b.timestamp - a.timestamp).slice(0, limit),
    [entries, limit],
  )

  return (
    <section>
      <SectionTitle>Activity</SectionTitle>

      {list.length === 0 ? (
        <p className="mt-4 text-[15px] text-muted">
          Nothing logged yet. Log your first expense above.
        </p>
      ) : (
        <>
          <p className="mt-3 text-sm text-muted">
            Undo removes a log and updates your balance.
          </p>
          <ul className="mt-2">
            {list.map((e) => {
              const { title, subtitle } = describeEntry(
                e,
                e.goalId ? goalNames.get(e.goalId) : undefined,
              )
              return (
                <li
                  key={e.id}
                  className="flex items-center gap-3 border-b border-rule/70 py-2.5 last:border-b-0"
                >
                  <span
                    className={`h-3.5 w-2.5 shrink-0 rounded-[1px] border ${entryMark(e.type)}`}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-tabular text-[15px] font-semibold leading-snug text-ink">
                      {title}
                    </p>
                    <p className="text-[13px] text-muted">{subtitle}</p>
                  </div>
                  <button
                    type="button"
                    className="tap-highlight-none flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-muted transition-colors hover:text-accent active:text-accent"
                    onClick={() => onUndo(e.id)}
                    aria-label={`Undo ${title}`}
                  >
                    <Undo2 className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </section>
  )
}
