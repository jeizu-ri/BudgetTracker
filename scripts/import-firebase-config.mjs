/**
 * Paste your firebaseConfig from Firebase Console into firebase-config.snippet.txt
 * (Project settings → Budget PWA → copy the config object), then run:
 *   npm run import:firebase
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const snippetPath = resolve(process.cwd(), 'firebase-config.snippet.txt')
let text
try {
  text = readFileSync(snippetPath, 'utf8')
} catch {
  console.error(`Create ${snippetPath} and paste your firebaseConfig from Firebase.`)
  process.exit(1)
}

const pick = (name) => text.match(new RegExp(`${name}:\\s*"([^"]+)"`))?.[1]

const map = {
  VITE_FIREBASE_API_KEY: pick('apiKey'),
  VITE_FIREBASE_AUTH_DOMAIN: pick('authDomain'),
  VITE_FIREBASE_PROJECT_ID: pick('projectId'),
  VITE_FIREBASE_STORAGE_BUCKET: pick('storageBucket'),
  VITE_FIREBASE_MESSAGING_SENDER_ID: pick('messagingSenderId'),
  VITE_FIREBASE_APP_ID: pick('appId'),
}

const missing = Object.entries(map).filter(([, v]) => !v).map(([k]) => k)
if (missing.length) {
  console.error('Could not parse:', missing.join(', '))
  console.error('Paste the full firebaseConfig { ... } block from Firebase.')
  process.exit(1)
}

const envPath = resolve(process.cwd(), '.env.local')
const body =
  Object.entries(map)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n') + '\n'

writeFileSync(envPath, body, 'utf8')
console.log('Wrote .env.local — run: npm run verify:firebase')
