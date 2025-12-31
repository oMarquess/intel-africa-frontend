"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "throbber" | "pinwheel" | "circle-filled" | "ellipsis" | "ring" | "bars" | "infinite"
  size?: "sm" | "md" | "lg"
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    }

    if (variant === "throbber") {
      return (
        <div
          ref={ref}
          className={cn("relative", sizeClasses[size], className)}
          {...props}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes throbber-pulse {
                0%, 100% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
              }
            `
          }} />
          <div 
            className="absolute inset-0 rounded-full bg-primary"
            style={{
              animation: 'throbber-pulse 1s ease-in-out infinite'
            }}
          />
        </div>
      )
    }

    if (variant === "pinwheel") {
      return (
        <div
          ref={ref}
          className={cn("relative", sizeClasses[size], className)}
          {...props}
        >
          <div className="absolute inset-0 animate-spin">
            <div className="h-full w-full rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      )
    }

    if (variant === "circle-filled") {
      return (
        <div
          ref={ref}
          className={cn("relative", sizeClasses[size], className)}
          {...props}
        >
          <div className="absolute inset-0 animate-spin">
            <div className="h-full w-full rounded-full border-4 border-muted">
              <div className="h-full w-full rounded-full border-4 border-primary border-b-transparent border-l-transparent" />
            </div>
          </div>
        </div>
      )
    }

    if (variant === "ellipsis") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center gap-1", sizeClasses[size], className)}
          {...props}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes ellipsis-bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
              }
            `
          }} />
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              style={{
                animation: `ellipsis-bounce 1.4s infinite ease-in-out both`,
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === "ring") {
      return (
        <div
          ref={ref}
          className={cn("relative", sizeClasses[size], className)}
          {...props}
        >
          <div className="absolute inset-0 rounded-full border-4 border-muted" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
        </div>
      )
    }

    if (variant === "bars") {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center gap-1", sizeClasses[size], className)}
          {...props}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes bars-scale {
                0%, 40%, 100% { transform: scaleY(0.4); }
                20% { transform: scaleY(1); }
              }
            `
          }} />
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1 h-full bg-primary rounded-full"
              style={{
                animation: `bars-scale 1.2s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === "infinite") {
      return (
        <div
          ref={ref}
          className={cn("relative overflow-hidden", sizeClasses[size], className)}
          {...props}
        >
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes infinite-slide {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `
          }} />
          <div className="absolute inset-0 bg-muted rounded-full" />
          <div
            className="absolute inset-0 bg-primary rounded-full"
            style={{
              animation: `infinite-slide 1.5s ease-in-out infinite`,
              width: "50%",
            }}
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("relative", sizeClasses[size], className)}
        {...props}
      >
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
    )
  }
)

Spinner.displayName = "Spinner"

export { Spinner }
