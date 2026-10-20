import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve(process.cwd(), '.env.local')
let raw
try {
  raw = readFileSync(envPath, 'utf8')
} catch {
  console.error('Missing .env.local — copy .env.example to .env.local first.')
  process.exit(1)
}

const key = raw.match(/^VITE_FIREBASE_API_KEY=(.+)$/m)?.[1]?.trim()
if (!key) {
  console.error('VITE_FIREBASE_API_KEY is empty in .env.local')
  process.exit(1)
}

const res = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'verify@example.com',
      password: 'wrong',
      returnSecureToken: true,
    }),
  },
)

const body = await res.json().catch(() => ({}))
const reason = body?.error?.details?.[0]?.reason

if (reason === 'API_KEY_INVALID') {
  console.error('INVALID API KEY — Firebase rejected this key.')
  console.error('')
  console.error('Fix: Firebase → Project settings → Your apps → Budget PWA')
  console.error('     Copy apiKey with the copy button (do not type it).')
  console.error('     Paste into .env.local as VITE_FIREBASE_API_KEY=...')
  console.error('     Then: npm run verify:firebase')
  process.exit(1)
}

if (
  body?.error?.message?.includes('INVALID_LOGIN_CREDENTIALS') ||
  body?.error?.message?.includes('EMAIL_NOT_FOUND')
) {
  console.log('API key is VALID (Firebase Auth responded).')
  console.log('You can run npm run dev and sign in.')
  process.exit(0)
}

console.log('Unexpected response (key may still be OK):', JSON.stringify(body, null, 2))
