import { UsageStatsResponse, UsageStatsParams } from './usage.types'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export class UsageService {
    private readonly baseUrl = API_BASE_URL

    /**
     * Fetch usage statistics for the authenticated user
     */
    async fetchUsageStats(
        token: string,
        params?: UsageStatsParams
    ): Promise<UsageStatsResponse> {
        try {
            // Build query string
            const queryParams = new URLSearchParams()
            if (params?.start_date) {
                queryParams.append('start_date', params.start_date)
            }
            if (params?.end_date) {
                queryParams.append('end_date', params.end_date)
            }

            const queryString = queryParams.toString()
            const url = `${this.baseUrl}/usage${queryString ? `?${queryString}` : ''}`

            console.log('Fetching usage stats:', { url, params })

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                const errorText = await response.text()
                console.error('Usage stats fetch failed:', {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorText,
                })
                throw new Error(
                    `Failed to fetch usage stats: ${response.status} ${response.statusText} - ${errorText}`
                )
            }

            const result: UsageStatsResponse = await response.json()
            console.log('Usage stats fetched successfully:', result)

            return result
        } catch (error) {
            console.error('Error fetching usage stats:', error)
            throw error
        }
    }

    /**
     * Format audio seconds to human-readable format
     */
    formatAudioDuration(seconds: number): string {
        if (seconds === 0) return '0 seconds'

        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60

        const parts: string[] = []
        if (hours > 0) parts.push(`${hours}h`)
        if (minutes > 0) parts.push(`${minutes}m`)
        if (remainingSeconds > 0 || parts.length === 0) {
            parts.push(`${remainingSeconds}s`)
        }

        return parts.join(' ')
    }

    /**
     * Format large numbers with commas
     */
    formatNumber(num: number): string {
        return num.toLocaleString('en-US')
    }

    /**
     * Format date to readable string
     */
    formatDate(dateString: string): string {
        try {
            const date = new Date(dateString)
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        } catch {
            return dateString
        }
    }

    /**
     * Get month name from month number
     */
    getMonthName(month: number): string {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]
        return months[month - 1] || 'Unknown'
    }

    /**
     * Export monthly data to CSV
     */
    exportToCSV(data: { year: number; month: number; request_count: number; audio_seconds: number }[]): void {
        const headers = ['Year', 'Month', 'Requests', 'Audio Seconds']
        const rows = data.map(row => [
            row.year,
            this.getMonthName(row.month),
            row.request_count,
            row.audio_seconds,
        ])

        const csv = [
            headers.join(','),
            ...rows.map(row => row.join(',')),
        ].join('\n')

        // Create download
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `usage-report-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    }
}

// Export singleton instance
export const usageService = new UsageService()
