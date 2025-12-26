"use client"

import { useState } from "react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import { MonthlyUsage } from "@/lib/usage.types"
import { usageService } from "@/lib/usage.service"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

interface UsageChartProps {
    data?: MonthlyUsage[]
    isLoading: boolean
}

/**
 * Visual breakdown of usage stats by month.
 * Allows toggling between request count and audio seconds.
 */
export function UsageChart({ data, isLoading }: UsageChartProps) {
    const [metric, setMetric] = useState<"requests" | "audio">("requests")

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                </CardContent>
            </Card>
        )
    }

    const chartData = data?.map(item => ({
        name: `${usageService.getMonthName(item.month)} ${item.year}`,
        requests: item.request_count,
        audio: item.audio_seconds,
    })).reverse() || []

    return (
        <Card className="col-span-full">
            <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-center sm:justify-between pb-6">
                <div>
                    <CardTitle className="text-lg font-bold">Usage Breakdown</CardTitle>
                    <CardDescription>
                        Historical usage metrics by month
                    </CardDescription>
                </div>
                <Tabs value={metric} onValueChange={(v) => setMetric(v as any)} className="w-auto">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="requests" className="text-xs">Requests</TabsTrigger>
                        <TabsTrigger value="audio" className="text-xs">Audio Sec</TabsTrigger>
                    </TabsList>
                </Tabs>
            </CardHeader>
            <CardContent>
                {chartData.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
                        No data available for the selected period
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    tickFormatter={(val) => metric === 'audio' ? `${val}s` : val.toString()}
                                />
                                <Tooltip
                                    cursor={{ fill: 'hsl(var(--muted)/0.1)', radius: 4 }}
                                    content={({ active, payload, label }) => {
                                        if (active && payload && payload.length) {
                                            const val = payload[0].value as number
                                            return (
                                                <div className="rounded-lg border bg-background p-3 shadow-xl ring-1 ring-border">
                                                    <p className="text-xs font-bold mb-1 uppercase tracking-wider text-muted-foreground">{label}</p>
                                                    <p className="text-sm font-bold flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-primary" />
                                                        {metric === 'requests' ? 'Requests: ' : 'Duration: '}
                                                        <span className="text-foreground">
                                                            {metric === 'requests'
                                                                ? usageService.formatNumber(val)
                                                                : usageService.formatAudioDuration(val)}
                                                        </span>
                                                    </p>
                                                </div>
                                            )
                                        }
                                        return null
                                    }}
                                />
                                <Bar
                                    dataKey={metric}
                                    fill="hsl(var(--primary))"
                                    radius={[4, 4, 0, 0]}
                                    animationDuration={1000}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
