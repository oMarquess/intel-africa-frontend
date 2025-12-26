"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"

/**
 * Client-side layout for the usage page.
 * React Query context is now provided by the root dashboard layout.
 */
export default function UsageLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}
