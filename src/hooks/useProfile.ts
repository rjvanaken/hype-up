// Fetches the current user's own profile row for the Profile page banner
// (name, initials, avatar color, streak count).
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface Profile {
    name: string
    initials: string
    avatarColor: string | null
    streakCount: number
}

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('name, initials, avatar_color, streak_count')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile({
                name: data.name,
                initials: data.initials ?? '?',
                avatarColor: data.avatar_color,
                streakCount: data.streak_count ?? 0
            })
        }

        fetchProfile()
    }, [])

    return profile
}
