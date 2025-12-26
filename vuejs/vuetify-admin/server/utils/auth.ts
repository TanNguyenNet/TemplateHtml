import type { H3Event } from 'h3'

export function getAuthToken(event: H3Event): string | null {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader?.startsWith('Bearer ')) {
        return null
    }
    return authHeader.slice(7)
}

export function requireAuth(event: H3Event): void {
    const token = getAuthToken(event)
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
}
