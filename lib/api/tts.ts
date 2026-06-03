const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "")

export interface VoiceInfo {
  id: string
  name: string
  language: string
  gender: string
}

export interface ModelInfo {
  id: string
  name: string
  description: string
  supports_languages: string[]
  supports_voice_cloning: boolean
  supports_paralinguistic_tags: boolean
}

export interface GenerateSpeechParams {
  text: string
  model: string
  language?: string
  voice_id?: string
  speed?: number
}

export interface GenerateSpeechResult {
  audioUrl: string
  durationSeconds: number
  charactersUsed: number
  processingTime: number
}

export async function fetchVoices(): Promise<VoiceInfo[]> {
  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/voices`)
  if (!res.ok) throw new Error("Failed to fetch voices")
  return res.json()
}

export async function fetchModels(): Promise<ModelInfo[]> {
  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/models`)
  if (!res.ok) throw new Error("Failed to fetch models")
  return res.json()
}

async function getAudioDuration(audioUrl: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl)
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration)
    })
    audio.addEventListener("error", reject)
  })
}

export async function generateSpeech(
  params: GenerateSpeechParams
): Promise<GenerateSpeechResult> {
  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/synthesize-stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Speech generation failed")
  }

  let durationSeconds = parseFloat(res.headers.get("X-Duration-Seconds") || "0")
  const charactersUsed = parseInt(res.headers.get("X-Characters-Used") || "0", 10)
  const processingTime = parseFloat(res.headers.get("X-Processing-Time") || "0")

  const blob = await res.blob()
  const audioUrl = URL.createObjectURL(blob)

  // Fallback: if backend returns 0 duration, calculate from audio file
  if (durationSeconds === 0) {
    try {
      durationSeconds = await getAudioDuration(audioUrl)
    } catch (e) {
      console.warn("Failed to calculate audio duration:", e)
    }
  }

  return { audioUrl, durationSeconds, charactersUsed, processingTime }
}

export function getVoicePreviewUrl(voiceId: string): string {
  return `${API_BASE}/v1/tts/chatterbox/voices/${voiceId}/preview`
}

export async function uploadVoice(
  audioFile: File,
  name: string,
  language: string = "en",
  gender: string = "neutral"
): Promise<VoiceInfo> {
  const formData = new FormData()
  formData.append("voice_audio", audioFile)
  formData.append("name", name)
  formData.append("language", language)
  formData.append("gender", gender)

  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/voices`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Failed to upload voice")
  }

  return res.json()
}

export async function deleteVoice(voiceId: string): Promise<void> {
  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/voices/${voiceId}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Failed to delete voice")
  }
}

export async function generateSpeechWithReference(
  text: string,
  referenceAudio: File,
  model: string = "turbo",
  language?: string
): Promise<GenerateSpeechResult> {
  const formData = new FormData()
  formData.append("text", text)
  formData.append("reference_audio", referenceAudio)
  formData.append("model", model)
  if (language) formData.append("language", language)

  const res = await fetch(`${API_BASE}/v1/tts/chatterbox/synthesize-with-reference-stream`, {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    throw new Error(err.detail || "Speech generation with reference failed")
  }

  let durationSeconds = parseFloat(res.headers.get("X-Duration-Seconds") || "0")
  const charactersUsed = parseInt(res.headers.get("X-Characters-Used") || "0", 10)
  const processingTime = parseFloat(res.headers.get("X-Processing-Time") || "0")

  const blob = await res.blob()
  const audioUrl = URL.createObjectURL(blob)

  // Fallback: if backend returns 0 duration, calculate from audio file
  if (durationSeconds === 0) {
    try {
      durationSeconds = await getAudioDuration(audioUrl)
    } catch (e) {
      console.warn("Failed to calculate audio duration:", e)
    }
  }

  return { audioUrl, durationSeconds, charactersUsed, processingTime }
}
