"use client"

import * as React from "react"
import { Check, ChevronsUpDown, MicIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { VoiceInfo } from "@/lib/api/tts"

interface TTSVoicePickerProps {
  voices: VoiceInfo[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function TTSVoicePicker({
  voices,
  value,
  onValueChange,
  placeholder = "Select a voice...",
  className,
  disabled,
}: TTSVoicePickerProps) {
  const [open, setOpen] = React.useState(false)
  const selectedVoice = voices.find((v) => v.id === value)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between font-normal", className)}
        >
          {selectedVoice ? (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="size-5 rounded-full bg-gradient-to-br from-[#5227FF] to-[#FF9FFC] flex items-center justify-center shrink-0">
                <MicIcon className="size-2.5 text-white" />
              </div>
              <span className="truncate">{selectedVoice.name}</span>
              <span className="text-xs text-muted-foreground capitalize shrink-0">
                {selectedVoice.gender}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[var(--radix-dropdown-menu-trigger-width)] p-0 z-50"
        align="start"
        style={{ width: "var(--radix-dropdown-menu-trigger-width)" }}
      >
        <Command>
          <CommandInput placeholder="Search voices..." />
          <CommandList>
            <CommandEmpty>No voices found.</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => (
                <CommandItem
                  key={voice.id}
                  value={voice.id}
                  keywords={[voice.name, voice.language, voice.gender]}
                  onSelect={() => {
                    onValueChange?.(voice.id)
                    setOpen(false)
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="size-7 rounded-full bg-gradient-to-br from-[#5227FF] to-[#FF9FFC] flex items-center justify-center shrink-0">
                    <MicIcon className="size-3 text-white" />
                  </div>
                  <div className="flex flex-1 flex-col gap-0.5 min-w-0">
                    <span className="font-medium text-sm">{voice.name}</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="uppercase">{voice.language}</span>
                      <span>•</span>
                      <span className="capitalize">{voice.gender}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0",
                      value === voice.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
