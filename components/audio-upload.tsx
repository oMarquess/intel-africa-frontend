"use client"

import { useState, useCallback, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileAudio, Loader2, CheckCircle2, XCircle, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Spinner } from "@/components/kibo-ui/spinner"
import { TranslationPanel } from "@/components/translation-panel"

interface TranscriptionResult {
  text: string
  duration?: number
  model?: string
}

interface AudioUploadProps {
  onSuccess?: (result: TranscriptionResult) => void
}

export function AudioUpload({ onSuccess }: AudioUploadProps) {
  const { getToken } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [selectedModel, setSelectedModel] = useState("intel-griot")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
      setError(null)
      setResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg', '.flac', '.aac']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setError(null)
    setUploadProgress(0)

    try {
      const token = await getToken()

      if (!token) {
        throw new Error("Not authenticated")
      }

      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("model", selectedModel)

      const xhr = new XMLHttpRequest()
      xhr.responseType = "text"

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(progress)
        }
      })

      const response = await new Promise<Response>((resolve, reject) => {
        xhr.addEventListener("load", () => {
          const responseText = xhr.responseText || xhr.response
          resolve(new Response(responseText, {
            status: xhr.status,
            statusText: xhr.statusText,
            headers: {
              'Content-Type': xhr.getResponseHeader('Content-Type') || 'application/json'
            }
          }))
        })

        xhr.addEventListener("error", () => {
          reject(new Error("Upload failed"))
        })

        xhr.addEventListener("timeout", () => {
          reject(new Error("Upload timeout"))
        })

        xhr.open("POST", `${process.env.NEXT_PUBLIC_API_URL}/v1/stt/transcribe`)
        xhr.setRequestHeader("Authorization", `Bearer ${token}`)
        xhr.send(formData)
      })

      if (!response.ok) {
        let errorMessage = "Transcription failed"
        try {
          const errorData = await response.json()
          // Handle different error response formats
          if (typeof errorData === 'string') {
            errorMessage = errorData
          } else if (errorData.detail) {
            // FastAPI format: { detail: "error message" }
            errorMessage = typeof errorData.detail === 'string'
              ? errorData.detail
              : JSON.stringify(errorData.detail)
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          } else {
            errorMessage = JSON.stringify(errorData)
          }
        } catch (parseError) {
          // If JSON parsing fails, try to get text
          const errorText = await response.text()
          errorMessage = errorText || `HTTP ${response.status}: ${response.statusText}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setResult(data)
      onSuccess?.(data)
      setSelectedFile(null)

      toast.success("Transcription completed!", {
        description: data.duration ? `Duration: ${data.duration.toFixed(1)}s` : "Your audio has been transcribed successfully.",
      })
    } catch (err) {
      console.error("Upload error:", err)
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)

      toast.error("Transcription failed", {
        description: errorMessage,
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const downloadTranscription = () => {
    if (!result) return

    const blob = new Blob([result.text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `transcription-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Prevent SSR hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Card className="border shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Upload Audio for Transcription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Compact File Upload Area */}
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive && "border-primary bg-primary/5",
            !isDragActive && "border-border hover:border-primary/50",
            isUploading && "opacity-50 cursor-not-allowed"
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {selectedFile ? (
              <>
                <FileAudio className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive ? "Drop file here" : "Drop audio or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP3, WAV, M4A, OGG, FLAC, AAC
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Inline Model Selection + Upload Button */}
        <div className="flex gap-2">
          <Select value={selectedModel} onValueChange={setSelectedModel} disabled={isUploading}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="intel-griot">Intel Griot</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="flex-1"
            size="default"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Transcribing...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Transcribe
              </>
            )}
          </Button>
        </div>

        {/* Spinner Loader */}
        {isUploading && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">Transcribing your audio</p>
              <Spinner variant="ellipsis" size="md" />
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="py-2">
            <XCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success + Transcription Result */}
        {result && (
          <div className="space-y-2">
            <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 py-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                Complete!{result.duration ? ` ${result.duration.toFixed(1)}s` : ''}
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground">TRANSCRIPTION</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={downloadTranscription}
                  className="h-7 text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg max-h-[200px] overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap">{result.text}</p>
              </div>

              {/* Translation Panel */}
              <TranslationPanel sourceText={result.text} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
