// Fetches the current user's badges (with derived unlocked state) and
// all-time completed task count, for the Achievements card and its dialogs.
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import type { Achievement } from '@/components/custom/AchievementsCard'

export function useAchievements() {
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [tasksCompleted, setTasksCompleted] = useState(0)

    useEffect(() => {
        async function fetchBadges() {
            const { data: { user } } = await supabase.auth.getUser()

            const [
                { data: badges, error: badgesError },
                { data: userBadges, error: userBadgesError },
                { data: profile, error: profileError }
            ] = await Promise.all([
                supabase
                    .from('badges')
                    .select('key, label, emoji, description, task_threshold')
                    .order('task_threshold', { ascending: true }),
                user
                    ? supabase
                        .from('user_badges')
                        .select('badge_key')
                        .eq('user_id', user.id)
                    : Promise.resolve({ data: [], error: null }),
                user
                    ? supabase
                        .from('profiles')
                        .select('tasks_completed')
                        .eq('id', user.id)
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

            const earnedKeys = new Set((userBadges ?? []).map((row) => row.badge_key))

            setAchievements(badges.map((badge) => ({ ...badge, unlocked: earnedKeys.has(badge.key) })))
            setTasksCompleted(profile?.tasks_completed ?? 0)
        }

        fetchBadges()
    }, [])

    return { achievements, tasksCompleted }
}
