import { useState } from 'react'
import { supabase } from '@/lib/client'
import { taskOptions } from '@/lib/taskOptions'

interface CreatePostInput {
    boostMode: boolean
    task: string
    description: string
    note: string
    image: File | null
}

export function useCreatePost() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function createPost({ boostMode, task, description, note, image }: CreatePostInput) {
        setIsSubmitting(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setIsSubmitting(false)
            return false
        }

        const taskType = task === 'other'
            ? 'Other'
            : taskOptions.find((option) => option.value === task)?.label ?? task

        let imageUrl: string | null = null

        if (image) {
            const path = `${user.id}/${Date.now()}-${image.name}`

            const { error: uploadError } = await supabase.storage
                .from('post_images')
                .upload(path, image)

            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                setIsSubmitting(false)
                return false
            }

            imageUrl = supabase.storage.from('post_images').getPublicUrl(path).data.publicUrl
        }

        const { error } = await supabase.from('posts').insert({
            user_id: user.id,
            post_type: boostMode ? 'ask' : 'share',
            task_type: taskType,
            custom_task: task === 'other' ? description : null,
            note: note || null,
            image_url: imageUrl,
        })

        setIsSubmitting(false)

        if (error) {
            console.error('Error creating post:', error)
            return false
        }

        return true
    }

    return { createPost, isSubmitting }
}
