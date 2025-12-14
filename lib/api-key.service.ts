// API Configuration
const API_BASE_URL = 'http://0.0.0.0:8000'

export interface CreateApiKeyDto {
  name: string
  permission: string
  expiration_policy: string
  created_by: string
  permissions: Record<string, any>
}

export interface ApiKeyResponse {
  id: string
  name: string
  secret_key: string
  secret_key_hash: string
  status: string
  permissions: Record<string, any>
  created_by: string
  created_at: string
  last_used: string | null
  permission: string
  expires_at: string | null
  expiration_policy: string | null
}

export class ApiKeyService {
  private readonly baseUrl = API_BASE_URL
  private readonly endpoint = '/api-key/create'

  /**
   * Create a new API key
   */
  async createApiKey(data: CreateApiKeyDto, token: string): Promise<ApiKeyResponse> {
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

      const requestUrl = `${this.baseUrl}${this.endpoint}`
      const requestHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // JWT Bearer token for authentication
      }
      
      // Prepare request data with created_by and permissions fields
      const requestData = {
        ...data,
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
          url: `${this.baseUrl}${this.endpoint}`,
          requestData: data
        })
        throw new Error(`Failed to create API key: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const result: ApiKeyResponse = await response.json()
      console.log('API Key created successfully:', result)
      
      return result
    } catch (error) {
      console.error('Error creating API key:', error)
      throw error
    }
  }

  /**
   * Get all API keys for the current user
   */
  async getApiKeys(token: string): Promise<ApiKeyResponse[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api-keys`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // JWT Bearer token for authentication
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch API keys: ${response.status} ${response.statusText}`)
      }

      const result: ApiKeyResponse[] = await response.json()
      console.log('API keys fetched:', result)
      
      return result
    } catch (error) {
      console.error('Error fetching API keys:', error)
      throw error
    }
  }

  /**
   * Delete an API key
   */
  async deleteApiKey(id: string, token: string): Promise<void> {
    try {
      console.log('Deleting API key:', id)

      const response = await fetch(`${this.baseUrl}/api-key/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // JWT Bearer token for authentication
        },
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Key deletion failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        })
        throw new Error(`Failed to delete API key: ${response.status} ${response.statusText}`)
      }

      console.log('API Key deleted successfully:', id)
    } catch (error) {
      console.error('Error deleting API key:', error)
      throw error
    }
  }
}

// Export singleton instance
export const apiKeyService = new ApiKeyService()
