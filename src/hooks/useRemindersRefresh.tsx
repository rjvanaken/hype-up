import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface RemindersRefreshContextValue {
    version: number
    triggerRefresh: () => void
}

const RemindersRefreshContext = createContext<RemindersRefreshContextValue | null>(null)

export function RemindersRefreshProvider({ children }: { children: ReactNode }) {
    const [version, setVersion] = useState(0)
    const triggerRefresh = useCallback(() => setVersion((current) => current + 1), [])

    return (
        <RemindersRefreshContext.Provider value={{ version, triggerRefresh }}>
            {children}
        </RemindersRefreshContext.Provider>
    )
}

export function useRemindersRefresh() {
    const context = useContext(RemindersRefreshContext)
    if (!context) {
        throw new Error('useRemindersRefresh must be used within a RemindersRefreshProvider')
    }
    return context
}
