import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'https://intel-africa-backend-999275183993.us-central1.run.app'

/**
 * DELETE /api/py/api-key/revoke/[keyId] - Revoke an API key
 * Proxies the request to the backend server-side to avoid mixed content issues
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { keyId: string } }
) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader) {
            return NextResponse.json(
                { error: 'Authorization header is required' },
                { status: 401 }
            )
        }

        const { keyId } = params

        const response = await fetch(`${BACKEND_URL}/api-key/revoke/${keyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
        })

        const data = await response.json()

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error('Error revoking API key:', error)
        return NextResponse.json(
            { error: 'Failed to revoke API key' },
            { status: 500 }
        )
    }
}
