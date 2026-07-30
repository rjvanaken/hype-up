import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export function usePinnedBadge() {
    const [pinnedBadgeKey, setPinnedBadgeKey] = useState<string | null>(null)

    useEffect(() => {
        async function fetchPinned() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data, error } = await supabase
                .from('profiles')
                .select('pinned_badge_key')
                .eq('id', user.id)
                .single()

            if (error) {
                console.error('Error fetching pinned badge:', error)
                return
            }

            setPinnedBadgeKey(data.pinned_badge_key)
        }

        fetchPinned()
    }, [])

    async function setPinned(key: string | null) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { error } = await supabase
            .from('profiles')
            .update({ pinned_badge_key: key })
            .eq('id', user.id)

        if (error) {
            console.error('Error updating pinned badge:', error)
            return
        }

        setPinnedBadgeKey(key)
    }

    return { pinnedBadgeKey, setPinned }
}
