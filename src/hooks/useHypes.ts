import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export function useHypes() {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [hypeIds, setHypeIds] = useState<Set<string>>(new Set())
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        async function loadHypes() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            setCurrentUserId(user.id)

            const { data, error } = await supabase
                .from('likes')
                .select('post_id')
                .eq('user_id', user.id)

            if (error) {
                console.error('Error fetching hype ids:', error)
                return
            }

            setHypeIds(new Set((data ?? []).map((row) => row.post_id)))
        }

        loadHypes()
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

    return { hypeIds, pendingIds, hype, unhype }
}
