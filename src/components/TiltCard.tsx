"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltCard({
  children,
  className = "",
  style = {},
  tiltIntensity = 20,
  scaleHover = 1.03,
  borderRadius = 20,
  darkMode = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tiltIntensity?: number;
  scaleHover?: number;
  borderRadius?: number;
  darkMode?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -tiltIntensity, y: (cx - 0.5) * tiltIntensity });
    setShine({ x: cx * 100, y: cy * 100 });
  };

  const shineColor = darkMode ? "rgba(255,255,255," : "rgba(0,0,0,";

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: 900, ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
    >
      <motion.div
        className="relative h-full w-full overflow-hidden"
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? scaleHover : 1,
          boxShadow: hovered
            ? darkMode
              ? `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12), 0 1px 0 rgba(6,182,212,0.4) inset`
              : `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.06)`
            : darkMode
              ? "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)"
              : "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        style={{ borderRadius, transformStyle: "preserve-3d" }}
      >
        {/* Radial shine layer */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            borderRadius,
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, ${shineColor}${hovered ? "0.07" : "0"}) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
