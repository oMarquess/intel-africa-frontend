// Type definitions for Usage API
// Based on backend schema from FastAPI endpoint

export interface UsageSummary {
    total_requests: number
    total_audio_seconds: number
    period_start: string // date in YYYY-MM-DD format
    period_end: string   // date in YYYY-MM-DD format
}

export interface MonthlyUsage {
    year: number
    month: number
    request_count: number
    audio_seconds: number
}

export interface UsageStatsResponse {
    summary: UsageSummary
    monthly_breakdown: MonthlyUsage[]
}

export interface UsageStatsParams {
    start_date?: string | null  // YYYY-MM-DD format
    end_date?: string | null    // YYYY-MM-DD format
}
