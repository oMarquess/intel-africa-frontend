'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LandingBanner } from '../components/landing-banner';
import { Ripple } from "@/components/ui/shadcn-io/ripple";
import { HeroText } from '../components/hero-text';
import { PartnerCarousel } from '../components/partner-carousel';

export function LandingPageView() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Text moves faster (1.5x) and fades out
  const textY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Background moves slower (0.3x)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="flex min-h-screen flex-col">
      <LandingBanner />
      
      <main ref={ref} className="relative flex flex-1 items-center justify-center bg-zinc-50 dark:bg-black overflow-hidden">
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 container mx-auto px-4 text-center -mt-50"
        >
          <HeroText />
        </motion.div>
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0"
        >
          <Ripple 
            mainCircleSize={200}
            mainCircleOpacity={0.2}
            numCircles={6}
          />
        </motion.div>
      </main>

      <PartnerCarousel />
    </div>
  );
}
