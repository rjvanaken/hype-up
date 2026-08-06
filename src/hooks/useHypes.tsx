import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/client'

interface HypesContextValue {
    hypeIds: Set<string>
    pendingIds: Set<string>
    hype: (postId: string) => Promise<void>
    unhype: (postId: string) => Promise<void>
}

const HypesContext = createContext<HypesContextValue | null>(null)

export function HypesProvider({ children }: { children: ReactNode }) {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [hypeIds, setHypeIds] = useState<Set<string>>(new Set())
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        let cancelled = false

        async function loadHypes() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            if (cancelled) return
            setCurrentUserId(user.id)

            const { data, error } = await supabase
                .from('likes')
                .select('post_id')
                .eq('user_id', user.id)

            if (cancelled) return

            if (error) {
                console.error('Error fetching hype ids:', error)
                return
            }

            setHypeIds(new Set((data ?? []).map((row) => row.post_id)))
        }

        loadHypes()

        return () => {
            cancelled = true
        }
    }, [])

    const hype = useCallback(async (postId: string) => {
        if (!currentUserId) return

        setPendingIds((prev) => new Set(prev).add(postId))

        const { error } = await supabase
            .from('likes')
            .insert({ user_id: currentUserId, post_id: postId })

        setPendingIds((prev) => {
            const next = new Set(prev)
            next.delete(postId)
            return next
        })

        if (error) {
            console.error('Error hyping post:', error)
            return
        }

        setHypeIds((prev) => new Set(prev).add(postId))
    }, [currentUserId])

    const unhype = useCallback(async (postId: string) => {
        if (!currentUserId) return

        setPendingIds((prev) => new Set(prev).add(postId))

        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('user_id', currentUserId)
            .eq('post_id', postId)

        setPendingIds((prev) => {
            const next = new Set(prev)
            next.delete(postId)
            return next
        })

        if (error) {
            console.error('Error unhyping post:', error)
            return
        }

        setHypeIds((prev) => {
            const next = new Set(prev)
            next.delete(postId)
            return next
        })
    }, [currentUserId])

    return (
        <HypesContext.Provider value={{ hypeIds, pendingIds, hype, unhype }}>
            {children}
        </HypesContext.Provider>
    )
}

export function useHypes() {
    const context = useContext(HypesContext)
    if (!context) {
        throw new Error('useHypes must be used within a HypesProvider')
    }
    return context
}
