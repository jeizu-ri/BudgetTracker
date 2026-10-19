import { getMissingFirebaseKeys } from '../lib/firebase'

export function ConfigMissingPage() {
  const missing = getMissingFirebaseKeys()
  return (
    <div className="safe-pt safe-px flex min-h-dvh items-center justify-center p-6">
      <div className="max-w-md rounded-[var(--radius-card)] bg-[var(--color-card)] p-6 dark:bg-[var(--color-card-dark)]">
        <h1 className="font-display text-2xl font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Almost ready
        </h1>
        <p className="mt-2 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          Copy <code className="text-[var(--color-heading)]">.env.example</code>{' '}
          to <code className="text-[var(--color-heading)]">.env.local</code> and
          fill in your Firebase values, then restart the dev server.
        </p>
        <ul className="mt-4 list-inside list-disc text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          {missing.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
