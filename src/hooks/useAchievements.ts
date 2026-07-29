import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import type { Achievement } from '@/components/custom/AchievementsCard'

export function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([])

    useEffect(() => {
        async function fetchBadges() {
            const { data: { user } } = await supabase.auth.getUser()

            const [{ data: badges, error: badgesError }, { data: userBadges, error: userBadgesError }] = await Promise.all([
                supabase
                    .from('badges')
                    .select('key, label, emoji, description, task_threshold')
                    .order('task_threshold', { ascending: true }),
                user
                    ? supabase
                        .from('user_badges')
                        .select('badge_key')
                        .eq('user_id', user.id)
                    : Promise.resolve({ data: [], error: null })
            ])

            if (badgesError) {
                console.error('Error fetching badges:', badgesError)
                return
            }

            if (userBadgesError) {
                console.error('Error fetching user_badges:', userBadgesError)
            }

            const earnedKeys = new Set((userBadges ?? []).map((row) => row.badge_key))

            setAchievements(badges.map((badge) => ({ ...badge, unlocked: earnedKeys.has(badge.key) })))
        }

        fetchBadges()
    }, [])

    return achievements
}
