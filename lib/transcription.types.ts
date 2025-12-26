/**
 * Types for Transcription History (Detailed Logs)
 */

export interface TranscriptionHistoryItem {
    id: string
    original_filename: string
    status: 'processing' | 'completed' | 'failed'
    transcription_text: string | null
    audio_duration_seconds: number | null
    detected_language: string | null
    error_message: string | null
    created_at: string
    completed_at: string | null
}

export interface TranscriptionHistoryResponse {
    transcriptions: TranscriptionHistoryItem[]
    total: number
    page: number
    page_size: number
}

export interface TranscriptionHistoryParams {
    page?: number
    page_size?: number
}
