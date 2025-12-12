'use client';

import Script from 'next/script';

export function WhyIntelAfrica() {
  return (
    <section id="why-intel-africa" className="w-full py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Text Content - Sticky on desktop */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-8 order-1">
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Why Intelligence Africa?
            </h2>
            
            {/* Business & Operations Benefits */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-primary" style={{ fontFamily: 'Doto, sans-serif' }}>
                Business & Operations Benefits
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Intelligence Africa delivers measurable improvements to your operations. Transcription accuracy increases by over 70% when processing African accents, directly enhancing call center quality assurance and agent evaluation. The platform automates monitoring workflows, compliance tracking, and reporting processes while providing real-time insights into customer sentiment and intent.
              </p>
            </div>

            {/* Developer Experience */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight text-primary" style={{ fontFamily: 'Doto, sans-serif' }}>
                Developer Experience
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our APIs are engineered for African infrastructure realities, with lightweight architecture optimized for limited bandwidth environments. Intelligence Africa integrates seamlessly as a direct replacement for existing speech-to-text and translation APIs. Full compatibility with popular development frameworks including Python, Node.js, Go, and FastAPI ensures smooth implementation. Enterprise-grade fine-tuning capabilities and access controls give technical teams the flexibility they need.
              </p>
            </div>
          </div>

          {/* Right: Spline 3D Scene - Appears after text on mobile */}
          <div className="lg:col-span-3 relative w-full h-[800px] rounded-lg overflow-hidden order-2">
            <Script 
              type="module" 
              src="https://unpkg.com/@splinetool/viewer@1.9.28/build/spline-viewer.js"
            />
            <spline-viewer 
              url="/cloner_cube_binary.spline"
              className="w-full h-full pointer-events-none"
              logo={false}
              background="transparent"
            />
            {/* Cover for Spline logo at bottom-right */}
            <div className="absolute bottom-0 right-0 w-40 h-16 bg-background z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
