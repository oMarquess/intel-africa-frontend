import { ColourfulText } from "@/components/ui/shadcn-io/colourful-text";

export function HeroText() {
  return (
    <div className="space-y-6">
      <h1 className="text-5xl font-bold tracking-tight text-foreground">
        AI that Understands{' '}
        <span className="inline-block">
          <ColourfulText
            text="Africa"
            interval={3000}
            animationDuration={0.7}
            colors={[
              "hsl(var(--primary))",
              "hsl(var(--chart-1))",
              "hsl(var(--chart-5))",
              "hsl(var(--ring))",
              "hsl(var(--accent))"
            ]}
            className="text-6xl font-extrabold drop-shadow-lg"
          />
        </span>
        {/* . Built for Your Business. */}
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Unlock accurate transcription, translation, and call-center intelligence across African accents, languages, and dialects — all with simple, powerful APIs.
      </p>
    </div>
  );
}
