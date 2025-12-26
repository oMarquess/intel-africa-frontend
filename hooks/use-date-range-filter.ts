import { useState, useCallback } from 'react'
import { subDays, startOfDay, endOfDay, format } from 'date-fns'

export type DatePreset = '7d' | '30d' | '90d' | 'all'

export interface UseDateRangeFilterReturn {
    startDate: Date | null
    endDate: Date | null
    setStartDate: (date: Date | null) => void
    setEndDate: (date: Date | null) => void
    preset: DatePreset | 'custom'
    setPreset: (preset: DatePreset) => void
    clearFilters: () => void
    formattedStartDate: string | null
    formattedEndDate: string | null
}

/**
 * Hook to manage date range filter state with presets.
 * 
 * @returns Object with date states, setters, and formatted strings
 */
export function useDateRangeFilter(): UseDateRangeFilterReturn {
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [preset, setPresetState] = useState<DatePreset | 'custom'>('all')

    const setPreset = useCallback((newPreset: DatePreset) => {
        setPresetState(newPreset)
        const now = new Date()

        switch (newPreset) {
            case '7d':
                setStartDate(startOfDay(subDays(now, 7)))
                setEndDate(endOfDay(now))
                break
            case '30d':
                setStartDate(startOfDay(subDays(now, 30)))
                setEndDate(endOfDay(now))
                break
            case '90d':
                setStartDate(startOfDay(subDays(now, 90)))
                setEndDate(endOfDay(now))
                break
            case 'all':
                setStartDate(null)
                setEndDate(null)
                break
        }
    }, [])

    const handleSetStartDate = useCallback((date: Date | null) => {
        setStartDate(date)
        setPresetState('custom')
    }, [])

    const handleSetEndDate = useCallback((date: Date | null) => {
        setEndDate(date)
        setPresetState('custom')
    }, [])

    const clearFilters = useCallback(() => {
        setStartDate(null)
        setEndDate(null)
        setPresetState('all')
    }, [])

    const formattedStartDate = startDate ? format(startDate, 'yyyy-MM-dd') : null
    const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : null

    return {
        startDate,
        endDate,
        setStartDate: handleSetStartDate,
        setEndDate: handleSetEndDate,
        preset,
        setPreset,
        clearFilters,
        formattedStartDate,
        formattedEndDate
    }
}
