import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface StatCardProps {
    title: string
    value: string | number
    subtitle?: string
    icon?: ReactNode
    isLoading?: boolean
    className?: string
    trend?: {
        value: number
        direction: 'up' | 'down'
    }
}

/**
 * A reusable card for displaying a single metric with an optional icon and trend.
 */
export function StatCard({
    title,
    value,
    subtitle,
    icon,
    isLoading,
    className,
    trend,
}: StatCardProps) {
    if (isLoading) {
        return (
            <Card className={cn("overflow-hidden", className)}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-32 mb-1" />
                    <Skeleton className="h-3 w-40" />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="text-muted-foreground">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {(subtitle || trend) && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        {trend && (
                            <span className={cn(
                                "font-medium",
                                trend.direction === 'up' ? "text-emerald-600" : "text-amber-600"
                            )}>
                                {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
                            </span>
                        )}
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    )
}
