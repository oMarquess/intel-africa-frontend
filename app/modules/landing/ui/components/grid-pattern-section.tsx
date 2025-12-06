"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/ui/shadcn-io/interactive-grid-pattern";
import { CornerAccentButton } from "@/components/ui/shadcn-io/corner-accent-button";

export function GridPatternSection() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background">
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
      
      {/* Content overlay */}
      <div className="relative z-10 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Doto, sans-serif' }}>
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Join leading organizations transforming their voice data into actionable insights.
        </p>
        
        <div className="flex justify-center">
          <CornerAccentButton 
            className="bg-[#1D976C] hover:bg-[#1D976C]/90"
            style={{
              backgroundColor: '#1D976C',
            }}
          >
            <span className="text-white font-semibold">Get Started</span>
          </CornerAccentButton>
        </div>
      </div>
    </div>
  );
}
