import { useMemo } from 'react'
import { formatPeso } from '../lib/money'
import type { Entry, Goal } from '../types'
import { SectionTitle } from './ui/section-title'

const whenFmt = new Intl.DateTimeFormat('en-PH', {
  timeZone: 'Asia/Manila',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
})

/** Every peso moved into each goal, newest first, with a total per goal. */
export function GoalHistory({
  entries,
  goals,
}: {
  entries: Entry[]
  goals: Goal[]
}) {
  const groups = useMemo(() => {
    const deposits = entries
      .filter((e) => e.type === 'goal_deposit')
      .sort((a, b) => b.timestamp - a.timestamp)

    const byGoal = new Map<string, Entry[]>()
    for (const d of deposits) {
      const key = d.goalId ?? 'unknown'
      byGoal.set(key, [...(byGoal.get(key) ?? []), d])
    }

    const named = goals
      .filter((g) => byGoal.has(g.id))
      .map((g) => ({ key: g.id, name: g.name, items: byGoal.get(g.id)! }))
    // Deposits whose goal was deleted still count; keep them visible.
    const known = new Set(goals.map((g) => g.id))
    const orphans = [...byGoal.entries()]
      .filter(([k]) => !known.has(k))
      .flatMap(([, items]) => items)
    if (orphans.length) {
      named.push({ key: 'deleted', name: 'Deleted goal', items: orphans })
    }
    return named.map((g) => ({
      ...g,
      total: g.items.reduce((s, e) => s + e.amount, 0),
    }))
  }, [entries, goals])

  return (
    <section>
      <SectionTitle>Goal history</SectionTitle>

      {groups.length === 0 ? (
        <p className="mt-4 text-[15px] text-muted">
          Nothing moved to a goal yet.
        </p>
      ) : (
        <div className="mt-4 space-y-6">
          {groups.map((g) => (
            <div key={g.key}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold leading-snug text-ink">
                  {g.name}
                </h3>
                <span className="numeral text-[26px] text-ink">
                  {formatPeso(g.total)}
                </span>
              </div>
              <ul className="mt-1">
                {g.items.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-baseline justify-between gap-3 border-b border-rule/70 py-2.5 last:border-b-0"
                  >
                    <span className="text-[13px] text-muted">
                      {whenFmt.format(new Date(e.timestamp))}
                    </span>
                    <span className="font-tabular text-[15px] font-semibold text-ink">
                      +{formatPeso(e.amount)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
