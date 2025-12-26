"use client"

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { TranscriptionLogsTable } from "@/components/transcription-logs-table"
import { useTranscriptionHistory } from "@/hooks/use-transcription-history"
import { format } from "date-fns"

export default function LogsPage() {
    const {
        data,
        isLoading,
        isRefetching,
        refetch,
        dataUpdatedAt,
        error
    } = useTranscriptionHistory({ page: 1, page_size: 50 })

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
                                <h1 className="text-3xl font-bold tracking-tight">Transcription Logs</h1>
                                <p className="text-muted-foreground mt-1">
                                    Detailed history of all transcription requests and their processing status.
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
                                    <div className="ml-3">
                                        <h3 className="text-sm font-bold text-red-800 dark:text-red-200">Error</h3>
                                        <p className="text-sm text-red-700 dark:text-red-300">
                                            Failed to load transcription history. Please try again later.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Main Content */}
                        <div className="w-full">
                            <TranscriptionLogsTable
                                data={data?.transcriptions}
                                isLoading={isLoading}
                            />
                        </div>

                        {/* Footer / Info */}
                        <div className="mt-8 text-center border-t pt-8 pb-12">
                            <p className="text-sm text-muted-foreground">
                                Detailed logs are retained for 30 days. For older records, please check your monthly usage summary.
                            </p>
                        </div>

                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
