import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { getDb } from '../lib/firebase'
import type { Entry, Goal, UserSettings } from '../types'

const DEFAULT_GOAL_NAME = 'Fujifilm X-T5 + lens'
const DEFAULT_GOAL_TARGET = 120000

export function useBudgetData(uid: string | undefined) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [settings, setSettings] = useState<UserSettings>({ startingBalance: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!uid) {
      setEntries([])
      setGoals([])
      setSettings({ startingBalance: 0 })
      setLoading(false)
      return
    }

    const db = getDb()
    const entriesRef = collection(db, 'users', uid, 'entries')
    const goalsRef = collection(db, 'users', uid, 'goals')
    const settingsRef = doc(db, 'users', uid, 'settings', 'main')

    const unsubEntries = onSnapshot(entriesRef, (snap) => {
      const list: Entry[] = snap.docs.map((d) => {
        const data = d.data()
        return {
          id: d.id,
          timestamp: data.timestamp,
          type: data.type,
          amount: data.amount,
          category: data.category,
          goalId: data.goalId,
        }
      })
      setEntries(list)
      setLoading(false)
    })

    const unsubGoals = onSnapshot(goalsRef, (snap) => {
      const list: Goal[] = snap.docs.map((d) => ({
        id: d.id,
        name: d.data().name,
        target: d.data().target,
        image: d.data().image ?? undefined,
      }))
      setGoals(list)
    })

    const unsubSettings = onSnapshot(settingsRef, (snap) => {
      if (snap.exists()) {
        setSettings({ startingBalance: snap.data().startingBalance ?? 0 })
      } else if (!snap.metadata.fromCache) {
        // Brand-new account (confirmed by the server): create settings and
        // the starter goal exactly once. Deleting the goal later stays deleted.
        void setDoc(settingsRef, { startingBalance: 0 })
        void addDoc(goalsRef, {
          name: DEFAULT_GOAL_NAME,
          target: DEFAULT_GOAL_TARGET,
        })
      }
    })

    return () => {
      unsubEntries()
      unsubGoals()
      unsubSettings()
    }
  }, [uid])

  const addEntry = useCallback(
    async (entry: Omit<Entry, 'id'>): Promise<string | undefined> => {
      if (!uid) return undefined
      const db = getDb()
      const ref = await addDoc(collection(db, 'users', uid, 'entries'), entry)
      return ref.id
    },
    [uid],
  )

  const removeEntry = useCallback(
    async (id: string) => {
      if (!uid) return
      const db = getDb()
      await deleteDoc(doc(db, 'users', uid, 'entries', id))
    },
    [uid],
  )

  const addGoal = useCallback(
    async (name: string, target: number, image?: string) => {
      if (!uid) return
      const db = getDb()
      await addDoc(collection(db, 'users', uid, 'goals'), {
        name,
        target,
        ...(image ? { image } : {}),
      })
    },
    [uid],
  )

  const updateGoal = useCallback(
    async (
      id: string,
      patch: Partial<Pick<Goal, 'name' | 'target'>> & {
        /** string sets the picture, null removes it, undefined leaves it alone */
        image?: string | null
      },
    ) => {
      if (!uid) return
      const db = getDb()
      const { image, ...rest } = patch
      await updateDoc(doc(db, 'users', uid, 'goals', id), {
        ...rest,
        ...(image === null ? { image: deleteField() } : {}),
        ...(typeof image === 'string' ? { image } : {}),
      })
    },
    [uid],
  )

  const deleteGoal = useCallback(
    async (id: string) => {
      if (!uid) return
      const db = getDb()
      await deleteDoc(doc(db, 'users', uid, 'goals', id))
    },
    [uid],
  )

  const setStartingBalance = useCallback(
    async (startingBalance: number) => {
      if (!uid) return
      const db = getDb()
      await setDoc(
        doc(db, 'users', uid, 'settings', 'main'),
        { startingBalance },
        { merge: true },
      )
    },
    [uid],
  )

  return {
    entries,
    goals,
    settings,
    loading,
    addEntry,
    removeEntry,
    addGoal,
    updateGoal,
    deleteGoal,
    setStartingBalance,
  }
}
