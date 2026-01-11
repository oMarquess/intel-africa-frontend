"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Languages, Loader2, StopCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { SupportedLanguage, LANGUAGE_LABELS } from "@/lib/translation.types"
import { Shimmer } from "@/components/ai-elements/shimmer"

interface TranslationPanelProps {
    sourceText: string
    className?: string
}

export function TranslationPanel({ sourceText, className }: TranslationPanelProps) {
    const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('twi')
    const { translateText, translatedText, isTranslating, error, stop, reset } = useTranslation()

    const handleTranslate = async () => {
        await translateText(sourceText, selectedLanguage)
    }

    const downloadTranslation = () => {
        if (!translatedText) return

        const blob = new Blob([translatedText], { type: "text/plain" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `translation-${selectedLanguage}-${Date.now()}.txt`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return (
        <div className={cn("space-y-3 pt-3 border-t", className)}>
            {/* Translation Header */}
            <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">Translation</h3>
            </div>

            {/* Language Selector & Translate Button */}
            <div className="flex gap-2">
                <Select
                    value={selectedLanguage}
                    onValueChange={(value) => setSelectedLanguage(value as SupportedLanguage)}
                    disabled={isTranslating}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="twi">
                            <span className="flex items-center gap-2">
                                🇬🇭 {LANGUAGE_LABELS.twi}
                            </span>
                        </SelectItem>
                        <SelectItem value="ga">
                            <span className="flex items-center gap-2">
                                🇬🇭 {LANGUAGE_LABELS.ga}
                            </span>
                        </SelectItem>
                        <SelectItem value="ewe">
                            <span className="flex items-center gap-2">
                                🇬🇭 {LANGUAGE_LABELS.ewe}
                            </span>
                        </SelectItem>
                    </SelectContent>
                </Select>

                {!isTranslating ? (
                    <Button
                        onClick={handleTranslate}
                        disabled={!sourceText || isTranslating}
                        className="flex-1"
                        size="default"
                    >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Translate
                    </Button>
                ) : (
                    <Button
                        onClick={stop}
                        variant="destructive"
                        className="flex-1"
                        size="default"
                    >
                        <StopCircle className="w-4 h-4 mr-2" />
                        Stop
                    </Button>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <Alert variant="destructive" className="py-2">
                    <AlertDescription className="text-sm">{error.message}</AlertDescription>
                </Alert>
            )}

            {/* Translation Result */}
            {(translatedText || isTranslating) && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-medium text-muted-foreground uppercase">
                            {LANGUAGE_LABELS[selectedLanguage]} Translation
                        </label>
                        {translatedText && !isTranslating && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={downloadTranslation}
                                className="h-7 text-xs"
                            >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                            </Button>
                        )}
                    </div>

                    <div className="relative p-3 bg-muted rounded-lg max-h-[200px] overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">
                            {isTranslating ? (
                                <Shimmer className="text-sm">{translatedText}</Shimmer>
                            ) : (
                                translatedText
                            )}
                            {isTranslating && (
                                <span className="inline-block w-1 h-4 ml-1 bg-primary animate-pulse" />
                            )}
                        </p>
                        {isTranslating && !translatedText && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Translating...</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
