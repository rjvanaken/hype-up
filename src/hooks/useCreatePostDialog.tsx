import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface CreatePostDialogContextValue {
    open: boolean
    boostMode: boolean
    openCreatePost: (boostMode?: boolean) => void
    setOpen: (open: boolean) => void
}

const CreatePostDialogContext = createContext<CreatePostDialogContextValue | null>(null)

export function CreatePostDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [boostMode, setBoostMode] = useState(false)

    const openCreatePost = useCallback((selectedBoostMode = false) => {
        setBoostMode(selectedBoostMode)
        setOpen(true)
    }, [])

    return (
        <CreatePostDialogContext.Provider value={{ open, boostMode, openCreatePost, setOpen }}>
            {children}
        </CreatePostDialogContext.Provider>
    )
}

export function useCreatePostDialog() {
    const context = useContext(CreatePostDialogContext)
    if (!context) {
        throw new Error('useCreatePostDialog must be used within a CreatePostDialogProvider')
    }
    return context
}
