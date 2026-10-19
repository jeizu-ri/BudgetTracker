import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from 'firebase/auth'
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export function isFirebaseConfigured(): boolean {
  return Object.values(firebaseConfig).every(Boolean)
}

export function getMissingFirebaseKeys(): string[] {
  return Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k)
}

let _app: ReturnType<typeof initializeApp> | null = null
let _auth: ReturnType<typeof getAuth> | null = null
let _db: ReturnType<typeof initializeFirestore> | null = null

export function getFirebaseApp() {
  if (!_app) {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured')
    }
    _app = initializeApp(firebaseConfig)
  }
  return _app
}

export function getAuthInstance() {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp())
    void setPersistence(_auth, browserLocalPersistence)
  }
  return _auth
}

export function getDb() {
  if (!_db) {
    _db = initializeFirestore(getFirebaseApp(), {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    })
  }
  return _db
}
