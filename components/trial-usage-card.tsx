"use client"

import { useTrialStatus } from "@/hooks/use-trial-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, Zap, AlertCircle } from "lucide-react"
import Link from "next/link"

export function TrialUsageCard() {
    const { data: trialData, isLoading, error } = useTrialStatus()

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
        )
    }

    if (error || !trialData) {
        return (
            <Card className="border-destructive/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <CardTitle className="text-destructive">Unable to Load Trial Status</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                        className="w-full"
                    >
                        Retry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    const {
        remaining_hours,
        used_hours,
        total_hours,
        remaining_percentage,
        is_trial_active,
        audio_seconds_remaining,
    } = trialData

    const usedPercentage = 100 - remaining_percentage
    const remainingMinutes = Math.floor(remaining_hours * 60)
    const remainingSeconds = Math.floor(audio_seconds_remaining)

    return (
        <Card className={!is_trial_active ? "border-destructive/50" : ""}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Zap className="h-5 w-5 text-primary" />
                            Free Trial Usage
                        </CardTitle>
                        <CardDescription>
                            {is_trial_active
                                ? "Monitor your free trial consumption"
                                : "Your trial has been exhausted"}
                        </CardDescription>
                    </div>
                    <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${is_trial_active
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                    >
                        {is_trial_active ? "🟢 Active" : "🔴 Exhausted"}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Usage Progress</span>
                        <span className="font-medium">{usedPercentage.toFixed(1)}% used</span>
                    </div>
                    <Progress
                        value={usedPercentage}
                        className="h-2"
                        indicatorClassName={
                            remaining_percentage < 20
                                ? "bg-destructive"
                                : remaining_percentage < 50
                                    ? "bg-yellow-500"
                                    : "bg-primary"
                        }
                    />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{used_hours.toFixed(2)}h used</span>
                        <span>{total_hours.toFixed(2)}h total</span>
                    </div>
                </div>

                {/* Time Remaining Display */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1 text-center p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs font-medium uppercase tracking-wider">Hours</span>
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                            {remaining_hours.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">remaining</div>
                    </div>

                    <div className="space-y-1 text-center p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span className="text-xs font-medium uppercase tracking-wider">Minutes</span>
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                            {remainingMinutes}
                        </div>
                        <div className="text-xs text-muted-foreground">remaining</div>
                    </div>
                </div>

                {/* Warning or CTA */}
                {!is_trial_active ? (
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive font-medium">
                                ⚠️ Your free trial has been exhausted
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                Create an API key to continue using the service
                            </p>
                        </div>
                        <Link href="/dashboard/api-keys" className="block">
                            <Button className="w-full" size="lg">
                                Create API Key
                            </Button>
                        </Link>
                    </div>
                ) : remaining_percentage < 20 ? (
                    <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                            ⚡ Running low on trial hours
                        </p>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                            Consider creating an API key for uninterrupted service
                        </p>
                    </div>
                ) : null}

                {/* Additional Info */}
                <div className="pt-3 border-t text-xs text-muted-foreground">
                    <p>
                        💡 <strong>Tip:</strong> Trial usage is calculated based on audio duration processed.
                        {remainingSeconds > 0 && ` You have ~${remainingSeconds}s of audio remaining.`}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
