import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface PostsRefreshContextValue {
    version: number
    triggerRefresh: () => void
}

const PostsRefreshContext = createContext<PostsRefreshContextValue | null>(null)

// Wraps the part of the app where posts are both created and displayed, so
// both sides can agree on when a refetch is needed without knowing about
// each other directly. `version` starts at 0 and increments every time
// triggerRefresh() is called (e.g. after a successful post creation).
export function PostsRefreshProvider({ children }: { children: ReactNode }) {
    const [version, setVersion] = useState(0)
    const triggerRefresh = useCallback(() => setVersion((current) => current + 1), [])

    return (
        <PostsRefreshContext.Provider value={{ version, triggerRefresh }}>
            {children}
        </PostsRefreshContext.Provider>
    )
}

export function usePostsRefresh() {
    const context = useContext(PostsRefreshContext)
    if (!context) {
        throw new Error('usePostsRefresh must be used within a PostsRefreshProvider')
    }
    return context
}
