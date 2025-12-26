// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Types based on backend schemas
export interface CreateApiKeyDto {
  name: string
  permission: "full_access" | "read_only" | "transcribe_only"
  expiration_policy: "never" | "30_days" | "90_days" | "1_year"
  created_by?: string
  permissions?: Record<string, any>
}

export interface ApiKeyCreateResponse {
  id: string
  name: string
  secret_key: string
  status: string
  permission: string
  expires_at: string | null
  expiration_policy: string
  message: string
}

export interface ApiKeyListItem {
  id: string
  name: string
  status: string
  permission: string
  created_at: string | null
  last_used: string | null
  expires_at: string | null
  expiration_policy: string
}

export interface ApiKeyListResponse {
  keys: ApiKeyListItem[]
  count: number
}

export interface ApiKeyRevokeResponse {
  id: string
  status: string
  message: string
}

export class ApiKeyService {
  private readonly baseUrl = API_BASE_URL

  /**
   * Create a new API key
   */
  async createApiKey(data: CreateApiKeyDto, token: string): Promise<ApiKeyCreateResponse> {
    try {
      console.log('Creating API key with data:', data)

      // Extract user ID from JWT token
      let userId = ''
      try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]))
        userId = tokenPayload.sub || tokenPayload.user_id || ''
        console.log('Extracted user ID from token:', userId)
      } catch (error) {
        console.warn('Could not extract user ID from token:', error)
      }

      const requestUrl = `${this.baseUrl}/api-key/create`
      const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
      
      // Prepare request data with created_by and permissions fields
      const requestData = {
        name: data.name,
        permission: data.permission,
        expiration_policy: data.expiration_policy,
        created_by: userId,
        permissions: data.permissions || {}
      }
      
      const requestBody = JSON.stringify(requestData)

      // Log the full request details
      console.log('=== API REQUEST DEBUG ===')
      console.log('URL:', requestUrl)
      console.log('Method:', 'POST')
      console.log('Headers:', { ...requestHeaders, 'Authorization': `Bearer ${token.substring(0, 20)}...` })
      console.log('Body:', requestBody)
      console.log('========================')

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: requestHeaders,
        body: requestBody,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Key creation failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          url: requestUrl,
          requestData: data
        })
        throw new Error(`Failed to create API key: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const result: ApiKeyCreateResponse = await response.json()
      console.log('API Key created successfully:', result)
      
      return result
    } catch (error) {
      console.error('Error creating API key:', error)
      throw error
    }
  }

  /**
   * List all API keys for the authenticated user
   */
  async listApiKeys(token: string): Promise<ApiKeyListResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api-key/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Keys list failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        })
        throw new Error(`Failed to fetch API keys: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const result: ApiKeyListResponse = await response.json()
      console.log('API keys fetched:', result)
      
      return result
    } catch (error) {
      console.error('Error fetching API keys:', error)
      throw error
    }
  }

  /**
   * Revoke an API key (admin only)
   */
  async revokeApiKey(keyId: string, token: string): Promise<ApiKeyRevokeResponse> {
    try {
      console.log('Revoking API key:', keyId)

      const response = await fetch(`${this.baseUrl}/api-key/revoke/${keyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Key revocation failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText,
          keyId
        })
        throw new Error(`Failed to revoke API key: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const result: ApiKeyRevokeResponse = await response.json()
      console.log('API Key revoked successfully:', result)
      
      return result
    } catch (error) {
      console.error('Error revoking API key:', error)
      throw error
    }
  }

  /**
   * Helper method to format permission display
   */
  formatPermission(permission: string): string {
    const permissionMap: Record<string, string> = {
      'full_access': 'Full Access',
      'read_only': 'Read Only',
      'transcribe_only': 'Transcribe Only',
    }
    return permissionMap[permission] || permission
  }

  /**
   * Helper method to format expiration policy display
   */
  formatExpirationPolicy(policy: string): string {
    const policyMap: Record<string, string> = {
      'never': 'Never',
      '30_days': '30 days',
      '90_days': '90 days',
      '1_year': '1 year',
    }
    return policyMap[policy] || policy
  }

  /**
   * Helper method to format dates
   */
  formatDate(dateString: string | null): string {
    if (!dateString) return 'Never'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    } catch {
      return 'Invalid date'
    }
  }

  /**
   * Helper method to format relative time
   */
  formatRelativeTime(dateString: string | null): string {
    if (!dateString) return 'Never'
    
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

      if (diffHours < 1) return 'Just now'
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
      
      return this.formatDate(dateString)
    } catch {
      return 'Unknown'
    }
  }

  /**
   * Helper method to get status badge variant
   */
  getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default'
      case 'revoked':
        return 'destructive'
      case 'expired':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  /**
   * Helper method to get status color classes
   */
  getStatusColorClasses(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'revoked':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'expired':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }
}

// Export singleton instance
export const apiKeyService = new ApiKeyService()
