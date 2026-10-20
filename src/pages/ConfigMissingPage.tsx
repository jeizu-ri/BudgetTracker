import { AppMark } from '../components/AppMark'
import { getMissingFirebaseKeys } from '../lib/firebase'

export function ConfigMissingPage() {
  const missing = getMissingFirebaseKeys()
  return (
    <div className="safe-pt safe-px flex min-h-dvh flex-col justify-center pb-10">
      <div className="mx-auto w-full max-w-md">
        <AppMark />
        <h1 className="edge mt-8 text-[40px] leading-[0.95] text-ink">
          Firebase not configured
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-body">
          Copy <code>.env.example</code> to <code>.env.local</code>, add your
          Firebase keys, restart <code>npm run dev</code>.
        </p>
        <ul className="mt-4 border-t border-rule">
          {missing.map((k) => (
            <li
              key={k}
              className="border-b border-rule/70 py-2 font-tabular text-sm text-muted"
            >
              {k}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
