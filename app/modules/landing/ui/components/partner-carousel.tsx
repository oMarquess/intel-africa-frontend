'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

const PARTNER_LOGOS = [
  { name: 'NVIDIA', src: '/NVIDIA_logo.svg' },
  { name: 'Hugging Face', src: '/hf.png' },
  { name: 'Modal', src: '/modal-only.png' },
  { name: 'DLP', src: '/dlp.svg' },
  // Duplicate for seamless loop
  { name: 'NVIDIA', src: '/NVIDIA_logo.svg' },
  { name: 'Hugging Face', src: '/hf.png' },
  { name: 'Modal', src: '/modal-only.png' },
  { name: 'DLP', src: '/dlp.svg' },
  // Duplicate for seamless loop
  { name: 'NVIDIA', src: '/NVIDIA_logo.svg' },
  { name: 'Hugging Face', src: '/hf.png' },
  { name: 'Modal', src: '/modal-only.png' },
  { name: 'DLP', src: '/dlp.svg' },
];

export function PartnerCarousel() {
  return (
    <section className="w-full py-2 bg-zinc-50 dark:bg-black">
      <div className="container mx-auto px-4">
        
        <div className="relative overflow-hidden">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 dark:from-black to-transparent z-10 pointer-events-none" />
          
          <motion.div
            className="flex gap-16 items-center"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {PARTNER_LOGOS.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={80}
                  height={30}
                  className="h-6 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
