import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TranscriptionHistoryItem } from "@/lib/transcription.types"
import { transcriptionService } from "@/lib/transcription.service"
import { usageService } from "@/lib/usage.service"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity } from "lucide-react"
import { format } from "date-fns"

interface TranscriptionLogsTableProps {
    data?: TranscriptionHistoryItem[]
    isLoading: boolean
}

/**
 * Granular logs of individual transcription requests.
 */
export function TranscriptionLogsTable({ data, isLoading }: TranscriptionLogsTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Transcription Logs
                    </CardTitle>
                    <CardDescription>
                        Recent transcription requests and their status
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="px-6">Date</TableHead>
                                <TableHead>File Name</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="px-6"><div className="h-4 w-32 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell><div className="h-4 w-48 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell><div className="h-4 w-20 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell><div className="h-4 w-12 bg-muted animate-pulse rounded" /></TableCell>
                                        <TableCell><div className="h-5 w-24 bg-muted animate-pulse rounded-full" /></TableCell>
                                    </TableRow>
                                ))
                            ) : !data || data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground px-6">
                                        No logs found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="px-6 whitespace-nowrap">
                                            {format(new Date(log.created_at), 'MMM d, h:mm a')}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate" title={log.original_filename}>
                                            {log.original_filename}
                                        </TableCell>
                                        <TableCell>
                                            {log.audio_duration_seconds
                                                ? usageService.formatAudioDuration(log.audio_duration_seconds)
                                                : '-'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="uppercase text-[10px] font-bold">
                                                {log.detected_language || 'N/A'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={transcriptionService.getStatusVariant(log.status)}
                                                className="capitalize"
                                            >
                                                {log.status}
                                            </Badge>
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
