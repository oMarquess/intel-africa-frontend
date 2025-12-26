import { useEffect, useState } from 'react'

export interface UseTabVisibilityReturn {
    isVisible: boolean
    visibilityState: DocumentVisibilityState
}

/**
 * Hook to detect when the browser tab is visible or hidden.
 * Uses the Page Visibility API to track tab state.
 * 
 * @returns Object with isVisible boolean and visibilityState
 * 
 * @example
 * const { isVisible } = useTabVisibility()
 * // Use isVisible to pause/resume auto-refresh
 */
export function useTabVisibility(): UseTabVisibilityReturn {
    const [isVisible, setIsVisible] = useState(!document.hidden)
    const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState>(
        document.visibilityState
    )

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsVisible(!document.hidden)
            setVisibilityState(document.visibilityState)
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return { isVisible, visibilityState }
}
