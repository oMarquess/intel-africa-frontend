import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@clerk/nextjs"

interface TrialStatus {
  user_id: string
  total_hours: number
  used_hours: number
  remaining_hours: number
  remaining_percentage: number
  is_trial_active: boolean
  trial_expires_at: string | null
  last_transcription_at: string | null
  audio_seconds_used: number
  audio_seconds_remaining: number
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

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/usage/trial/remaining`, {
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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  })
}

