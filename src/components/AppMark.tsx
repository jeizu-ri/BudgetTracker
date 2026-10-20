export function AppMark() {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="numeral flex h-7 w-7 items-center justify-center rounded-frame bg-frame text-[17px] text-frame-ink"
        aria-hidden
      >
        ₱
      </span>
      <span className="edge text-[22px] leading-none text-ink">Budget</span>
    </div>
  )
}
