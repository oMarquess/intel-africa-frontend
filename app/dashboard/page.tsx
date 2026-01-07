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

                    <Card className="border border-transparent shadow-none overflow-hidden">
                      {/* <CardHeader className="pb-2">
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
                      </CardHeader> */}

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {/* Main Hero Block - Spans 2x2 on Desktop */}
                        <div className="relative group lg:col-span-2 lg:row-span-2 rounded-xl border bg-gradient-to-br from-primary/5 via-primary/0 to-primary/5 overflow-hidden min-h-[300px] flex items-center justify-center p-8">
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="absolute -inset-20 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 group-hover:animate-pulse" />

                          <img
                            src="/griot-model.svg"
                            alt="Griot Model Architecture"
                            className="w-full max-w-[320px] h-auto relative z-10 drop-shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                          />

                          {/* Decorative grid pattern */}
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />
                        </div>

                        {/* Overview Block */}
                        <div className="rounded-xl border bg-card/50 hover:bg-card/80 transition-colors p-5 space-y-4">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Brain className="w-4 h-4" />
                            <h3>Overview</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Architecture</h4>
                              <p className="text-sm font-medium leading-tight">Medium-sized model optimized for accuracy and speed</p>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="space-y-1">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Optimization</h4>
                              <p className="text-sm font-medium leading-tight">Fine-tuned for African languages and accents</p>
                            </div>
                            <div className="h-px bg-border/50" />
                            <div className="space-y-1">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase">Input Support</h4>
                              <p className="text-sm font-medium leading-tight text-muted-foreground">MP3, WAV, OGG, FLAC, M4A, WebM (max 25MB)</p>
                            </div>
                          </div>
                        </div>

                        {/* Performance Block */}
                        <div className="rounded-xl border bg-card/50 hover:bg-card/80 transition-colors p-5 space-y-4">
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Gauge className="w-4 h-4" />
                            <h3>Performance</h3>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                <Zap className="w-3 h-3" /> Decoding
                              </h4>
                              <div className="grid grid-cols-2 gap-2 text-sm bg-muted/30 p-2 rounded-md">
                                <div>
                                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">Beam Size</span>
                                  <span className="font-medium">5</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">VAD Filter</span>
                                  <span className="font-medium">Enabled</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-2">
                                <Cpu className="w-3 h-3" /> Processing
                              </h4>
                              <div className="space-y-1.5 text-sm">
                                <div className="flex justify-between items-center pb-1 border-b border-border/50">
                                  <span className="text-muted-foreground">Timeout</span>
                                  <span className="font-medium">20 mins</span>
                                </div>
                                <div className="flex justify-between items-center pt-0.5">
                                  <span className="text-muted-foreground">Retry Policy</span>
                                  <span className="font-medium">2 retries</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <div className="flex justify-center py-6">
                      <img
                        src="/Asset-4.svg"
                        alt="Intelligence Africa"
                        className="h-8 w-auto opacity-50 md:hidden"
                      />
                      <img
                        src="/Asset-3.svg"
                        alt="Intelligence Africa"
                        className="h-8 w-auto opacity-50 hidden md:block"
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
