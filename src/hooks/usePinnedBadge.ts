import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export function usePinnedBadge() {
    const { user } = useCurrentUser()
    const [pinnedBadgeKey, setPinnedBadgeKey] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        const userId = user.id

        async function fetchPinned() {
            const { data, error } = await supabase
                .from('profiles')
                .select('pinned_badge_key')
                .eq('id', userId)
                .single()

            if (error) {
                console.error('Error fetching pinned badge:', error)
                return
            }

            setPinnedBadgeKey(data.pinned_badge_key)
        }

        fetchPinned()
    }, [user])

    async function setPinned(key: string | null) {
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
