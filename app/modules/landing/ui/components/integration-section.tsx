'use client';

import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { BackgroundGradientAnimation } from '@/components/ui/shadcn-io/background-gradient-animation';
import type { BundledLanguage } from '@/components/kibo-ui/code-block';
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from '@/components/kibo-ui/code-block';

const codeExamples = [
  {
    language: "python",
    filename: "example.py",
    code: `import requests

# Transcribe African audio with native precision
with open("swahili_meeting_recording.mp3", "rb") as audio_file:
    response = requests.post(
        "https://api.intelafrica.com/v1/stt/transcribe",
        headers={"Authorization": "Bearer YOUR_API_KEY"},
        files={"file": audio_file},
        data={"model": "intel-griot"}
    )

# Access accurate, localized text
result = response.json()
print(result["text"])
# Output: "Habari za asubuhi, karibuni kwenye mkutano..."`,
  },
  {
    language: "javascript",
    filename: "example.js",
    code: `const formData = new FormData()
formData.append("file", audioFile)
formData.append("model", "intel-griot")

const response = await fetch(
  "https://api.intelafrica.com/v1/stt/transcribe",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: formData
  }
)

const data = await response.json()
console.log(data.text)
// Output: "Habari za asubuhi, karibuni kwenye mkutano..."`,
  },
  {
    language: "bash",
    filename: "curl",
    code: `curl https://api.intelafrica.com/v1/stt/transcribe \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@swahili_meeting.mp3" \\
  -F "model=intel-griot"`,
  },
];

export function IntegrationSection() {

    return (
        <section className="w-full py-24 text-white overflow-hidden relative">
            <BackgroundGradientAnimation
                gradientBackgroundStart="rgb(15, 23, 42)"
                gradientBackgroundEnd="rgb(0, 0, 0)"
                firstColor="18, 113, 255"
                secondColor="221, 74, 255"
                thirdColor="100, 220, 255"
                fourthColor="200, 50, 50"
                fifthColor="180, 180, 50"
                pointerColor="140, 100, 255"
                blendingValue="hard-light"
                interactive={true}
                containerClassName="!absolute inset-0 !h-full !w-full"
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex flex-col lg:flex-row items-center gap-16">

                        {/* Left Column: Text */}
                        <div className="flex-1 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                                <Terminal className="w-4 h-4" />
                                <span>Developer First</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">
                                Integrate in minutes, <br />
                                <span className="text-zinc-400">Scale globally.</span>
                            </h2>

                            <p className="text-lg text-white/90 max-w-lg leading-relaxed drop-shadow-lg">
                                Our APIs are designed for simplicity. Drop few lines of code into your Python, Node, or Go application and instantly unlock high-fidelity African voice intelligence.
                            </p>

                            <div className="flex gap-4">
                                <a href="/coming-soon" className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors inline-block">
                                    Read Documentation
                                </a>
                              
                            </div>
                        </div>

                        {/* Right Column: Code Demo */}
                        <div className="flex-1 w-full max-w-2xl">
                            <CodeBlock data={codeExamples} defaultValue={codeExamples[0].language} className="[&_.text-foreground]:!text-white [&_.text-muted-foreground]:!text-white [&_button]:!text-white [&_svg]:!text-white">
                                <CodeBlockHeader>
                                    <CodeBlockSelect>
                                        <CodeBlockSelectTrigger>
                                            <CodeBlockSelectValue />
                                        </CodeBlockSelectTrigger>
                                        <CodeBlockSelectContent>
                                            {(item) => (
                                                <CodeBlockSelectItem key={item.language} value={item.language}>
                                                    {item.language}
                                                </CodeBlockSelectItem>
                                            )}
                                        </CodeBlockSelectContent>
                                    </CodeBlockSelect>
                                    <CodeBlockCopyButton />
                                </CodeBlockHeader>
                                <CodeBlockBody>
                                    {(item) => (
                                        <CodeBlockItem key={item.language} value={item.language}>
                                            <CodeBlockContent language={item.language as BundledLanguage}>
                                                {item.code}
                                            </CodeBlockContent>
                                        </CodeBlockItem>
                                    )}
                                </CodeBlockBody>
                            </CodeBlock>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
