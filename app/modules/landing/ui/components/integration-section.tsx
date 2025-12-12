'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Copy, Terminal } from 'lucide-react';

const CODE_SNIPPET = `import dlp_ai

# Initialize the client
client = dlp_ai.Client(api_key="dlp_rw_...")

# Transcribe African audio with native precision
response = client.audio.transcribe(
    file="swahili_meeting_recording.mp3",
    model="whisper-v3-africa",
    language="sw"
)

# Access accurate, localized text
print(response.text)
# Output: "Habari za asubuhi, karibuni kwenye mkutano..."
`;

export function IntegrationSection() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(CODE_SNIPPET);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="w-full py-24 bg-zinc-950 text-white overflow-hidden relative">
            {/* Dynamic Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />

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

                            <p className="text-lg text-zinc-400 max-w-lg leading-relaxed">
                                Our APIs are designed for simplicity. Drop few lines of code into your Python, Node, or Go application and instantly unlock high-fidelity African voice intelligence.
                            </p>

                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
                                    Read Documentation
                                </button>
                              
                            </div>
                        </div>

                        {/* Right Column: Code Demo */}
                        <div className="flex-1 w-full max-w-2xl">
                            <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">

                                {/* Window Header */}
                                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                    </div>
                                    <div className="text-xs text-zinc-500 font-mono">example.py</div>
                                    <div className="w-8" /> {/* Spacer for centering */}
                                </div>

                                {/* Code Content */}
                                <div className="p-6 overflow-x-auto">
                                    <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
                                        <code>
                                            <span className="text-purple-400">import</span> dlp_ai{'\n\n'}
                                            <span className="text-zinc-500"># Initialize the client</span>{'\n'}
                                            client = dlp_ai.Client(api_key=<span className="text-yellow-300">"dlp_rw_..."</span>){'\n\n'}
                                            <span className="text-zinc-500"># Transcribe African audio with native precision</span>{'\n'}
                                            response = client.audio.transcribe({'\n'}
                                            {'    '}file=<span className="text-green-400">"swahili_meeting.mp3"</span>,{'\n'}
                                            {'    '}model=<span className="text-green-400">"whisper-v3-africa"</span>,{'\n'}
                                            {'    '}language=<span className="text-green-400">"sw"</span>{'\n'}
                                            ){'\n\n'}
                                            <span className="text-zinc-500"># Access accurate, localized text</span>{'\n'}
                                            <span className="text-blue-400">print</span>(response.text){'\n'}
                                            <span className="text-zinc-500"># Output: "Habari za asubuhi, karibuni kwenye mkutano..."</span>
                                        </code>
                                    </pre>
                                </div>

                                {/* Copy Button */}
                                <button
                                    onClick={handleCopy}
                                    className="absolute top-14 right-4 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all"
                                    aria-label="Copy code"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
