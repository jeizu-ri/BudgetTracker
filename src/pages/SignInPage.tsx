import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export function SignInPage() {
  const { signIn, resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const reduce = useReducedMotion()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await signIn(email.trim(), password)
    } catch {
      setError('Couldn’t sign in. Check your email and password.')
    } finally {
      setBusy(false)
    }
  }

  const onForgot = async () => {
    if (!email.trim()) {
      setError('Enter your email first, then tap Forgot password.')
      return
    }
    setError(null)
    setBusy(true)
    try {
      await resetPassword(email.trim())
      setResetSent(true)
    } catch {
      setError('Couldn’t send reset email. Check the address and try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="safe-pt safe-px flex min-h-dvh flex-col justify-center bg-[var(--color-bg)] px-4 pb-8 dark:bg-[var(--color-bg-dark)]">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto w-full max-w-md"
      >
        <p className="font-display text-3xl font-semibold text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
          Your budget,
          <br />
          kept simple.
        </p>
        <p className="mt-2 text-[15px] text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          Sign in once on each device. Everything stays in sync.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-[var(--radius-card)] bg-[var(--color-card)] p-5 shadow-[0_16px_48px_-24px_rgba(91,33,182,0.4)] dark:bg-[var(--color-card-dark)]"
        >
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
            <p className="text-sm text-[var(--color-rose-text)]" role="alert">
              {error}
            </p>
          )}
          {resetSent && (
            <p className="text-sm text-[var(--color-heading)] dark:text-[var(--color-heading-dark)]">
              Reset link sent — check your inbox.
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
        </form>
      </motion.div>
    </div>
  )
}
