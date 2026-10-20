import { GreaseMark } from './ui/GreaseMark'

export function PageIntro({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header>
      <h1 className="edge relative inline-block text-[40px] leading-[0.95] text-ink">
        {title}
        <GreaseMark variant="underline" className="-bottom-2 left-0 h-1.5 w-full" />
      </h1>
      {description && (
        <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-muted">
          {description}
        </p>
      )}
    </header>
  )
}
