import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MonthlyUsage } from "@/lib/usage.types"
import { usageService } from "@/lib/usage.service"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface MonthlyBreakdownTableProps {
    data?: MonthlyUsage[]
    isLoading: boolean
}

/**
 * Detailed tabular view of monthly usage.
 */
export function MonthlyBreakdownTable({ data, isLoading }: MonthlyBreakdownTableProps) {
    const handleExport = () => {
        if (data) usageService.exportToCSV(data)
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Monthly Details
                    </CardTitle>
                    <CardDescription>
                        Detailed breakdown of requests and audio duration
                    </CardDescription>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    disabled={!data || data.length === 0 || isLoading}
                    className="h-8 text-xs gap-1.5"
                >
                    <Download className="h-3.5 w-3.5" />
                    Export CSV
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[150px] px-6">Month</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead className="text-right">Requests</TableHead>
                                <TableHead className="text-right px-6">Audio Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="px-6"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell><div className="h-4 w-12 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell className="text-right"><div className="h-4 w-16 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                                        <TableCell className="text-right px-6"><div className="h-4 w-24 bg-muted animate-pulse rounded ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : !data || data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground px-6">
                                        No records found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row, i) => (
                                    <TableRow key={`${row.year}-${row.month}`} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="font-medium px-6">
                                            {usageService.getMonthName(row.month)}
                                        </TableCell>
                                        <TableCell>{row.year}</TableCell>
                                        <TableCell className="text-right font-mono">
                                            {usageService.formatNumber(row.request_count)}
                                        </TableCell>
                                        <TableCell className="text-right font-mono px-6">
                                            {usageService.formatAudioDuration(row.audio_seconds)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
