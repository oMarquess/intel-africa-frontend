"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

export const PointerHighlight = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative inline-block"
    >
      <motion.span
        className="pointer-events-none absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          x: xSpring,
          y: ySpring,
        }}
      />
      <span className="relative z-10 inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {children}
      </span>
    </span>
  );
};
