import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { getAuthInstance, isFirebaseConfigured } from '../lib/firebase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  configured: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const configured = isFirebaseConfigured()

  useEffect(() => {
    if (!configured) {
      setLoading(false)
      return
    }
    const auth = getAuthInstance()
    return onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
  }, [configured])

  const signIn = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(getAuthInstance(), email, password)
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    await createUserWithEmailAndPassword(getAuthInstance(), email, password)
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    await sendPasswordResetEmail(getAuthInstance(), email)
  }, [])

  const logOut = useCallback(async () => {
    await signOut(getAuthInstance())
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      configured,
      signIn,
      signUp,
      resetPassword,
      logOut,
    }),
    [user, loading, configured, signIn, signUp, resetPassword, logOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
