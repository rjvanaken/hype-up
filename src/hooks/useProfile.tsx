import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
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
}

const ProfileContext = createContext<Profile | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        let cancelled = false

        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('first_name, last_name, initials, avatar_color, streak_count, location, bio')
                .eq('id', user.id)
                .single()

            if (cancelled) return

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
                bio: data.bio ?? ''
            })
        }

        fetchProfile()

        return () => {
            cancelled = true
        }
    }, [])

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    return useContext(ProfileContext)
}
