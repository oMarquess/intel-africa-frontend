"use client"

import { useState, useCallback, useRef } from 'react'
import { SupportedLanguage } from '@/lib/translation.types'

export function useTranslation() {
    const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>('twi')
    const [sourceText, setSourceText] = useState<string>('')
    const [translatedText, setTranslatedText] = useState<string>('')
    const [isTranslating, setIsTranslating] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)

    const translateText = useCallback(
        async (text: string, language: SupportedLanguage) => {
            setSourceText(text)
            setTargetLanguage(language)
            setTranslatedText('')
            setIsTranslating(true)
            setError(null)

            // Create new AbortController for this request
            abortControllerRef.current = new AbortController()

            try {
                const response = await fetch('/api/translate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: [
                            {
                                role: 'user',
                                content: text,
                            },
                        ],
                        data: {
                            target_language: language,
                        },
                    }),
                    signal: abortControllerRef.current.signal,
                })

                if (!response.ok) {
                    const errorText = await response.text()
                    throw new Error(errorText || `Translation failed: ${response.statusText}`)
                }

                // Handle streaming response
                const reader = response.body?.getReader()
                const decoder = new TextDecoder()
                let accumulatedText = ''

                if (!reader) {
                    throw new Error('Failed to get response reader')
                }

                console.log('Starting to read translation stream...')

                while (true) {
                    const { done, value } = await reader.read()

                    if (done) {
                        console.log('Stream complete. Final text:', accumulatedText)
                        break
                    }

                    const chunk = decoder.decode(value, { stream: true })
                    console.log('Received chunk:', chunk)

                    // toTextStreamResponse returns plain text chunks, not JSON
                    accumulatedText += chunk
                    setTranslatedText(accumulatedText)
                }
            } catch (err) {
                // Don't show error if the request was aborted
                if (err instanceof Error && err.name === 'AbortError') {
                    console.log('Translation aborted')
                } else {
                    setError(err instanceof Error ? err : new Error('Translation failed'))
                    console.error('Translation error:', err)
                }
            } finally {
                setIsTranslating(false)
                abortControllerRef.current = null
            }
        },
        []
    )

    const stop = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
            abortControllerRef.current = null
        }
        setIsTranslating(false)
    }, [])

    const reset = useCallback(() => {
        setTranslatedText('')
        setSourceText('')
        setError(null)
    }, [])

    return {
        translateText,
        translatedText,
        isTranslating,
        error,
        stop,
        reset,
        targetLanguage,
        sourceText,
    }
}
