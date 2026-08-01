import { useState } from 'react'
import { supabase } from '@/lib/client'
import { taskOptions } from '@/lib/taskOptions'

// This describes the shape of the object that createPost() expects to
// receive when it's called. It's the "form data" this hook needs from
// CreatePost.tsx — nothing more (no id, no created_at, etc., since the
// database fills those in itself).
interface CreatePostInput {
    boostMode: boolean     // true = "ask for a boost" post, false = "share" post
    task: string           // the raw <select> value, e.g. 'studying' (lowercase, from taskOptions)
    description: string    // the free-text "describe it" field, only used when task === 'other'
    note: string           // the optional note/caption field
    image: File | null     // the photo picked in the file input, if any
}

// This is the hook itself. Unlike usePosts()/useProfile(), it does NOT
// fetch anything automatically on mount — there's no useEffect here.
// Instead, calling useCreatePost() just sets up a function (createPost)
// that the component can call later, whenever the user actually submits
// the form. That's the difference between a "data" hook and an "action" hook.
export function useCreatePost() {
    // Local state so the component can show a loading state / disable the
    // submit button while the insert is happening. Starts false because
    // nothing is submitting yet.
    const [isSubmitting, setIsSubmitting] = useState(false)

    // The actual function CreatePost.tsx will call on submit. It takes one
    // object argument, and immediately destructures it into the four
    // individual values (boostMode, task, description, note) so we can use
    // them directly below instead of writing "input.task" everywhere.
    async function createPost({ boostMode, task, description, note, image }: CreatePostInput) {
        // Flip the loading flag on right away, before any network calls.
        setIsSubmitting(true)

        // Ask Supabase who's currently logged in. This is an async call —
        // that's why this whole function has to be declared `async`, and
        // why we can write `await` in front of it instead of dealing with
        // .then(...). Note the double destructuring: supabase.auth.getUser()
        // resolves to { data: { user } }, so `{ data: { user } }` reaches
        // straight into that nested shape to pull out just `user`.
        const { data: { user } } = await supabase.auth.getUser()

        // Defensive check: if for some reason there's no logged-in user
        // (session expired, etc.), bail out early instead of trying to
        // insert a post with no author. Turn the loading flag back off
        // since we're stopping here.
        if (!user) {
            setIsSubmitting(false)
            return false
        }

        // taskOptions (from src/lib/taskOptions.ts) is the same
        // { value, label } list used to build the dropdown in
        // CreatePost.tsx. `task` only holds the raw value (e.g. 'studying'),
        // but the database/feed expect the human-readable label
        // (e.g. 'Studying'). So: if the user picked "Other", we hardcode
        // the label to 'Other'. Otherwise, .find() scans taskOptions for
        // the entry whose `.value` matches `task`, and `?.label` grabs its
        // label. The `?.` (optional chaining) means "if .find() didn't
        // match anything, don't crash — just produce undefined instead."
        // The final `?? task` is a fallback: if nothing matched at all,
        // just use the raw value rather than storing "undefined".
        const taskType = task === 'other'
            ? 'Other'
            : taskOptions.find((option) => option.value === task)?.label ?? task

        // If a photo was picked, upload it to the 'post_images' Storage
        // bucket before we insert the post row, so we have a real URL to
        // save into image_url. If there's no image, skip straight to null
        // — image_url is nullable, so "no photo" is just a normal post.
        let imageUrl: string | null = null

        if (image) {
            // Storage paths are just strings, not columns — this builds
            // "<user id>/<timestamp>-<original file name>" so each user's
            // uploads live under their own folder (matching the
            // `auth.uid()::text = (storage.foldername(name))[1]` check in
            // the bucket's upload policy) and two uploads can't collide.
            const path = `${user.id}/${Date.now()}-${image.name}`

            const { error: uploadError } = await supabase.storage
                .from('post_images')
                .upload(path, image)

            // If the upload itself fails, there's no point continuing on
            // to insert a post — stop here and report failure, the same
            // way the !user check above does.
            if (uploadError) {
                console.error('Error uploading image:', uploadError)
                setIsSubmitting(false)
                return false
            }

            // getPublicUrl() doesn't make a network request — it just
            // builds the public URL string for a path in a public bucket.
            // That's what gets stored in image_url so the feed can render
            // <img src={...}> directly, without another Supabase call.
            imageUrl = supabase.storage.from('post_images').getPublicUrl(path).data.publicUrl
        }

        // The actual write to the database. `.insert({...})` creates one
        // new row in the posts table. Each key here is a column name;
        // each value is what goes in that column for this new post:
        //   - user_id: whoever is logged in (from above)
        //   - post_type: 'ask' for boost-mode posts, 'share' otherwise
        //   - task_type: the human-readable label we just worked out
        //   - custom_task: only filled in when task is 'other' — otherwise
        //     null, since there's no custom description to store
        //   - note: the note field, or null instead of an empty string if
        //     the user left it blank
        //   - image_url: the public URL from the upload above, or null if
        //     no photo was attached
        // Notice there's no comments_enabled here: whether comments show
        // up isn't decided at creation time. It's controlled later, when
        // a post is read back, by checking the author's current profile
        // setting live — not by freezing a value onto the post the moment
        // it's created. The posts.comments_enabled column just takes its
        // database default (true) here.
        // We destructure just `{ error }` off the result because we don't
        // need the inserted row's data back right now — only whether it
        // failed.
        const { error } = await supabase.from('posts').insert({
            user_id: user.id,
            post_type: boostMode ? 'ask' : 'share',
            task_type: taskType,
            custom_task: task === 'other' ? description : null,
            note: note || null,
            image_url: imageUrl,
        })

        // Either way (success or failure), we're done submitting.
        setIsSubmitting(false)

        // If Supabase reported a problem, log it and tell the caller
        // (CreatePost.tsx) that it failed by returning false. This mirrors
        // the same error-handling style used in usePosts.ts/useProfile.ts.
        if (error) {
            console.error('Error creating post:', error)
            return false
        }

        // No error means the insert worked — tell the caller so it knows
        // it can safely reset the form and close the dialog.
        return true
    }

    // Hand back both the function and the loading flag so CreatePost.tsx
    // can do: const { createPost, isSubmitting } = useCreatePost()
    return { createPost, isSubmitting }
}
