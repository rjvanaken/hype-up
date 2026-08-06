import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

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
    const { user } = useCurrentUser()
    const [profile, setProfile] = useState<Profile | null>(null)

    useEffect(() => {
        if (!user) return

        const userId = user.id
        let cancelled = false

        async function fetchProfile() {
            const { data, error } = await supabase
                .from('profiles')
                .select('first_name, last_name, initials, avatar_color, streak_count, location, bio')
                .eq('id', userId)
                .single()

            if (cancelled) return

            if (error) {
                console.error('Error fetching profile:', error)
                return
            }

            setProfile({
                userId,
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
    }, [user])

    return (
        <ProfileContext.Provider value={profile}>
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfile() {
    return useContext(ProfileContext)
}
