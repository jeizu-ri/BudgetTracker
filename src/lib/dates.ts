export const MANILA_TZ = 'Asia/Manila'

const weekdayIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export function manilaWeekday(date = new Date()): number {
  const wd = new Intl.DateTimeFormat('en-US', {
    timeZone: MANILA_TZ,
    weekday: 'short',
  }).format(date)
  return weekdayIndex[wd] ?? 0
}

export function manilaYmd(date = new Date()): string {
  return date.toLocaleDateString('en-CA', { timeZone: MANILA_TZ })
}

/** Days until the next Monday (allowance day). On Monday, returns 7. */
export function daysUntilNextMonday(date = new Date()): number {
  const day = manilaWeekday(date)
  if (day === 1) return 7
  if (day === 0) return 1
  return 8 - day
}

export function isSundayInManila(date = new Date()): boolean {
  return manilaWeekday(date) === 0
}

export function isMondayInManila(date = new Date()): boolean {
  return manilaWeekday(date) === 1
}

/** Monday 00:00:00.000 Manila for the week containing `date`. */
export function weekStartMondayMs(date = new Date()): number {
  const ymd = manilaYmd(date)
  const [y, m, d] = ymd.split('-').map(Number)
  const utcGuess = Date.UTC(y, m - 1, d, 0, 0, 0)
  const day = manilaWeekday(new Date(utcGuess))
  const daysFromMonday = day === 0 ? 6 : day - 1
  const mondayYmd = addDaysToYmd(ymd, -daysFromMonday)
  return ymdToManilaStartMs(mondayYmd)
}

export function weekEndSundayMs(date = new Date()): number {
  const start = weekStartMondayMs(date)
  return start + 7 * 24 * 60 * 60 * 1000 - 1
}

function addDaysToYmd(ymd: string, delta: number): string {
  const [y, m, d] = ymd.split('-').map(Number)
  const dt = new Date(Date.UTC(y, m - 1, d + delta))
  return dt.toISOString().slice(0, 10)
}

/** Approximate start of calendar day in Manila as UTC ms (good enough for week boundaries). */
function ymdToManilaStartMs(ymd: string): number {
  const [y, m, d] = ymd.split('-').map(Number)
  const noonUtc = Date.UTC(y, m - 1, d, 4, 0, 0)
  const localYmd = manilaYmd(new Date(noonUtc))
  if (localYmd === ymd) return noonUtc - 4 * 60 * 60 * 1000
  return Date.UTC(y, m - 1, d, 16, 0, 0)
}

export interface WeekDay {
  /** Mon … Sun */
  label: string
  /** Day of month, Manila */
  dayNum: number
  /** YYYY-MM-DD in Manila */
  ymd: string
  isToday: boolean
  isFuture: boolean
}

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

/** The seven days (Mon–Sun) of the current Manila week, for the frame row. */
export function currentWeekDays(now = new Date()): WeekDay[] {
  const todayYmd = manilaYmd(now)
  const wd = manilaWeekday(now)
  const sinceMonday = wd === 0 ? 6 : wd - 1
  return WEEK_LABELS.map((label, i) => {
    const ymd = addDaysToYmd(todayYmd, i - sinceMonday)
    return {
      label,
      dayNum: Number(ymd.slice(8, 10)),
      ymd,
      isToday: ymd === todayYmd,
      isFuture: ymd > todayYmd,
    }
  })
}

/** "Oct 20 – 26" or "Oct 28 – Nov 3" for the header. */
export function weekRangeLabel(now = new Date()): string {
  const days = currentWeekDays(now)
  const fmt = (ymd: string, withMonth: boolean) =>
    new Date(`${ymd}T12:00:00+08:00`).toLocaleDateString('en-PH', {
      timeZone: MANILA_TZ,
      month: withMonth ? 'short' : undefined,
      day: 'numeric',
    })
  const first = days[0].ymd
  const last = days[6].ymd
  const sameMonth = first.slice(5, 7) === last.slice(5, 7)
  return `${fmt(first, true)} – ${fmt(last, !sameMonth)}`
}

export function isInCurrentWeekManila(
  timestampMs: number,
  now = new Date(),
): boolean {
  const start = weekStartMondayMs(now)
  const end = weekEndSundayMs(now)
  return timestampMs >= start && timestampMs <= end
}
