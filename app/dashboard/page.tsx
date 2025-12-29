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
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-muted-foreground">
                      Upload audio files for transcription using your free trial or API keys
                    </p>
                  </div>

                  {/* Audio Upload Section */}
                  <AudioUpload />

                  {/* Quick Links */}
                  <Card className="border border-dashed shadow-none">
                    <CardHeader>
                      <CardTitle>Quick Links</CardTitle>
                      <CardDescription>
                        Navigate to other sections of your dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/dashboard/api-keys">
                          <Button variant="outline" className="w-full">
                            API Keys
                          </Button>
                        </Link>
                        <Link href="/dashboard/usage">
                          <Button variant="outline" className="w-full">
                            Usage Stats
                          </Button>
                        </Link>
                        <Link href="/dashboard/logs">
                          <Button variant="outline" className="w-full">
                            Request Logs
                          </Button>
                        </Link>
                        <Link href="/dashboard/quickstart">
                          <Button variant="outline" className="w-full">
                            Quickstart Guide
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
