import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/client'

interface CurrentUserContextValue {
    user: User | null
    loading: boolean
}

const CurrentUserContext = createContext<CurrentUserContextValue>({ user: null, loading: true })

export function CurrentUserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        supabase.auth.getUser().then(({ data }) => {
            if (cancelled) return
            setUser(data.user)
            setLoading(false)
        })

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <CurrentUserContext.Provider value={{ user, loading }}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export function useCurrentUser() {
    return useContext(CurrentUserContext)
}
