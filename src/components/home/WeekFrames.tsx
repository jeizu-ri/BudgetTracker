import { useMemo } from 'react'
import { currentWeekDays, manilaYmd } from '../../lib/dates'
import type { Entry } from '../../types'
import { GreaseMark } from '../ui/GreaseMark'

/** Seven frames, Mon–Sun. Today wears the grease-pencil loop and is the quick-log target. */
export function WeekFrames({
  entries,
  onTodayPress,
}: {
  entries: Entry[]
  onTodayPress: () => void
}) {
  const days = currentWeekDays()
  const spentOn = useMemo(() => {
    const set = new Set<string>()
    for (const e of entries) {
      if (e.type === 'expense') set.add(manilaYmd(new Date(e.timestamp)))
    }
    return set
  }, [entries])

  return (
    <ol className="grid grid-cols-7 gap-1.5" aria-label="This week">
      {days.map((d) => {
        const logged = spentOn.has(d.ymd)
        const frame = (
          <>
            <span className="edge text-[10px] leading-none text-frame-muted">
              {d.label}
            </span>
            <span
              className={`numeral text-[26px] ${
                d.isFuture ? 'text-frame-muted/60' : 'text-frame-ink'
              }`}
            >
              {d.dayNum}
            </span>
            <span
              className={`h-[3px] w-4 ${logged ? 'bg-frame-ink' : 'bg-transparent'}`}
              aria-hidden
            />
          </>
        )
        const base =
          'relative flex aspect-[3/4] w-full flex-col items-center justify-between rounded-frame bg-frame px-0.5 pb-2 pt-2.5'
        const status = logged ? ', spending logged' : ''
        return (
          <li key={d.ymd}>
            {d.isToday ? (
              <button
                type="button"
                onClick={onTodayPress}
                aria-current="date"
                aria-label={`${d.label} ${d.dayNum}, today${status}. Log an expense`}
                className={`${base} tap-highlight-none`}
              >
                {frame}
                <GreaseMark className="-inset-[7px]" />
              </button>
            ) : (
              <div
                className={base}
                aria-label={`${d.label} ${d.dayNum}${status}`}
                role="img"
              >
                {frame}
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
