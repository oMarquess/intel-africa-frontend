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

        if (!target_language || !['twi', 'ga', 'ewe', 'en'].includes(target_language)) {
            return new Response('Invalid target_language. Must be one of: twi, ga, ewe, en', { status: 400 })
        }

        const languageName = LANGUAGE_NAMES[target_language as SupportedLanguage]

        // Determine translation direction and create appropriate prompts
        let systemPrompt: string
        let userPrompt: string

        if (target_language === 'en') {
            // Translating FROM Ghanaian languages TO English
            systemPrompt = `You are a professional translator specializing in Ghanaian languages. 
Your task is to translate text from Ghanaian languages (Twi, Ga, or Ewe) to English.
First, automatically detect which Ghanaian language the text is in.
Then provide ONLY the English translation without any explanations, notes, or additional text.
Maintain the original meaning, tone, and context as accurately as possible.`
            userPrompt = `Translate the following Ghanaian language text to English:\n\n${text}`
        } else {
            // Translating FROM English TO Ghanaian languages (existing behavior)
            systemPrompt = `You are a professional translator specializing in Ghanaian languages. 
Your task is to translate English text to ${languageName}.
Provide ONLY the translation without any explanations, notes, or additional text.
Maintain the original meaning, tone, and context as accurately as possible.`
            userPrompt = `Translate the following text to ${languageName}:\n\n${text}`
        }

        const result = await streamText({
            model: google('gemini-3-flash-preview'),
            system: systemPrompt,
            prompt: userPrompt,
            temperature: 0.3, // Lower temperature for more consistent translations
        })

        return result.toTextStreamResponse()
    } catch (error) {
        console.error('Translation error:', error)
        return new Response('Translation failed', { status: 500 })
    }
}
