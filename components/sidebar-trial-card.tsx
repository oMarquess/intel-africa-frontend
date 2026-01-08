"use client"

import { useState, useEffect } from "react"
import { useTrialStatus } from "@/hooks/use-trial-status"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Zap, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SidebarTrialCard() {
    const [mounted, setMounted] = useState(false)
    const { data: trialData, isLoading, error } = useTrialStatus()

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null
    }

    if (isLoading) {
        return (
            <Card className="mx-2 mb-2">
                <CardContent className="p-3 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-8 w-full" />
                </CardContent>
            </Card>
        )
    }

    if (error || !trialData) {
        return null // Silently fail in sidebar to avoid clutter
    }

    const {
        remaining_hours,
        used_hours,
        total_hours,
        remaining_percentage,
        is_trial_active,
    } = trialData

    const usedPercentage = 100 - remaining_percentage

    return (
        <Card className={`mx-2 mb-2 p-1 ${!is_trial_active ? "border-destructive/50 bg-destructive/5" : "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"}`}>
            <CardContent className="px-3 py-2 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Zap className={`h-4 w-4 ${is_trial_active ? "text-primary" : "text-destructive"}`} />
                        <span className="text-sm font-semibold">Free Trial</span>
                    </div>
                    <div
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${is_trial_active
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                    >
                        {is_trial_active ? "Active" : "Exhausted"}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Usage</span>
                        <span className="font-medium">{usedPercentage.toFixed(0)}%</span>
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

                {/* Time Remaining */}
                <div className="flex items-center justify-between p-2 rounded-md bg-background/50">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">Remaining</span>
                    </div>
                    <div className="text-sm font-bold">
                        {remaining_hours.toFixed(2)}h
                    </div>
                </div>

                {/* CTA if exhausted */}
                {!is_trial_active && (
                    <Link href="/dashboard/api-keys" className="block">
                        <Button size="sm" className="w-full h-8 text-xs">
                            Create API Key
                        </Button>
                    </Link>
                )}

                {/* Warning if low */}
                {is_trial_active && remaining_percentage < 20 && (
                    <div className="flex items-start gap-1.5 p-2 rounded-md bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                        <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                        <p className="text-[10px] text-yellow-800 dark:text-yellow-200 leading-tight">
                            Running low! Consider creating an API key.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
