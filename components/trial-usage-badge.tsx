"use client"

import { useTrialStatus } from "@/hooks/use-trial-status"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock } from "lucide-react"

export function TrialUsageBadge() {
    const { data: trialData, isLoading } = useTrialStatus()

    if (isLoading) {
        return <Skeleton className="h-16 w-full rounded-lg" />
    }

    if (!trialData || !trialData.is_trial_active) {
        return null // Don't show if trial is not active
    }

    const { remaining_hours, remaining_percentage } = trialData
    const usedPercentage = 100 - remaining_percentage

    return (
        <div className="p-3 rounded-lg border bg-card space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Trial</span>
                </div>
                <span className="text-xs font-bold text-primary">
                    {remaining_hours.toFixed(1)}h left
                </span>
            </div>
            <Progress
                value={usedPercentage}
                className="h-1.5"
                indicatorClassName={
                    remaining_percentage < 20
                        ? "bg-destructive"
                        : remaining_percentage < 50
                            ? "bg-yellow-500"
                            : "bg-primary"
                }
            />
        </div>
    )
}
