"use client"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { RotateCcw, Info } from "lucide-react"
import { UsageSummaryCards } from "@/components/usage-summary-cards"
import { UsageFilters } from "@/components/usage-filters"
import { UsageChart } from "@/components/usage-chart"
import { MonthlyBreakdownTable } from "@/components/monthly-breakdown-table"
import { useDateRangeFilter } from "@/hooks/use-date-range-filter"
import { useUsageStats } from "@/hooks/use-usage-stats"
import { format } from "date-fns"

export default function UsagePage() {
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        preset,
        setPreset,
        clearFilters,
        formattedStartDate,
        formattedEndDate
    } = useDateRangeFilter()

    const {
        data,
        isLoading,
        isRefetching,
        refetch,
        dataUpdatedAt,
        error
    } = useUsageStats({
        startDate: formattedStartDate,
        endDate: formattedEndDate
    })

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col overflow-x-hidden">
                    <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">

                        {/* Page Header */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Usage & Reporting</h1>
                                <p className="text-muted-foreground mt-1">
                                    Monitor your API consumption and resource usage across all projects.
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                {dataUpdatedAt > 0 && (
                                    <span className="text-xs text-muted-foreground hidden sm:inline-flex items-center gap-1.5">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        Last updated: {format(dataUpdatedAt, "HH:mm:ss")}
                                    </span>
                                )}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => refetch()}
                                    disabled={isLoading || isRefetching}
                                    className="h-9 gap-2 shadow-sm"
                                >
                                    <RotateCcw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
                                    Refresh
                                </Button>
                            </div>
                        </div>

                        {/* Error State */}
                        {error && (
                            <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg dark:bg-red-900/20 dark:border-red-600">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-bold text-red-800 dark:text-red-200">Error</h3>
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            Failed to load usage statistics. Please try again later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Notice */}
                        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg dark:bg-blue-900/20 dark:border-blue-600">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        <strong>Dashboard Liveness:</strong> This page automatically refreshes every 30 seconds when active.
                                        Updates pause when you switch tabs to optimize performance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <UsageFilters
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                            preset={preset}
                            onPresetChange={setPreset}
                            onClear={clearFilters}
                        />

                        {/* Summary Cards */}
                        <UsageSummaryCards
                            summary={data?.summary}
                            isLoading={isLoading}
                        />

                        {/* Main Content Grid */}
                        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                            <div className="lg:col-span-2">
                                <UsageChart
                                    data={data?.monthly_breakdown}
                                    isLoading={isLoading}
                                />
                            </div>
                            <div className="lg:col-span-2">
                                <MonthlyBreakdownTable
                                    data={data?.monthly_breakdown}
                                    isLoading={isLoading}
                                />
                            </div>
                        </div>

                        {/* Footer / Contact */}
                        <div className="mt-8 text-center border-t pt-8 pb-12">
                            <p className="text-sm text-muted-foreground">
                                Looking for detailed request history? Check the <a href="/dashboard/logs" className="text-primary hover:underline font-medium">Logs page</a>.
                            </p>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

function AlertCircle(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    )
}
