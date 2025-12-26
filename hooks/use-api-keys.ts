import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { apiKeyService, ApiKeyListItem } from '@/lib/api-key.service'

/**
 * Hook to manage API keys with caching and mutations.
 */
export function useApiKeys() {
    const { getToken } = useAuth()
    const queryClient = useQueryClient()

    // Fetch API Keys
    const query = useQuery({
        queryKey: ['api-keys'],
        queryFn: async () => {
            const token = await getToken()
            if (!token) throw new Error('No authentication token available')

            const response = await apiKeyService.listApiKeys(token)
            // Filter out revoked keys as they are not needed in primary view
            return response.keys.filter(key => key.status !== 'revoked')
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    })

    // Revoke API Key mutation
    const revokeMutation = useMutation({
        mutationFn: async (keyId: string) => {
            const token = await getToken()
            if (!token) throw new Error('No authentication token available')
            return apiKeyService.revokeApiKey(keyId, token)
        },
        onSuccess: () => {
            // Invalidate and refetch api-keys after revocation
            queryClient.invalidateQueries({ queryKey: ['api-keys'] })
        },
    })

    return {
        ...query,
        apiKeys: query.data ?? [],
        revokeKey: revokeMutation.mutateAsync,
        isRevoking: revokeMutation.isPending,
    }
}
