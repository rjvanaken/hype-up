import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const WINDOW_DAYS = 28

export function toLocalDateKey(value: Date | string) {
    const date = typeof value === 'string' ? new Date(value) : value
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export function useStreak() {
    const { user } = useCurrentUser()
    const [activityDates, setActivityDates] = useState<Set<string>>(new Set())
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!user) return

        const userId = user.id
        let cancelled = false

        async function fetchStreakDays() {
            setIsLoading(true)

            const windowStart = new Date(Date.now() - WINDOW_DAYS * 24 * 60 * 60 * 1000)

            const { data, error } = await supabase
                .from('posts')
                .select('created_at')
                .eq('user_id', userId)
                .eq('post_type', 'share')
                .gte('created_at', windowStart.toISOString())

            if (cancelled) return

            if (error) {
                console.error('Error fetching streak data:', error)
                setIsLoading(false)
                return
            }

            setActivityDates(new Set(data.map((row) => toLocalDateKey(row.created_at))))
            setIsLoading(false)
        }

        fetchStreakDays()

        return () => {
            cancelled = true
        }
    }, [user])

    return { activityDates, isLoading }
}
