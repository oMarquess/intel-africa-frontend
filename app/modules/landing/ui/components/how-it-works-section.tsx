"use client";
import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/shadcn-io/animated-beam";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Image from "next/image";
import { motion } from "framer-motion";
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";
const Example = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  return (
    <div className="w-full py-16 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-4" style={{ fontFamily: 'Doto, sans-serif' }}>
        <span>From Zero to Live in Minutes</span>
        <motion.span 
          style={{ fontFamily: 'Doto, sans-serif' }}
          animate={{ x: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Image
            src="/car.png"
            alt="Car"
            width={60}
            height={60}
            className="object-contain inline-block"
            style={{
              filter: 'brightness(0) saturate(100%) invert(48%) sepia(44%) saturate(1234%) hue-rotate(338deg) brightness(92%) contrast(86%)'
            }}
          />
        </motion.span>
      </h2>
      <div
        className="relative flex w-full max-w-[1000px] items-center justify-center overflow-hidden p-10 mx-auto"
        ref={containerRef}
      >
        <div className="flex size-full flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row justify-between items-start gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <Circle ref={div1Ref}>
                <Icons.upload />
              </Circle>
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-2">Upload audio, stream, or send via API</h3>
                <p className="text-xs text-gray-600">Accepts MP3, WAV, M4A, call recordings, voice notes via upload, real-time stream, or API calls.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <Circle ref={div2Ref}>
                <Icons.brain />
              </Circle>
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-2">Our African-optimized AI models process the data</h3>
                <p className="text-xs text-gray-600">Speech → Text → Intent → Insights.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <Circle ref={div3Ref}>
                <Icons.database />
              </Circle>
              <div className="text-center">
                <h3 className="font-semibold text-sm mb-2">Get structured JSON you can plug into dashboards</h3>
                <p className="text-xs text-gray-600">Designed for BI, compliance, CRM, and automation flows.</p>
              </div>
            </div>
          </div>
        </div>
        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div2Ref}
          gradientStartColor="#ca6441"
          gradientStopColor="#ca6441"
        />
        <AnimatedBeam
          duration={3}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div3Ref}
          gradientStartColor="#ca6441"
          gradientStopColor="#ca6441"
        />
      </div>
    </div>
  );
};
const Icons = {
  upload: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  ),
  brain: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  ),
  database: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
};
export default Example;