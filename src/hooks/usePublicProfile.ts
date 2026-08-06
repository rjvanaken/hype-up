import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export interface PublicProfile {
    userId: string
    firstName: string
    lastName: string
    initials: string
    avatarColor: string
    streakCount: number
    location: string | ''
    bio: string | ''
    isOwnProfile: boolean
}

export function usePublicProfile(userId?: string) {
    const { user } = useCurrentUser()
    const [profile, setProfile] = useState<PublicProfile | null>(null)

    useEffect(() => {
        if (!user) return

        const targetId = userId ?? user.id
        let cancelled = false

        async function fetchProfile() {
            const { data, error } = await supabase
                .from('profiles')
                .select('id, first_name, last_name, initials, avatar_color, streak_count, location, bio')
                .eq('id', targetId)
                .single()

            if (cancelled) return

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile({
                userId: targetId,
                firstName: data.first_name,
                lastName: data.last_name,
                initials: data.initials ?? '?',
                avatarColor: data.avatar_color,
                streakCount: data.streak_count ?? 0,
                location: data.location ?? '',
                bio: data.bio ?? '',
                isOwnProfile: targetId === user.id
            })
        }

        fetchProfile()

        return () => {
            cancelled = true
        }
    }, [userId, user])

    return profile
}
