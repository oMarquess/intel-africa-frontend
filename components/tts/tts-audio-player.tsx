"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { PauseIcon, PlayIcon, DownloadIcon, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const

interface TTSAudioPlayerProps {
  src: string
  durationSeconds?: number
  processingTime?: number
  filename?: string
}

export function TTSAudioPlayer({
  src,
  durationSeconds,
  processingTime,
  filename = "speech.wav",
}: TTSAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(durationSeconds ?? 0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isBuffering, setIsBuffering] = useState(false)
  const rafRef = useRef<number | null>(null)

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      if (!audioRef.current.paused) {
        rafRef.current = requestAnimationFrame(updateTime)
      }
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => {
      setIsPlaying(true)
      rafRef.current = requestAnimationFrame(updateTime)
    }
    const onPause = () => {
      setIsPlaying(false)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => setIsBuffering(false)

    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audio.addEventListener("ended", onEnded)
    audio.addEventListener("loadedmetadata", onLoadedMetadata)
    audio.addEventListener("waiting", onWaiting)
    audio.addEventListener("playing", onPlaying)

    return () => {
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("ended", onEnded)
      audio.removeEventListener("loadedmetadata", onLoadedMetadata)
      audio.removeEventListener("waiting", onWaiting)
      audio.removeEventListener("playing", onPlaying)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [updateTime])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      await audio.play()
    }
  }, [isPlaying])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = parseFloat(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  const handleSpeedChange = useCallback((speed: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = speed
    setPlaybackRate(speed)
  }, [])

  const handleDownload = useCallback(() => {
    const a = document.createElement("a")
    a.href = src
    a.download = filename
    a.click()
  }, [src, filename])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="rounded-lg border bg-card p-3 space-y-2">
      <audio ref={audioRef} src={src} preload="metadata" className="hidden" />

      {/* Waveform / Progress bar */}
      <div className="relative h-8 flex items-center gap-2">
        <div className="flex-1 relative h-2 group cursor-pointer">
          {/* Track */}
          <div className="absolute inset-0 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#5227FF] to-[#FF9FFC] transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Seek input */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.01}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
          />
          {/* Thumb indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-white border-2 border-[#5227FF] shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center gap-1.5">
        {/* Play/Pause */}
        <Button
          variant="default"
          size="sm"
          onClick={togglePlay}
          disabled={isBuffering}
          className="shrink-0 h-8 w-8 p-0 bg-[#5227FF] hover:bg-[#5227FF]/90"
        >
          {isBuffering ? (
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isPlaying ? (
            <PauseIcon className="size-4" />
          ) : (
            <PlayIcon className="size-4" />
          )}
        </Button>

        {/* Time */}
        <span className="text-sm tabular-nums text-muted-foreground min-w-[40px]">
          {formatTime(currentTime)}
        </span>

        <div className="flex-1" />

        <span className="text-sm tabular-nums text-muted-foreground">
          {formatTime(duration)}
        </span>

        {/* Speed */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="Playback speed">
              <Settings className="size-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {SPEEDS.map((speed) => (
              <DropdownMenuItem
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className="flex items-center justify-between gap-4"
              >
                <span className={cn("font-mono text-sm", speed === 1 && "font-sans")}>
                  {speed === 1 ? "Normal" : `${speed}x`}
                </span>
                {playbackRate === speed && (
                  <span className="size-1.5 rounded-full bg-[#5227FF] block" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

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
            <span>Duration: <span className="font-medium text-foreground">{durationSeconds.toFixed(1)}s</span></span>
          )}
          {processingTime !== undefined && (
            <span>Generated in: <span className="font-medium text-foreground">{processingTime.toFixed(1)}s</span></span>
          )}
        </div>
      )}
    </div>
  )
}
