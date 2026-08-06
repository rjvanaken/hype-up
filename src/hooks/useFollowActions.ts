import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export function useFollowActions() {
    const { user } = useCurrentUser()
    const currentUserId = user?.id ?? null
    const [followingIds, setFollowingIds] = useState<Set<string>>(new Set())
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set())

    useEffect(() => {
        if (!currentUserId) return

        async function loadFollowing() {
            const { data, error } = await supabase
                .from('follows')
                .select('following_id')
                .eq('follower_id', currentUserId)
                .eq('status', 'accepted')

            if (error) {
                console.error('Error fetching following ids:', error)
                return
            }

            setFollowingIds(new Set((data ?? []).map((row) => row.following_id)))
        }

        loadFollowing()
    }, [currentUserId])

    const follow = useCallback(async (targetId: string) => {
        if (!currentUserId) return

        setPendingIds((prev) => new Set(prev).add(targetId))

        const { error } = await supabase
            .from('follows')
            .insert({ follower_id: currentUserId, following_id: targetId, status: 'accepted' })

        setPendingIds((prev) => {
            const next = new Set(prev)
            next.delete(targetId)
            return next
        })

        if (error) {
            console.error('Error following user:', error)
            return
        }

        setFollowingIds((prev) => new Set(prev).add(targetId))
    }, [currentUserId])

    const unfollow = useCallback(async (targetId: string) => {
        if (!currentUserId) return

        setPendingIds((prev) => new Set(prev).add(targetId))

        const { error } = await supabase
            .from('follows')
            .delete()
            .eq('follower_id', currentUserId)
            .eq('following_id', targetId)

        setPendingIds((prev) => {
            const next = new Set(prev)
            next.delete(targetId)
            return next
        })

        if (error) {
            console.error('Error unfollowing user:', error)
            return
        }

        setFollowingIds((prev) => {
            const next = new Set(prev)
            next.delete(targetId)
            return next
        })
    }, [currentUserId])

    return { followingIds, pendingIds, follow, unfollow }
}
