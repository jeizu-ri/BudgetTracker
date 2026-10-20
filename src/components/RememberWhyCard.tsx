import { useMemo } from 'react'
import { useBudget } from '../contexts/BudgetContext'
import { pickRememberCaption } from '../lib/captions'
import { formatPeso, goalProgress } from '../lib/money'
import { ProgressBar } from './ProgressBar'
import { SectionTitle } from './ui/section-title'

const SESSION_KEY = 'remember-caption'

export function RememberWhyCard() {
  const { goals, entries } = useBudget()

  const caption = useMemo(() => {
    const existing = sessionStorage.getItem(SESSION_KEY)
    if (existing) return existing
    const next = pickRememberCaption()
    sessionStorage.setItem(SESSION_KEY, next)
    return next
  }, [])

  const spotlight = useMemo(() => {
    if (goals.length === 0) return null
    const ranked = goals
      .map((g) => ({ g, ...goalProgress(g, entries) }))
      .sort((a, b) => b.percent - a.percent)
    return ranked[0]
  }, [goals, entries])

  return (
    <section>
      <SectionTitle>Remember why</SectionTitle>

      {spotlight ? (
        <div className="mt-4">
          <p className="text-lg font-bold leading-snug text-ink">
            {spotlight.g.name}
          </p>
          <p className="mt-1 font-tabular text-[15px] text-body">
            {formatPeso(spotlight.saved)} saved of {formatPeso(spotlight.g.target)}
          </p>
          <div className="mt-3">
            <ProgressBar percent={spotlight.percent} />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-[15px] text-muted">
          Add a goal on the Goals tab.
        </p>
      )}

      <p className="mt-4 text-[15px] italic leading-relaxed text-body">
        {caption}
      </p>
    </section>
  )
}
