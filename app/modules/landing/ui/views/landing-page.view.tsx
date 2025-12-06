'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { LandingBanner } from '../components/landing-banner';
import { Ripple } from "@/components/ui/shadcn-io/ripple";
import { HeroText } from '../components/hero-text';
import { PartnerCarousel } from '../components/partner-carousel';
import { WhyIntelAfrica } from '../components/why-intel-africa';
import { ApiSection } from '../components/api-section';
import { FeaturesSection } from '../components/features-section';

export function LandingPageView() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Text moves faster and fades out
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);

  // Background moves slower (parallax effect)
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen">
      <LandingBanner />
      
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef} 
        className="relative h-screen flex flex-col bg-zinc-50 dark:bg-black overflow-hidden"
      >
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 container mx-auto px-4 text-center"
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
        </div>
        
        {/* Carousel at bottom of screen */}
        <div className="relative z-10 pb-8">
          <PartnerCarousel />
        </div>
      </section>

      {/* Content Sections */}
      <WhyIntelAfrica />
      
      <ApiSection />
      
      <FeaturesSection />
    </div>
  );
}
