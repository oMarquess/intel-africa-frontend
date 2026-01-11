import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'https://intel-africa-backend-999275183993.us-central1.run.app'

/**
 * GET /api/py/api-key - List all API keys
 * Proxies the request to the backend server-side to avoid mixed content issues
 */
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json(
                { error: 'Authorization header is required' },
                { status: 401 }
            )
        }

        const response = await fetch(`${BACKEND_URL}/api-key`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
        })

        const data = await response.json()

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('Error fetching API keys:', error)
        return NextResponse.json(
            { error: 'Failed to fetch API keys' },
            { status: 500 }
        )
    }
}

/**
 * POST /api/py/api-key - Create a new API key
 * Proxies the request to the backend server-side
 */
export async function POST(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json(
                { error: 'Authorization header is required' },
                { status: 401 }
            )
        }

        const body = await request.json()

        const response = await fetch(`${BACKEND_URL}/api-key/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify(body),
        })

        const data = await response.json()

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('Error creating API key:', error)
        return NextResponse.json(
            { error: 'Failed to create API key' },
            { status: 500 }
        )
    }
}
