import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import type { ProfileSummaryCardProps } from '@/components/custom/Home/ProfileSummaryCard'

export function useProfileSummary() {
    const [summary, setSummary] = useState<ProfileSummaryCardProps | null>(null)

    useEffect(() => {
        async function fetchSummary() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const [
                { data: profile, error: profileError },
                { count: followers, error: followersError },
                { count: following, error: followingError }
            ] = await Promise.all([
                supabase
                    .from('profiles')
                    .select('first_name, last_name, initials, streak_count, tasks_completed')
                    .eq('id', user.id)
                    .single(),
                supabase
                    .from('follows')
                    .select('*', { count: 'exact', head: true })
                    .eq('following_id', user.id)
                    .eq('status', 'accepted'),
                supabase
                    .from('follows')
                    .select('*', { count: 'exact', head: true })
                    .eq('follower_id', user.id)
                    .eq('status', 'accepted')
            ])

            if (profileError) {
                console.error('Error fetching profile summary:', profileError)
                return
            }

            if (followersError) {
                console.error('Error fetching followers count:', followersError)
            }

            if (followingError) {
                console.error('Error fetching following count:', followingError)
            }

            setSummary({
                firstName: profile.first_name,
                lastName: profile.last_name,
                initials: profile.initials ?? '?',
                streak: profile.streak_count ?? 0,
                tasks: profile.tasks_completed ?? 0,
                following: following ?? 0,
                followers: followers ?? 0
            })
        }

        fetchSummary()
    }, [])

    return summary
}
