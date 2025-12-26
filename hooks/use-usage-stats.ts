import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { usageService } from '@/lib/usage.service'
import { UsageStatsResponse } from '@/lib/usage.types'
import { useTabVisibility } from './use-tab-visibility'

interface UseUsageStatsOptions {
    startDate?: string | null
    endDate?: string | null
    enabled?: boolean
}

/**
 * Hook to fetch and manage usage statistics using React Query.
 * Includes auto-refresh logic optimized for tab visibility.
 * 
 * @param options Filter options and enabled state
 * @returns React Query result for usage stats
 */
export function useUsageStats({
    startDate,
    endDate,
    enabled = true
}: UseUsageStatsOptions = {}) {
    const { getToken } = useAuth()
    const { isVisible } = useTabVisibility()

    return useQuery<UsageStatsResponse>({
        queryKey: ['usage-stats', startDate, endDate],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error('Not authenticated')

            return usageService.fetchUsageStats(token, {
                start_date: startDate,
                end_date: endDate
            })
        },
        enabled: enabled,
        // Refetch every 30 seconds only if tab is visible
        refetchInterval: (query) => {
            if (query.state.status === 'error') return false
            return isVisible ? 30000 : false
        },
        // Keep previous data while fetching new data to prevent UI flicker
        placeholderData: (previousData) => previousData,
        // Consider data stale after 5 minutes
        staleTime: 5 * 60 * 1000,
        // Refetch when window regains focus
        refetchOnWindowFocus: true,
    })
}
