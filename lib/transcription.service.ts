import { TranscriptionHistoryResponse, TranscriptionHistoryParams } from './transcription.types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class TranscriptionService {
    private readonly baseUrl = `${API_BASE_URL}/v1/stt`

    /**
     * Fetch transcription history for the authenticated user
     */
    async fetchHistory(
        token: string,
        params?: TranscriptionHistoryParams
    ): Promise<TranscriptionHistoryResponse> {
        try {
            const queryParams = new URLSearchParams()
            if (params?.page) queryParams.append('page', params.page.toString())
            if (params?.page_size) queryParams.append('page_size', params.page_size.toString())

            const queryString = queryParams.toString()
            const url = `${this.baseUrl}/history${queryString ? `?${queryString}` : ''}`

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(`Failed to fetch history: ${response.status} - ${errorText}`)
            }

            return await response.json()
        } catch (error) {
            console.error('Error fetching transcription history:', error)
            throw error
        }
    }

    /**
     * Helper to get status color classes
     */
    getStatusVariant(status: string): 'default' | 'secondary' | 'outline' | 'destructive' {
        switch (status) {
            case 'completed': return 'default'
            case 'processing': return 'secondary'
            case 'failed': return 'destructive'
            default: return 'outline'
        }
    }
}

export const transcriptionService = new TranscriptionService()
