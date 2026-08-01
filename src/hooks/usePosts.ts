import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface PostData {
    id: string
    userId: string
    taskType: string
    customTask: string | null
    postNote: string | null
    likeCount: number
    commentsEnabled: boolean
    createdAt: string
}

export function usePosts(scope: 'feed' | 'own' = 'feed') {

    const [posts, setPosts] = useState<PostData[]>([])

    useEffect(() => {
        async function fetchPosts() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            let query = supabase
                .from('posts')
                .select('id, user_id, task_type, custom_task, note, like_count, comments_enabled, created_at')
                .order('created_at', { ascending: false })

            // 'own' scopes to the current user's posts; 'feed' relies on the
            // posts RLS policy (own, public, or followed) to decide visibility.
            if (scope === 'own') {
                query = query.eq('user_id', user.id)
            }

            const { data, error } = await query

            if (error) {
                console.error('Error fetching posts:', error)
                return
            }

            setPosts(data.map((row) => ({
                id: row.id,
                userId: row.user_id,
                taskType: row.task_type,
                customTask: row.custom_task,
                postNote: row.note,
                likeCount: row.like_count,
                commentsEnabled: row.comments_enabled,
                createdAt: row.created_at,
            })))
        }

        fetchPosts()
    }, [])

    return posts
}
