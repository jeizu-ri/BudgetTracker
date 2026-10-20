import { useState } from 'react'
import { AppMark } from '../components/AppMark'
import { GreaseMark } from '../components/ui/GreaseMark'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Surface } from '../components/ui/surface'

export function SignInPage() {
  const { signIn, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await signIn(email.trim(), password)
    } catch (err: unknown) {
      const code =
        err && typeof err === 'object' && 'code' in err
          ? String((err as { code: string }).code)
          : ''
      const messages: Record<string, string> = {
        'auth/invalid-credential': 'Wrong email or password.',
        'auth/user-not-found': 'No user for this email in Firebase.',
        'auth/wrong-password': 'Wrong password.',
        'auth/invalid-email': 'Invalid email.',
        'auth/too-many-requests': 'Too many attempts. Wait a minute.',
        'auth/network-request-failed': 'Network error.',
        'auth/api-key-not-valid.-invalid-api-key':
          'Fix VITE_FIREBASE_API_KEY in .env.local and restart dev.',
      }
      setError(
        messages[code] ??
          (code ? `Sign-in failed (${code}).` : 'Could not sign in.'),
      )
    } finally {
      setBusy(false)
    }
  }

  const onForgot = async () => {
    if (!email.trim()) {
      setError('Enter your email first.')
      return
    }
    setError(null)
    setBusy(true)
    try {
      await resetPassword(email.trim())
      setResetSent(true)
    } catch {
      setError('Could not send reset email.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="safe-pt safe-px flex min-h-dvh flex-col justify-center pb-10">
      <div className="mx-auto w-full max-w-md">
        <AppMark />
        <div className="mt-8">
          <h1 className="edge relative inline-block text-[56px] leading-[0.95] text-ink">
            Sign in
            <GreaseMark variant="underline" className="-bottom-2 left-0 h-2 w-full" />
          </h1>
          <p className="mt-5 text-[15px] text-muted">
            Same account on phone and iPad.
          </p>
        </div>

        <Surface as="form" onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-warn" role="alert">
              {error}
            </p>
          )}
          {resetSent && (
            <p className="text-sm font-semibold text-ink" role="status">
              Reset email sent.
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={busy}>
            Sign in
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={busy}
            onClick={onForgot}
          >
            Forgot password
          </Button>
        </Surface>
      </div>
    </div>
  )
}
