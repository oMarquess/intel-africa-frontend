import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DatePreset } from '@/hooks/use-date-range-filter'
import { X, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UsageFiltersProps {
    startDate: Date | null
    endDate: Date | null
    onStartDateChange: (date: Date | null) => void
    onEndDateChange: (date: Date | null) => void
    preset: DatePreset | 'custom'
    onPresetChange: (preset: DatePreset) => void
    onClear: () => void
}

/**
 * Filter controls for usage statistics, including date inputs and presets.
 */
export function UsageFilters({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    preset,
    onPresetChange,
    onClear
}: UsageFiltersProps) {
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
        const value = e.target.value
        if (!value) {
            type === 'start' ? onStartDateChange(null) : onEndDateChange(null)
            return
        }
        const date = new Date(value)
        type === 'start' ? onStartDateChange(date) : onEndDateChange(date)
    }

    const formatForInput = (date: Date | null) => {
        if (!date) return ''
        return date.toISOString().split('T')[0]
    }

    const presets: { label: string; value: DatePreset }[] = [
        { label: 'Last 7 Days', value: '7d' },
        { label: 'Last 30 Days', value: '30d' },
        { label: 'Last 90 Days', value: '90d' },
        { label: 'All Time', value: 'all' },
    ]

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-xl bg-card/50 backdrop-blur-sm shadow-sm md:flex-row md:items-end">
            <div className="flex-1 space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Quick Filters
                </Label>
                <div className="flex flex-wrap gap-2">
                    {presets.map((p) => (
                        <Button
                            key={p.value}
                            variant={preset === p.value ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => onPresetChange(p.value)}
                            className="h-8 text-xs px-3"
                        >
                            {p.label}
                        </Button>
                    ))}
                    {(startDate || endDate) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClear}
                            className="h-8 text-xs px-2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Clear
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="space-y-2 flex-1 sm:w-40">
                    <Label htmlFor="start-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Start Date
                    </Label>
                    <Input
                        id="start-date"
                        type="date"
                        value={formatForInput(startDate)}
                        onChange={(e) => handleDateChange(e, 'start')}
                        className="h-9 text-sm focus-visible:ring-1"
                    />
                </div>
                <div className="space-y-2 flex-1 sm:w-40">
                    <Label htmlFor="end-date" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        End Date
                    </Label>
                    <Input
                        id="end-date"
                        type="date"
                        value={formatForInput(endDate)}
                        onChange={(e) => handleDateChange(e, 'end')}
                        className="h-9 text-sm focus-visible:ring-1"
                    />
                </div>
            </div>
        </div>
    )
}
