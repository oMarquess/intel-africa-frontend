"use client"

import { ReactNode } from "react"

/**
 * Layout for the logs page.
 * Caching is handled by the root dashboard layout.
 */
export default function LogsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}
