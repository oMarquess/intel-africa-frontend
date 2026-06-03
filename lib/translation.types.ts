// Translation types for Twi, Ga, and Ewe language support

export type SupportedLanguage = 'twi' | 'ga' | 'ewe' | 'en'

export interface TranslationRequest {
    text: string
    target_language: SupportedLanguage
    source_language?: string // defaults to 'en'
}

export interface TranslationResponse {
    translated_text: string
    source_language: string
    target_language: SupportedLanguage
}

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
    twi: 'Twi',
    ga: 'Ga',
    ewe: 'Ewe',
    en: 'English',
}

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
    twi: 'Twi (Akan)',
    ga: 'Ga',
    ewe: 'Ewe',
    en: 'English',
}
