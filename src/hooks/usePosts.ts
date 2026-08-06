import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { usePostsRefresh } from '@/hooks/usePostsRefresh'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export interface PostData {
    id: string
    userId: string
    authorFirstName: string
    authorLastName: string
    authorInitials: string
    authorAvatarColor: string
    postType: 'share' | 'ask'
    taskType: string
    customTask: string | null
    postNote: string | null
    imageUrl: string | null
    likeCount: number
    commentsEnabled: boolean
    createdAt: string
}

export function usePosts(scope: 'feed' | 'own' = 'feed') {

    const [posts, setPosts] = useState<PostData[]>([])
    const { version } = usePostsRefresh()
    const { user } = useCurrentUser()

    useEffect(() => {
        if (!user) return

        const userId = user.id
        let cancelled = false

        async function fetchPosts() {
            let query = supabase
                .from('posts')
                .select('id, user_id, post_type, task_type, custom_task, note, image_url, like_count, comments_enabled, created_at, profiles(first_name, last_name, initials, avatar_color)')
                .order('created_at', { ascending: false })

            // 'own' scopes to the current user's posts; 'feed' relies on the
            // posts RLS policy (own, public, or followed) to decide visibility.
            if (scope === 'own') {
                query = query.eq('user_id', userId)
            }

            const { data, error } = await query

            if (cancelled) return

            if (error) {
                console.error('Error fetching posts:', error)
                return
            }

            setPosts(data.map((row) => {
                const author = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles

                return {
                    id: row.id,
                    userId: row.user_id,
                    authorFirstName: author?.first_name ?? '',
                    authorLastName: author?.last_name ?? '',
                    authorInitials: author?.initials ?? '?',
                    authorAvatarColor: author?.avatar_color as string,
                    postType: row.post_type,
                    taskType: row.task_type,
                    customTask: row.custom_task,
                    postNote: row.note,
                    imageUrl: row.image_url,
                    likeCount: row.like_count,
                    commentsEnabled: row.comments_enabled,
                    createdAt: row.created_at,
                }
            }))
        }

        fetchPosts()

        return () => {
            cancelled = true
        }
    }, [version, scope, user])

    return posts
}
