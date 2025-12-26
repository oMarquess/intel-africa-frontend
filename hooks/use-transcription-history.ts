import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { transcriptionService } from '@/lib/transcription.service'
import { TranscriptionHistoryParams } from '@/lib/transcription.types'

/**
 * Hook to fetch transcription history with caching and pagination.
 */
export function useTranscriptionHistory(params?: TranscriptionHistoryParams) {
    const { getToken } = useAuth()

    return useQuery({
        queryKey: ['transcription-history', params],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error('No authentication token available')
            return transcriptionService.fetchHistory(token, params)
        },
        staleTime: 60 * 1000, // 1 minute
    })
}
