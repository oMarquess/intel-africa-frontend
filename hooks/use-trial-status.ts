import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"

interface TrialStatus {
  trial_available: boolean
  has_api_keys: boolean
  audio_seconds_used: number
  audio_seconds_remaining: number
  max_audio_seconds: number
  percentage_used: number
}

export function useTrialStatus() {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["trial-status"],
    queryFn: async () => {
      const token = await getToken()
      
      if (!token) {
        throw new Error("Not authenticated")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/trial/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch trial status")
      }

      return response.json() as Promise<TrialStatus>
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}
