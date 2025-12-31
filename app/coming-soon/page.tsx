"use client"

import { Construction, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative bg-primary/10 p-6 rounded-full border border-primary/20">
              <Construction className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Coming Soon
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            We're working hard to bring you this feature. Check back soon for updates!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild variant="default" size="lg">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/dashboard">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Have questions? Contact us at{" "}
            <a href="mailto:support@intelafrica.com" className="text-primary hover:underline">
              support@intelafrica.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
