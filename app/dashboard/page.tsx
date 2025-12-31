"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AudioUpload } from "@/components/audio-upload"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, Zap, FileInput, Sparkles, Server, Gauge, Brain } from "lucide-react"

export default function Page() {

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
              <div className="px-4 lg:px-6">
                <div className="space-y-4">
                  {/* Compact Header */}
                  <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">
                      Upload audio files for transcription
                    </p>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
                    {/* Audio Upload Section */}
                    <AudioUpload />

                    {/* Quick Links */}
                    <div className="sticky top-4 space-y-3">
                      <div className="rounded-lg border bg-card p-4 shadow-sm">
                        <h2 className="text-base font-semibold mb-3">Quick Links</h2>
                        <div className="flex flex-col space-y-2">
                          <Link href="/dashboard/api-keys" className="text-sm hover:underline hover:text-primary transition-colors">
                            → API Keys
                          </Link>
                          <Link href="/dashboard/usage" className="text-sm hover:underline hover:text-primary transition-colors">
                            → Usage Stats
                          </Link>
                          <Link href="/dashboard/logs" className="text-sm hover:underline hover:text-primary transition-colors">
                            → Request Logs
                          </Link>
                          <Link href="/dashboard/quickstart" className="text-sm hover:underline hover:text-primary transition-colors">
                            → Quickstart Guide
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Available Models Section */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-bold">Our Models</h2>
                      <p className="text-sm text-muted-foreground">
                        Choose from our optimized speech-to-text models
                      </p>
                    </div>

                    <Card className="border shadow-none">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-xl">Intel-Griot</CardTitle>
                            <CardDescription className="text-base max-w-2xl">
                              Fine-tuned for African languages and accents with optimized real-time inference
                            </CardDescription>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium border border-primary/20">
                            Flagship Model
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {/* Overview Column */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <Brain className="w-4 h-4" />
                              <h3>Overview</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Architecture</h4>
                                <p className="text-sm font-medium">Medium-sized model optimized for accuracy and speed</p>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Optimization</h4>
                                <p className="text-sm font-medium">Fine-tuned for African languages and accents</p>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-1">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Input Support</h4>
                                <p className="text-sm font-medium">MP3, WAV, OGG, FLAC, M4A, WebM (max 25MB)</p>
                              </div>
                            </div>
                          </div>

                          {/* Performance Column */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <Gauge className="w-4 h-4" />
                              <h3>Performance</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                  <Zap className="w-3 h-3" /> Decoding
                                </h4>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground block text-xs">Beam Size</span>
                                    <span className="font-medium">5</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground block text-xs">VAD Filter</span>
                                    <span className="font-medium">Enabled</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                  <Cpu className="w-3 h-3" /> Processing
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Timeout</span>
                                    <span className="font-medium">20 mins</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Retry Policy</span>
                                    <span className="font-medium">2 retries</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Infrastructure Column */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-medium">
                              <Server className="w-4 h-4" />
                              <h3>Infrastructure</h3>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Hardware</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">GPU</span>
                                    <span className="font-medium">NVIDIA L4 (24GB)</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Precision</span>
                                    <span className="font-medium">float16</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">CUDA</span>
                                    <span className="font-medium">12.3.2</span>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase">Deployment</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Storage</span>
                                    <span className="font-medium">Modal Volumes</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Cold Start</span>
                                    <span className="font-medium text-green-600 dark:text-green-400">Optimized</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-center py-6">
                      <img 
                        src="/Asset 2.svg" 
                        alt="Intel Africa" 
                        className="h-8 w-auto dark:invert-0 invert opacity-50"
                      />
                    </div>
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
