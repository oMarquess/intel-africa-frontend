"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { toast } from "sonner"
import { Loader2, Sparkles, AlertCircle, Upload, Trash2, X, ChevronDown } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import GradientBlinds from "@/components/GradientBlinds"
import { TTSAudioPlayer } from "@/components/tts/tts-audio-player"
import { TTSVoicePicker } from "@/components/tts/tts-voice-picker"
import { fetchVoices, fetchModels, generateSpeech, uploadVoice, deleteVoice, generateSpeechWithReference } from "@/lib/api/tts"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import type { VoiceInfo, ModelInfo, GenerateSpeechResult } from "@/lib/api/tts"

const MAX_CHARS = 5000

const LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "zh", label: "Chinese" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "ru", label: "Russian" },
  { code: "tr", label: "Turkish" },
  { code: "nl", label: "Dutch" },
  { code: "pl", label: "Polish" },
  { code: "sv", label: "Swedish" },
  { code: "da", label: "Danish" },
  { code: "no", label: "Norwegian" },
  { code: "fi", label: "Finnish" },
  { code: "el", label: "Greek" },
  { code: "he", label: "Hebrew" },
  { code: "ms", label: "Malay" },
  { code: "sw", label: "Swahili" },
]

export default function TTSPage() {
  const [text, setText] = useState("")
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>()
  const [selectedModel, setSelectedModel] = useState("turbo")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [voices, setVoices] = useState<VoiceInfo[]>([])
  const [models, setModels] = useState<ModelInfo[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<GenerateSpeechResult | null>(null)
  const [loadingVoices, setLoadingVoices] = useState(true)
  
  // Voice upload
  const [isUploadingVoice, setIsUploadingVoice] = useState(false)
  const [voiceName, setVoiceName] = useState("")
  const [voiceFile, setVoiceFile] = useState<File | null>(null)
  const voiceFileInputRef = useRef<HTMLInputElement>(null)
  
  // Reference audio for voice cloning
  const [referenceAudio, setReferenceAudio] = useState<File | null>(null)
  const referenceAudioInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    Promise.all([fetchVoices(), fetchModels()])
      .then(([v, m]) => {
        setVoices(v)
        setModels(m)
        if (v.length > 0) setSelectedVoice(v[0].id)
      })
      .catch(() => {})
      .finally(() => setLoadingVoices(false))
  }, [])

  const currentModel = models.find((m) => m.id === selectedModel)
  const isMultilingual = selectedModel === "multilingual"
  const canGenerate = text.trim().length > 0 && !isGenerating

  const handleGenerate = useCallback(async () => {
    if (!canGenerate) return
    if (text.trim().length > MAX_CHARS) {
      toast.error(`Text must be under ${MAX_CHARS} characters`)
      return
    }

    setIsGenerating(true)
    setResult(null)

    try {
      let res: GenerateSpeechResult
      
      if (referenceAudio) {
        // Use reference audio for voice cloning
        res = await generateSpeechWithReference(
          text.trim(),
          referenceAudio,
          selectedModel,
          isMultilingual ? selectedLanguage : undefined
        )
        toast.success(`Speech cloned in ${res.processingTime.toFixed(1)}s`)
      } else {
        // Use selected voice
        res = await generateSpeech({
          text: text.trim(),
          model: selectedModel,
          language: isMultilingual ? selectedLanguage : undefined,
          voice_id: selectedVoice,
          speed: 1.0,
        })
        toast.success(`Speech generated in ${res.processingTime.toFixed(1)}s`)
      }
      
      setResult(res)
    } catch (err: any) {
      toast.error(err?.message || "Failed to generate speech")
    } finally {
      setIsGenerating(false)
    }
  }, [canGenerate, text, selectedModel, selectedLanguage, selectedVoice, isMultilingual, referenceAudio])

  const handleUploadVoice = useCallback(async () => {
    if (!voiceFile || !voiceName.trim()) {
      toast.error("Please provide both a voice name and audio file")
      return
    }

    setIsUploadingVoice(true)
    try {
      const newVoice = await uploadVoice(voiceFile, voiceName.trim())
      setVoices((prev) => [...prev, newVoice])
      setSelectedVoice(newVoice.id)
      toast.success(`Voice "${newVoice.name}" uploaded successfully`)
      setVoiceName("")
      setVoiceFile(null)
      if (voiceFileInputRef.current) voiceFileInputRef.current.value = ""
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload voice")
    } finally {
      setIsUploadingVoice(false)
    }
  }, [voiceFile, voiceName])

  const handleDeleteVoice = useCallback(async (voiceId: string) => {
    if (!confirm("Are you sure you want to delete this voice?")) return

    try {
      await deleteVoice(voiceId)
      setVoices((prev) => prev.filter((v) => v.id !== voiceId))
      if (selectedVoice === voiceId) {
        setSelectedVoice(voices[0]?.id)
      }
      toast.success("Voice deleted")
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete voice")
    }
  }, [selectedVoice, voices])

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6 space-y-4">

                {/* Main Layout: Left (Header + Textarea) | Right (Voice + Settings) */}
                <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
                  
                  {/* Left Column: Header + Textarea */}
                  <div className="space-y-4">
                    {/* Gradient Blinds Header */}
                    <div className="rounded-lg bg-black overflow-hidden">
                      <div style={{ width: "100%", height: "150px", position: "relative" }}>
                        <GradientBlinds
                          gradientColors={["#FF9FFC", "#5227FF"]}
                          angle={0}
                          noise={0.3}
                          blindCount={12}
                          blindMinWidth={50}
                          spotlightRadius={0.5}
                          spotlightSoftness={1}
                          spotlightOpacity={1}
                          mouseDampening={0.15}
                          distortAmount={0}
                          shineDirection="left"
                          mixBlendMode="lighten"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                          <h1 className="text-3xl font-bold mb-2">Text-to-Speech</h1>
                          <p className="text-sm opacity-90">
                            Convert text to natural-sounding speech using our AI-powered TTS engine
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Text Input Card */}
                    <div className="rounded-lg border bg-card p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Text to synthesize</Label>
                        <span className={`text-xs tabular-nums ${text.length > MAX_CHARS ? "text-destructive" : "text-muted-foreground"}`}>
                          {text.length} / {MAX_CHARS}
                        </span>
                      </div>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter your text here... You can use [laugh], [cough], [sigh] tags with the Turbo model."
                        rows={10}
                        className="w-full resize-none rounded-md border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF]/50 focus:border-[#5227FF] transition-colors"
                      />
                      {text.length > MAX_CHARS && (
                        <p className="flex items-center gap-1.5 text-xs text-destructive">
                          <AlertCircle className="size-3" />
                          Text exceeds {MAX_CHARS} character limit
                        </p>
                      )}
                    </div>

                    {/* Generate Button */}
                    <Button
                      size="lg"
                      className="w-full bg-[#5227FF] hover:bg-[#5227FF]/90 text-white font-semibold gap-2"
                      onClick={handleGenerate}
                      disabled={!canGenerate || text.length > MAX_CHARS}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="size-4 animate-spin" style={{ animationDuration: "500ms" }} />
                          Generating speech...
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          Generate Speech
                        </>
                      )}
                    </Button>

                    {/* Audio Player — shown after generation */}
                    {result && (
                      <TTSAudioPlayer
                        src={result.audioUrl}
                        durationSeconds={result.durationSeconds}
                        processingTime={result.processingTime}
                        filename={`speech-${Date.now()}.wav`}
                      />
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">

                    {/* 1. Voice Picker */}
                    <div className="rounded-lg border bg-card p-5 space-y-2.5">
                      <Label className="text-sm font-semibold">Voice</Label>
                      {loadingVoices ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 className="size-3.5 animate-spin" />
                          Loading voices...
                        </div>
                      ) : voices.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No voices yet — add one below.</p>
                      ) : (
                        <TTSVoicePicker
                          voices={voices}
                          value={selectedVoice}
                          onValueChange={setSelectedVoice}
                        />
                      )}
                    </div>

                    {/* 2. Settings */}
                    <div className="rounded-lg border bg-card p-5 space-y-4">
                      <Label className="text-sm font-semibold">Settings</Label>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Model</Label>
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent>
                            {models.length > 0 ? (
                              models.map((m) => (
                                <SelectItem key={m.id} value={m.id}>
                                  {m.name}
                                </SelectItem>
                              ))
                            ) : (
                              <>
                                <SelectItem value="turbo">Chatterbox Turbo</SelectItem>
                                <SelectItem value="standard">Chatterbox Standard</SelectItem>
                                <SelectItem value="multilingual">Chatterbox Multilingual</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      {isMultilingual && (
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Language</Label>
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              {LANGUAGES.map((lang) => (
                                <SelectItem key={lang.code} value={lang.code}>
                                  {lang.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {currentModel?.supports_paralinguistic_tags && (
                        <p className="text-xs text-muted-foreground pt-1">
                          Tip: Use <code className="font-mono bg-muted px-1 rounded">[laugh]</code>, <code className="font-mono bg-muted px-1 rounded">[cough]</code>, <code className="font-mono bg-muted px-1 rounded">[sigh]</code> tags in your text.
                        </p>
                      )}
                    </div>

                    {/* 3. Manage Voices — collapsed */}
                    <Collapsible className="rounded-lg border bg-card overflow-hidden">
                      <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
                        <span>Manage Voices</span>
                        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-5 pb-5 space-y-4 border-t">
                        <div className="pt-4 space-y-3">
                          <p className="text-xs text-muted-foreground">Upload a ~10s audio clip to add a new voice to your library.</p>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Voice Name</Label>
                            <Input
                              value={voiceName}
                              onChange={(e) => setVoiceName(e.target.value)}
                              placeholder="e.g., Morgan"
                              disabled={isUploadingVoice}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Audio File <span className="text-muted-foreground font-normal">(WAV, MP3, FLAC)</span></Label>
                            <Input
                              ref={voiceFileInputRef}
                              type="file"
                              accept="audio/wav,audio/mp3,audio/flac"
                              onChange={(e) => setVoiceFile(e.target.files?.[0] || null)}
                              disabled={isUploadingVoice}
                            />
                            {voiceFile && (
                              <p className="text-xs text-muted-foreground">{voiceFile.name} — {(voiceFile.size / 1024).toFixed(1)} KB</p>
                            )}
                          </div>
                          <Button
                            onClick={handleUploadVoice}
                            disabled={!voiceFile || !voiceName.trim() || isUploadingVoice}
                            className="w-full bg-[#5227FF] hover:bg-[#5227FF]/90 text-white"
                            size="sm"
                          >
                            {isUploadingVoice ? (
                              <><Loader2 className="size-3.5 mr-2 animate-spin" />Uploading...</>
                            ) : (
                              <><Upload className="size-3.5 mr-2" />Upload Voice</>
                            )}
                          </Button>
                        </div>

                        {voices.length > 0 && (
                          <div className="space-y-2 border-t pt-4">
                            <Label className="text-sm font-medium">Delete a Voice</Label>
                            <p className="text-xs text-muted-foreground">Permanently removes the voice from your library.</p>
                            <Select onValueChange={(id) => handleDeleteVoice(id)}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select voice to delete..." />
                              </SelectTrigger>
                              <SelectContent>
                                {voices.map((v) => (
                                  <SelectItem key={v.id} value={v.id}>
                                    <span className="flex items-center gap-2">
                                      <Trash2 className="size-3 text-destructive" />
                                      {v.name}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>

                    {/* 4. Voice Cloning — collapsed */}
                    <Collapsible className="rounded-lg border bg-card overflow-hidden">
                      <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold hover:bg-muted/50 transition-colors [&[data-state=open]>svg]:rotate-180">
                        <div className="flex items-center gap-2">
                          <span>Voice Cloning</span>
                          {referenceAudio && (
                            <span className="text-xs font-normal bg-[#5227FF]/10 text-[#5227FF] px-1.5 py-0.5 rounded-full">Active</span>
                          )}
                        </div>
                        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-5 pb-5 space-y-3 border-t">
                        <div className="pt-4">
                          <p className="text-xs text-muted-foreground mb-3">
                            Upload a reference audio to clone a voice for this generation only. Overrides the selected voice above.
                          </p>
                          {referenceAudio ? (
                            <div className="flex items-center gap-2 p-2.5 rounded-md bg-muted">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{referenceAudio.name}</p>
                                <p className="text-xs text-muted-foreground">{(referenceAudio.size / 1024).toFixed(1)} KB</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setReferenceAudio(null)
                                  if (referenceAudioInputRef.current) referenceAudioInputRef.current.value = ""
                                }}
                              >
                                <X className="size-4" />
                              </Button>
                            </div>
                          ) : (
                            <Input
                              ref={referenceAudioInputRef}
                              type="file"
                              accept="audio/wav,audio/mp3,audio/flac"
                              onChange={(e) => setReferenceAudio(e.target.files?.[0] || null)}
                            />
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
