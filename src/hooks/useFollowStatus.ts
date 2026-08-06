import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export function useFollowStatus(targetUserId?: string) {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [isFollowing, setIsFollowing] = useState(false)
    const [pending, setPending] = useState(false)

    useEffect(() => {
        async function checkStatus() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || !targetUserId) return
            setCurrentUserId(user.id)

            const { data, error } = await supabase
                .from('follows')
                .select('follower_id')
                .eq('follower_id', user.id)
                .eq('following_id', targetUserId)
                .eq('status', 'accepted')
                .maybeSingle()

            if (error) {
                console.error('Error checking follow status:', error)
                return
            }

            setIsFollowing(!!data)
        }

        checkStatus()
    }, [targetUserId])

    const toggleFollow = useCallback(async () => {
        if (!currentUserId || !targetUserId) return

        setPending(true)

        if (isFollowing) {
            const { error } = await supabase
                .from('follows')
                .delete()
                .eq('follower_id', currentUserId)
                .eq('following_id', targetUserId)

            setPending(false)

            if (error) {
                console.error('Error unfollowing user:', error)
                return
            }

            setIsFollowing(false)
        } else {
            const { error } = await supabase
                .from('follows')
                .insert({ follower_id: currentUserId, following_id: targetUserId, status: 'accepted' })

            setPending(false)

            if (error) {
                console.error('Error following user:', error)
                return
            }

            setIsFollowing(true)
        }
    }, [currentUserId, targetUserId, isFollowing])

    return { isFollowing, toggleFollow, pending }
}
