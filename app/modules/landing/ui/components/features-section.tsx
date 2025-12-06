'use client';

import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams';
import { AudioWaveform, Languages, Headset, Code2 } from 'lucide-react';

export function FeaturesSection() {
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

            {/* 3 Columns Below */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-start">
              {/* Column 1 - Navigation */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: '#ca6441' }}></div>
                  <h4 className="text-sm font-semibold uppercase leading-tight tracking-wide">African Voice Recognition</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: '#ca6441' }}></div>
                  <h4 className="text-sm font-semibold uppercase leading-tight tracking-wide">Real-Time Translation</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: '#ca6441' }}></div>
                  <h4 className="text-sm font-semibold uppercase leading-tight tracking-wide">Call-Center Intelligence</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 flex-shrink-0" style={{ backgroundColor: '#ca6441' }}></div>
                  <h4 className="text-sm font-semibold uppercase leading-tight tracking-wide">Developer-Ready APIs</h4>
                </div>
              </div>

              {/* Column 2 - Content */}
              <div className="md:col-span-2 space-y-4 border-r border-b border-border/30 pr-8 pb-8">
                <h3 className="text-xl font-semibold">African Voice Recognition</h3>
                <p className="text-muted-foreground">
                  Our AI speech-to-text technology is specifically trained on African accents and dialects, delivering over 70% improvement in transcription accuracy compared to global alternatives. Perfect for call centers, customer service, and any business working with African voices.
                </p>
              </div>

              {/* Column 3 - Content */}
              <div className="md:col-span-3 space-y-4 flex items-center justify-center pl-8 border-b border-border/30 pb-8">
                <div className="flex items-center gap-0">
                  <AudioWaveform className="w-90 h-90 text-primary" strokeWidth={1.5} />
                  {/* <div className="w-8 h-0.5 bg-primary"></div>
                  <AudioWaveform className="w-60 h-60 text-primary" strokeWidth={1.5} /> */}
                </div>
              </div>

              {/* Row 2 - Empty Column 1 */}
              <div className="md:col-span-2 border-b border-border/30 pb-8"></div>

              {/* Row 2 - Real-Time Translation */}
              <div className="md:col-span-2 space-y-4 border-r border-b border-border/30 pr-8 pb-8 pt-8">
                <h3 className="text-xl font-semibold">Real-Time Translation</h3>
                <p className="text-muted-foreground">
                  Seamlessly translate conversations across multiple African languages in real-time. Our translation engine understands context, idioms, and cultural nuances, ensuring accurate communication for multilingual teams and customer interactions.
                </p>
              </div>

              {/* Row 2 - Column 3 - Translation Icon */}
              <div className="md:col-span-3 space-y-4 flex items-center justify-center pl-8 border-b border-border/30 pb-8 pt-8">
                <Languages className="w-90 h-90 text-primary" strokeWidth={1.5} />
              </div>

              {/* Row 3 - Empty Column 1 */}
              <div className="md:col-span-2 border-b border-border/30 pb-8"></div>

              {/* Row 3 - Call-Center Intelligence */}
              <div className="md:col-span-2 space-y-4 border-r border-b border-border/30 pr-8 pb-8 pt-8">
                <h3 className="text-xl font-semibold">Call-Center Intelligence</h3>
                <p className="text-muted-foreground">
                  Automate quality assurance, compliance tracking, and agent evaluation with AI-powered insights. Monitor customer sentiment, identify training opportunities, and generate actionable reports that improve service quality and operational efficiency.
                </p>
              </div>

              {/* Row 3 - Column 3 - Call Center Icon */}
              <div className="md:col-span-3 space-y-4 flex items-center justify-center pl-8 border-b border-border/30 pb-8 pt-8">
                <Headset className="w-90 h-90 text-primary" strokeWidth={1.5} />
              </div>

              {/* Row 4 - Empty Column 1 */}
              <div className="md:col-span-2"></div>

              {/* Row 4 - Developer-Ready APIs */}
              <div className="md:col-span-2 space-y-4 border-r border-border/30 pr-8 pt-8">
                <h3 className="text-xl font-semibold">Developer-Ready APIs</h3>
                <p className="text-muted-foreground">
                  Drop-in replacement for existing speech and translation APIs with full compatibility across Python, Node.js, Go, and FastAPI. Lightweight architecture optimized for African infrastructure, with enterprise-grade fine-tuning and access controls.
                </p>
              </div>

              {/* Row 4 - Column 3 - Developer APIs Icon */}
              <div className="md:col-span-3 space-y-4 flex items-center justify-center pl-8 pt-8">
                <Code2 className="w-90 h-90 text-primary" strokeWidth={1.5} />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
