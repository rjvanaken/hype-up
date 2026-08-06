import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import type { Achievement } from '@/components/custom/Achievements/AchievementsCard'

export function useAchievements(userId?: string) {
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [tasksCompleted, setTasksCompleted] = useState(0)

    useEffect(() => {
        async function fetchBadges() {
            const { data: { user } } = await supabase.auth.getUser()
            const targetId = userId ?? user?.id

            const [
                { data: badges, error: badgesError },
                { data: userBadges, error: userBadgesError },
                { data: profile, error: profileError }
            ] = await Promise.all([
                supabase
                    .from('badges')
                    .select('key, label, emoji, description, task_threshold')
                    .order('task_threshold', { ascending: true }),
                targetId
                    ? supabase
                        .from('user_badges')
                        .select('badge_key, earned_at')
                        .eq('user_id', targetId)
                    : Promise.resolve({ data: [], error: null }),
                targetId
                    ? supabase
                        .from('profiles')
                        .select('tasks_completed')
                        .eq('id', targetId)
                        .single()
                    : Promise.resolve({ data: null, error: null })
            ])

            if (badgesError) {
                console.error('Error fetching badges:', badgesError)
                return
            }

            if (userBadgesError) {
                console.error('Error fetching user_badges:', userBadgesError)
            }

            if (profileError) {
                console.error('Error fetching profile:', profileError)
            }

            const earnedAtByKey = new Map((userBadges ?? []).map((row) => [row.badge_key, row.earned_at]))

            setAchievements(badges.map((badge) => ({
                ...badge,
                unlocked: earnedAtByKey.has(badge.key),
                earnedAt: earnedAtByKey.get(badge.key) ?? null
            })))
            setTasksCompleted(profile?.tasks_completed ?? 0)
        }

        fetchBadges()
    }, [userId])

    return { achievements, tasksCompleted }
}
