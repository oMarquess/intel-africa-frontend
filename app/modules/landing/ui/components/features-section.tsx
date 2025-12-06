'use client';

import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams';
import { AudioWaveform, Languages, Headset, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const features = [
  {
    title: 'African Voice Recognition',
    description: 'Our AI speech-to-text technology is specifically trained on African accents and dialects, delivering over 70% improvement in transcription accuracy compared to global alternatives. Perfect for call centers, customer service, and any business working with African voices.',
    icon: AudioWaveform,
  },
  {
    title: 'Real-Time Translation',
    description: 'Seamlessly translate conversations across multiple African languages in real-time. Our translation engine understands context, idioms, and cultural nuances, ensuring accurate communication for multilingual teams and customer interactions.',
    icon: Languages,
  },
  {
    title: 'Call-Center Intelligence',
    description: 'Automate quality assurance, compliance tracking, and agent evaluation with AI-powered insights. Monitor customer sentiment, identify training opportunities, and generate actionable reports that improve service quality and operational efficiency.',
    icon: Headset,
  },
  {
    title: 'Developer-Ready APIs',
    description: 'Drop-in replacement for existing speech and translation APIs with full compatibility across Python, Node.js, Go, and FastAPI. Lightweight architecture optimized for African infrastructure, with enterprise-grade fine-tuning and access controls.',
    icon: Code2,
  },
];

export function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextFeature = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextFeature();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = features[currentIndex].icon;

  return (
    <section className="relative w-full py-24 bg-zinc-50 dark:bg-black overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="bg-background border-l-[20px] border-r-[20px] border-transparent px-8 py-12 rounded-lg">
          <div className="space-y-12">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Built to Help You Work Smarter
              </h2>
            </div>

            {/* Carousel Navigation - Horizontal Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wide transition-all duration-300 ${
                    currentIndex === index 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Carousel Content */}
            <div className="relative min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                >
                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">{features[currentIndex].title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {features[currentIndex].description}
                    </p>
                  </div>

                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    <CurrentIcon className="w-40 h-40 md:w-60 md:h-60 text-primary" strokeWidth={1.5} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevFeature}
                className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index ? 'bg-primary w-8' : 'bg-border'
                    }`}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextFeature}
                className="p-2 rounded-full border border-border hover:bg-accent transition-colors"
                aria-label="Next feature"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
