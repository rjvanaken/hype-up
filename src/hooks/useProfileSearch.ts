import { useEffect, useState } from 'react'
import { supabase } from '@/lib/client'

export interface SearchedProfile {
    id: string
    firstName: string
    lastName: string
    initials: string
    avatarColor: string | null
}

const SEARCH_DEBOUNCE_MS = 300

export function useProfileSearch(searchTerm: string) {
    const [results, setResults] = useState<SearchedProfile[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Keeps user input search scoped to first_name/last_name 
        const safeTerm = searchTerm.trim().replace(/[,()%_]/g, '')

        if (!safeTerm) {
            setResults([])
            setLoading(false)
            return
        }

        let cancelled = false
        setLoading(true)

        async function search() {
            const { data: { user } } = await supabase.auth.getUser()

            let query = supabase
                .from('profiles')
                .select('id, first_name, last_name, initials, avatar_color')
                .or(`first_name.ilike.%${safeTerm}%,last_name.ilike.%${safeTerm}%`)
                .limit(20)

            if (user) {
                query = query.neq('id', user.id)
            }

            const { data, error } = await query

            if (cancelled) return
            setLoading(false)

            if (error) {
                console.error('Error searching profiles:', error)
                return
            }

            setResults((data ?? []).map((profile) => ({
                id: profile.id,
                firstName: profile.first_name,
                lastName: profile.last_name,
                initials: profile.initials ?? '?',
                avatarColor: profile.avatar_color
            })))
        }

        const timeout = setTimeout(search, SEARCH_DEBOUNCE_MS)

        return () => {
            cancelled = true
            clearTimeout(timeout)
        }
    }, [searchTerm])

    return { results, loading }
}
