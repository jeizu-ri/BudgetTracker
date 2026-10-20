const CELLS = 20

/** Savings progress as a strip of frames: each filled frame is 5%. */
export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent))
  const raw = Math.round((clamped / 100) * CELLS)
  const filled = clamped > 0 && raw === 0 ? 1 : raw

  return (
    <div
      className="flex h-6 w-full gap-[3px]"
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: CELLS }, (_, i) => (
        <span
          key={i}
          className={`flex-1 rounded-[1px] border transition-colors duration-200 ${
            i < filled ? 'border-ink bg-ink' : 'border-rule bg-transparent'
          }`}
          style={{ transitionDelay: `${i * 14}ms` }}
        />
      ))}
    </div>
  )
}
