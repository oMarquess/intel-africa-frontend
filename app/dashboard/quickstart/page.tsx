"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Shield, Clock } from "lucide-react"
import Link from "next/link"
import type { BundledLanguage } from "@/components/kibo-ui/code-block"
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/kibo-ui/code-block"
import { codeExamples } from "./code-examples"

export default function QuickstartPage() {
    const [activeStep, setActiveStep] = useState("step1")

    useEffect(() => {
        const handleScroll = () => {
            const step1 = document.getElementById('step1')
            const step2 = document.getElementById('step2')
            const step3 = document.getElementById('step3')

            if (!step1 || !step2 || !step3) return

            const scrollPosition = window.scrollY + window.innerHeight / 2

            const step1Top = step1.offsetTop
            const step2Top = step2.offsetTop
            const step3Top = step3.offsetTop

            if (scrollPosition >= step3Top) {
                setActiveStep('step3')
            } else if (scrollPosition >= step2Top) {
                setActiveStep('step2')
            } else if (scrollPosition >= step1Top) {
                setActiveStep('step1')
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Call once on mount

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-background md:min-h-min">
                <div className="max-w-7xl mx-auto space-y-12 p-6 md:p-8">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 py-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-4xl font-bold tracking-tight">
                                Start Building in Minutes
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Get up and running with the Intel Africa API in just a few simple steps. No complex setup required.
                            </p>
                        </div>
                    </div>


                    {/* Steps Section - Split Layout */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-8">Get Started in 3 Steps</h2>
                        
                        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                            {/* Sticky Navigation Sidebar */}
                            <div className="lg:sticky lg:top-6 lg:self-start space-y-2 h-fit">
                                <button
                                    onClick={() => {
                                        setActiveStep('step1')
                                        document.getElementById('step1')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                    className={`w-full text-left p-4 rounded-lg border border-dashed transition-all ${
                                        activeStep === 'step1' 
                                            ? 'border-primary bg-primary/5' 
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <Badge variant="outline" className="mb-2">Step 1</Badge>
                                    <div className="font-semibold text-base">Get Your API Key</div>
                                    <p className="text-sm text-muted-foreground mt-1">Create and manage keys</p>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setActiveStep('step2')
                                        document.getElementById('step2')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                    className={`w-full text-left p-4 rounded-lg border border-dashed transition-all ${
                                        activeStep === 'step2' 
                                            ? 'border-primary bg-primary/5' 
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <Badge variant="outline" className="mb-2">Step 2</Badge>
                                    <div className="font-semibold text-base">Make Your First Request</div>
                                    <p className="text-sm text-muted-foreground mt-1">Test the API</p>
                                </button>
                                
                                <button
                                    onClick={() => {
                                        setActiveStep('step3')
                                        document.getElementById('step3')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                    }}
                                    className={`w-full text-left p-4 rounded-lg border border-dashed transition-all ${
                                        activeStep === 'step3' 
                                            ? 'border-primary bg-primary/5' 
                                            : 'border-border hover:border-primary/50'
                                    }`}
                                >
                                    <Badge variant="outline" className="mb-2">Step 3</Badge>
                                    <div className="font-semibold text-base">Start Building</div>
                                    <p className="text-sm text-muted-foreground mt-1">Monitor and scale</p>
                                </button>
                            </div>

                            {/* Content Area */}
                            <div className="space-y-8">
                                {/* Step 1 */}
                                <Card id="step1" className="border border-dashed shadow-none scroll-mt-6">
                                    <CardHeader className="space-y-4">
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="mb-2">Step 1</Badge>
                                            <CardTitle className="text-2xl">Get Your API Key</CardTitle>
                                            <CardDescription className="text-base leading-relaxed">
                                                Create your first API key to authenticate your requests. It takes just seconds.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <Link href="/dashboard/api-keys" className="block">
                                            <Button className="w-full">
                                                Create API Key
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>

                                {/* Step 2 */}
                                <Card id="step2" className="border border-dashed shadow-none scroll-mt-6">
                                    <CardHeader className="space-y-4">
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="mb-2">Step 2</Badge>
                                            <CardTitle className="text-2xl">Make Your First Request</CardTitle>
                                            <CardDescription className="text-base">
                                                Use your API key to make requests. Choose your preferred language below.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                <CardContent>
                                    <CodeBlock data={codeExamples} defaultValue={codeExamples[0].language}>
                                        <CodeBlockHeader>
                                            <CodeBlockSelect>
                                                <CodeBlockSelectTrigger>
                                                    <CodeBlockSelectValue />
                                                </CodeBlockSelectTrigger>
                                                <CodeBlockSelectContent>
                                                    {(item) => (
                                                        <CodeBlockSelectItem key={item.language} value={item.language}>
                                                            {item.language}
                                                        </CodeBlockSelectItem>
                                                    )}
                                                </CodeBlockSelectContent>
                                            </CodeBlockSelect>
                                            <CodeBlockCopyButton />
                                        </CodeBlockHeader>
                                        <CodeBlockBody>
                                            {(item) => (
                                                <CodeBlockItem key={item.language} value={item.language}>
                                                    <CodeBlockContent language={item.language as BundledLanguage}>
                                                        {item.code}
                                                    </CodeBlockContent>
                                                </CodeBlockItem>
                                            )}
                                        </CodeBlockBody>
                                    </CodeBlock>
                                </CardContent>
                                </Card>

                                {/* Step 3 */}
                                <Card id="step3" className="border border-dashed shadow-none scroll-mt-6">
                                    <CardHeader className="space-y-4">
                                        <div className="space-y-2">
                                            <Badge variant="outline" className="mb-2">Step 3</Badge>
                                            <CardTitle className="text-2xl">Start Building</CardTitle>
                                            <CardDescription className="text-base">
                                                You're all set! Monitor your usage, check logs, and scale as you grow.
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-3">
                                            <Link href="/dashboard/usage">
                                                <Button variant="outline">
                                                    View Usage
                                                </Button>
                                            </Link>
                                            <Link href="/dashboard/logs">
                                                <Button variant="outline">
                                                    Check Logs
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Additional Resources */}
                    <div className="space-y-6 pt-8 border-t">
                        <h2 className="text-2xl font-bold">What's Next?</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>API Documentation</CardTitle>
                                    <CardDescription>
                                        Explore all available endpoints, parameters, and response formats.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                            <Card className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <CardTitle>Best Practices</CardTitle>
                                    <CardDescription>
                                        Learn tips and tricks to optimize your API usage and performance.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
