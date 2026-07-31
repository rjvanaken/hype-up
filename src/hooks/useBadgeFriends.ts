import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface BadgeFriend {
    id: string
    initials: string
    avatarColor: string | null
}

export function useBadgeFriends(badgeKey: string, enabled: boolean) {
    const [friends, setFriends] = useState<BadgeFriend[]>([])

    useEffect(() => {
        if (!enabled || !badgeKey) return

        let cancelled = false

        async function fetchFriends() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data: follows, error: followsError } = await supabase
                .from('follows')
                .select('following_id')
                .eq('follower_id', user.id)
                .eq('status', 'accepted')

            if (followsError) {
                console.error('Error fetching follows:', followsError)
                return
            }

            const friendIds = (follows ?? []).map((row) => row.following_id)
            if (friendIds.length === 0) {
                if (!cancelled) setFriends([])
                return
            }

            const { data: badgeHolders, error: badgeHoldersError } = await supabase
                .from('user_badges')
                .select('user_id')
                .eq('badge_key', badgeKey)
                .in('user_id', friendIds)

            if (badgeHoldersError) {
                console.error('Error fetching user_badges:', badgeHoldersError)
                return
            }

            const holderIds = (badgeHolders ?? []).map((row) => row.user_id)
            if (holderIds.length === 0) {
                if (!cancelled) setFriends([])
                return
            }

            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('id, initials, avatar_color')
                .in('id', holderIds)

            if (profilesError) {
                console.error('Error fetching profiles:', profilesError)
                return
            }

            if (!cancelled) {
                setFriends((profiles ?? []).map((profile) => ({
                    id: profile.id,
                    initials: profile.initials ?? '?',
                    avatarColor: profile.avatar_color
                })))
            }
        }

        fetchFriends()

        return () => {
            cancelled = true
        }
    }, [badgeKey, enabled])

    return friends
}
