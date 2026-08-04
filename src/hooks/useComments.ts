import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface CommentData {
    id: string
    postId: string
    userId: string
    authorFirstName: string
    authorLastName: string
    authorInitials: string
    authorAvatarColor: string
    text: string
    createdAt: string
}

type CommentRow = {
    id: string
    post_id: string
    user_id: string
    text: string
    created_at: string
    profiles: { first_name: string; last_name: string; initials: string; avatar_color: string } | { first_name: string; last_name: string; initials: string; avatar_color: string }[] | null
}

function mapComment(row: CommentRow): CommentData {
    const author = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles

    return {
        id: row.id,
        postId: row.post_id,
        userId: row.user_id,
        authorFirstName: author?.first_name ?? '',
        authorLastName: author?.last_name ?? '',
        authorInitials: author?.initials ?? '?',
        authorAvatarColor: author?.avatar_color as string,
        text: row.text,
        createdAt: row.created_at,
    }
}

export function useComments(postId: string) {

    const [comments, setComments] = useState<CommentData[]>([])

    useEffect(() => {
        async function fetchComments() {
            const { data, error } = await supabase
                .from('comments')
                .select('id, post_id, user_id, text, created_at, profiles(first_name, last_name, initials, avatar_color)')
                .eq('post_id', postId)
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching comments:', error)
                return
            }

            setComments(data.map(mapComment))
        }

        fetchComments()
    }, [postId])

    async function addComment(text: string) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
            .from('comments')
            .insert({ post_id: postId, user_id: user.id, text })
            .select('id, post_id, user_id, text, created_at, profiles(first_name, last_name, initials, avatar_color)')
            .single()

        if (error) {
            console.error('Error adding comment:', error)
            return
        }

        setComments((prev) => [...prev, mapComment(data)])
    }

    return { comments, addComment }
}
