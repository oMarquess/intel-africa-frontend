'use client';

import { PlaneTakeoff } from 'lucide-react';
import { FlipWords } from '@/components/ui/shadcn-io/flip-words';

const words = ["transcription", "translation", "insights"];

export function ApiSection() {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center w-full">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <h3 
                className="text-black dark:text-white font-bold"
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 2.0rem)',
                }}
              >
                Drop it into your stack —{' '}
                <FlipWords
                  words={words}
                  duration={3000}
                  letterDelay={0.5}
                  wordDelay={0.3}
                />
                
              </h3>
              {/* <PlaneTakeoff className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
