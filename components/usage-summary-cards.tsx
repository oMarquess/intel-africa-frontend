import { LayoutGrid, Music, Calendar } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { UsageSummary } from '@/lib/usage.types'
import { usageService } from '@/lib/usage.service'

interface UsageSummaryCardsProps {
    summary?: UsageSummary
    isLoading: boolean
}

/**
 * Grid of summary cards for usage statistics.
 */
export function UsageSummaryCards({ summary, isLoading }: UsageSummaryCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <StatCard
                title="Total Requests"
                value={summary ? usageService.formatNumber(summary.total_requests) : '0'}
                subtitle="Total API calls made in this period"
                icon={<LayoutGrid className="h-4 w-4" />}
                isLoading={isLoading}
            />
            <StatCard
                title="Audio Processed"
                value={summary ? usageService.formatAudioDuration(summary.total_audio_seconds) : '0s'}
                subtitle="Total duration of audio files processed"
                icon={<Music className="h-4 w-4" />}
                isLoading={isLoading}
            />
            <StatCard
                title="Active Period"
                value={summary ? `${usageService.formatDate(summary.period_end)}` : 'N/A'}
                subtitle={summary ? `From ${usageService.formatDate(summary.period_start)}` : 'Filter applied'}
                icon={<Calendar className="h-4 w-4" />}
                isLoading={isLoading}
            />
        </div>
    )
}
