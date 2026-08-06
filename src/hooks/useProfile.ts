import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface Profile {
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

export function useProfile(userId?: string) {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const targetId = userId ?? user.id

            const { data, error } = await supabase
                .from('profiles')
                .select('id, first_name, last_name, initials, avatar_color, streak_count, location, bio')
                .eq('id', targetId)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile({
                userId: user.id,
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
    }, [userId])

    return profile
}
