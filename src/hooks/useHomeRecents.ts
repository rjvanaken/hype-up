import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface RecentPoster {
    id: string
    firstName: string
    initials: string
    avatarColor: string | null
    latestPostType: 'share' | 'ask'
}

export function useHomeRecents() {
    const [recentPosters, setRecentPosters] = useState<RecentPoster[]>([])

    useEffect(() => {
        let cancelled = false

        async function fetchRecentPosters() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data: follows, error: followsError } = await supabase
                .from('follows')
                .select('following_id')
                .eq('follower_id', user.id)
                .eq('status', 'accepted')

            if (followsError) {
                console.error('Error fetching follows:', followsError)
                return
            }

            const followingIds = (follows ?? []).map((row) => row.following_id)
            if (followingIds.length === 0) {
                if (!cancelled) setRecentPosters([])
                return
            }

            const sinceIso = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

            const { data: recentPosts, error: postsError } = await supabase
                .from('posts')
                .select('user_id, post_type, created_at')
                .in('user_id', followingIds)
                .gte('created_at', sinceIso)
                .order('created_at', { ascending: false })

            if (postsError) {
                console.error('Error fetching recent posts:', postsError)
                return
            }

            const latestPostTypeByUserId = new Map<string, 'share' | 'ask'>()
            for (const post of recentPosts ?? []) {
                if (!latestPostTypeByUserId.has(post.user_id)) {
                    latestPostTypeByUserId.set(post.user_id, post.post_type)
                }
            }

            const posterIds = [...latestPostTypeByUserId.keys()]
            if (posterIds.length === 0) {
                if (!cancelled) setRecentPosters([])
                return
            }

            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('id, first_name, initials, avatar_color')
                .in('id', posterIds)

            if (profilesError) {
                console.error('Error fetching profiles:', profilesError)
                return
            }

            if (!cancelled) {
                setRecentPosters((profiles ?? []).map((profile) => ({
                    id: profile.id,
                    firstName: profile.first_name,
                    initials: profile.initials ?? '?',
                    avatarColor: profile.avatar_color,
                    latestPostType: latestPostTypeByUserId.get(profile.id) ?? 'share'
                })))
            }
        }

        fetchRecentPosters()

        return () => {
            cancelled = true
        }
    }, [])

    return recentPosters
}
