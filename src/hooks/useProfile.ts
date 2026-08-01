import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface Profile {
    firstName: string
    lastName: string
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
                .select('first_name, last_name, initials, avatar_color, streak_count')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile({
                firstName: data.first_name,
                lastName: data.last_name,
                initials: data.initials ?? '?',
                avatarColor: data.avatar_color,
                streakCount: data.streak_count ?? 0
            })
        }

        fetchProfile()
    }, [])

    return profile
}
