"use client"

import { useCallback, useEffect } from "react"
import { DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AudioPlayerProvider,
  AudioPlayerButton,
  AudioPlayerProgress,
  AudioPlayerTime,
  AudioPlayerDuration,
  AudioPlayerSpeed,
  useAudioPlayer,
} from "@/components/ui/audio-player"

interface TTSAudioPlayerProps {
  src: string
  durationSeconds?: number
  processingTime?: number
  filename?: string
}

function TTSPlayerInner({
  src,
  durationSeconds,
  processingTime,
  filename = "speech.wav",
}: TTSAudioPlayerProps) {
  const player = useAudioPlayer()

  useEffect(() => {
    player.setActiveItem({ id: src, src })
  }, [src]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDownload = useCallback(() => {
    const a = document.createElement("a")
    a.href = src
    a.download = filename
    a.click()
  }, [src, filename])

  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      {/* Progress bar */}
      <AudioPlayerProgress
        className="w-full [&_.bg-primary]:bg-gradient-to-r [&_.bg-primary]:from-[#5227FF] [&_.bg-primary]:to-[#FF9FFC]"
      />

      {/* Controls row */}
      <div className="flex items-center gap-1.5">
        {/* Play/Pause */}
        <AudioPlayerButton
          variant="default"
          size="sm"
          className="shrink-0 h-8 w-8 p-0 bg-[#5227FF] hover:bg-[#5227FF]/90 text-white"
        />

        {/* Current time */}
        <AudioPlayerTime className="text-sm tabular-nums text-muted-foreground min-w-[40px]" />

        <div className="flex-1" />

        {/* Total duration */}
        <AudioPlayerDuration className="text-sm tabular-nums text-muted-foreground" />

        {/* Speed */}
        <AudioPlayerSpeed size="sm" className="h-8 w-8 p-0" />

        {/* Download */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleDownload}
          aria-label="Download audio"
        >
          <DownloadIcon className="size-3.5" />
        </Button>
      </div>

      {/* Metadata */}
      {(durationSeconds !== undefined || processingTime !== undefined) && (
        <div className="flex items-center gap-4 pt-1 border-t text-xs text-muted-foreground">
          {durationSeconds !== undefined && (
            <span>
              Duration:{" "}
              <span className="font-medium text-foreground">
                {durationSeconds.toFixed(1)}s
              </span>
            </span>
          )}
          {processingTime !== undefined && (
            <span>
              Generated in:{" "}
              <span className="font-medium text-foreground">
                {processingTime.toFixed(1)}s
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export function TTSAudioPlayer(props: TTSAudioPlayerProps) {
  return (
    <AudioPlayerProvider>
      <TTSPlayerInner {...props} />
    </AudioPlayerProvider>
  )
}
