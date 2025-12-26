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
    // Initialize with true for SSR, update on mount
    const [isVisible, setIsVisible] = useState(true)
    const [visibilityState, setVisibilityState] = useState<DocumentVisibilityState>('visible')

    useEffect(() => {
        // Update initial state once mounted on client
        if (typeof document !== 'undefined') {
            setIsVisible(!document.hidden)
            setVisibilityState(document.visibilityState)

            const handleVisibilityChange = () => {
                setIsVisible(!document.hidden)
                setVisibilityState(document.visibilityState)
            }

            document.addEventListener('visibilitychange', handleVisibilityChange)

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange)
            }
        }
    }, [])

    return { isVisible, visibilityState }
}
