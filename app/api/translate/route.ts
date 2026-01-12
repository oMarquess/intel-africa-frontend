import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { NextRequest } from 'next/server'
import { SupportedLanguage, LANGUAGE_NAMES } from '@/lib/translation.types'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    try {
        // Check if API key is available
        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            console.error('GOOGLE_GENERATIVE_AI_API_KEY is not set')
            return new Response('Translation service not configured', { status: 500 })
        }

        const body = await req.json()
        const { messages, data } = body
        const target_language = data?.target_language

        // Extract the text from the last user message
        const text = messages?.[messages.length - 1]?.content

        if (!text || typeof text !== 'string') {
            return new Response('Missing or invalid text in messages', { status: 400 })
        }

        if (!target_language || !['twi', 'ga', 'ewe'].includes(target_language)) {
            return new Response('Invalid target_language. Must be one of: twi, ga, ewe', { status: 400 })
        }

        const languageName = LANGUAGE_NAMES[target_language as SupportedLanguage]

        const result = await streamText({
            model: google('gemini-3-pro-preview'),
            system: `You are a professional translator specializing in Ghanaian languages. 
Your task is to translate English text to ${languageName}.
Provide ONLY the translation without any explanations, notes, or additional text.
Maintain the original meaning, tone, and context as accurately as possible.`,
            prompt: `Translate the following text to ${languageName}:\n\n${text}`,
            temperature: 0.3, // Lower temperature for more consistent translations
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error('Translation error:', error)
        return new Response('Translation failed', { status: 500 })
    }
}
