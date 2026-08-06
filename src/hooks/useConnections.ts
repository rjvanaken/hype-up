import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export interface ConnectionProfile {
    id: string
    firstName: string
    lastName: string
    initials: string
    avatarColor: string | null
}

async function fetchProfiles(ids: string[]): Promise<ConnectionProfile[]> {
    if (ids.length === 0) return []

    const { data, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, initials, avatar_color')
        .in('id', ids)

    if (error) {
        console.error('Error fetching profiles:', error)
        return []
    }

    return (data ?? []).map((profile) => ({
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        initials: profile.initials ?? '?',
        avatarColor: profile.avatar_color
    }))
}

export function useConnections() {
    const { user } = useCurrentUser()
    const [followers, setFollowers] = useState<ConnectionProfile[]>([])
    const [following, setFollowing] = useState<ConnectionProfile[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const userId = user.id

        async function fetchConnections() {
            setIsLoading(true)

            const [
                { data: followerRows, error: followerError },
                { data: followingRows, error: followingError }
            ] = await Promise.all([
                supabase
                    .from('follows')
                    .select('follower_id')
                    .eq('following_id', userId)
                    .eq('status', 'accepted'),
                supabase
                    .from('follows')
                    .select('following_id')
                    .eq('follower_id', userId)
                    .eq('status', 'accepted')
            ])

            if (followerError) {
                console.error('Error fetching followers:', followerError)
            }

            if (followingError) {
                console.error('Error fetching following:', followingError)
            }

            const [followerProfiles, followingProfiles] = await Promise.all([
                fetchProfiles((followerRows ?? []).map((row) => row.follower_id)),
                fetchProfiles((followingRows ?? []).map((row) => row.following_id))
            ])

            setFollowers(followerProfiles)
            setFollowing(followingProfiles)
            setIsLoading(false)
        }

        fetchConnections()
    }, [user])

    return { followers, following, isLoading }
}
