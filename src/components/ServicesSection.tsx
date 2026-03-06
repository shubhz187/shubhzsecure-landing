"use client";

import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp, chipSlideIn, wordStagger, wordRevealItem } from "@/lib/motion";
import { services } from "@/data/content";
import TiltCard from "@/components/TiltCard";

/* ── Service icons ────────────────────────────────────────── */
const icons: Record<string, React.ReactNode> = {
  dashboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="4" rx="1.5" />
      <rect x="14" y="10" width="7" height="11" rx="1.5" />
      <rect x="3" y="13" width="7" height="8" rx="1.5" />
    </svg>
  ),
  scanner: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  compliance: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const accentColors: Record<string, string> = {
  dashboard: "#06b6d4",
  scanner: "#8b5cf6",
  compliance: "#10b981",
};

const tags: Record<string, string[]> = {
  dashboard: ["Threat Modeling", "Risk Scoring", "Real-time"],
  scanner: ["ML-Powered", "22+ Sources", "PII/SPI"],
  compliance: ["GDPR", "CCPA", "HIPAA"],
};

export default function ServicesSection() {
  const headlineWords1 = "Three pillars.".split(" ");
  const headlineWords2 = "One platform.".split(" ");

  return (
    <section id="services" className="py-28 lg:py-40" style={{ backgroundColor: "#000000" }}>
      <div className="mx-auto max-w-[980px] px-5">

        {/* Label */}
        <motion.div variants={chipSlideIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
            Platform Components
          </span>
        </motion.div>

        {/* Headline — word-by-word */}
        <motion.div
          variants={wordStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-4 text-center"
        >
          <h2 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#ffffff", fontWeight: 700 }}>
            {headlineWords1.map((word, i) => (
              <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
            <br />
            {headlineWords2.map((word, i) => (
              <motion.span
                key={`g-${i}`}
                variants={wordRevealItem}
                className="inline-block mr-[0.3em]"
                style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto mb-16 max-w-xl text-center text-[17px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
          Privacy threat modeling, intelligent scanning, and compliance automation
          — each deeply integrated, all from a unified dashboard.
        </motion.p>

        {/* 3D Tilt Cards — staggered reveal */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {services.map((service) => {
            const accent = accentColors[service.icon] ?? "#06b6d4";
            return (
              <motion.div key={service.title} variants={staggerItem}>
                <TiltCard className="h-full" style={{ minHeight: 360 }} borderRadius={20}>
                  <div className="flex h-full flex-col p-7" style={{ backgroundColor: "#0d0d14" }}>
                    {/* Accent top line */}
                    <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }} />

                    {/* Icon */}
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${accent}18`, color: accent }}>
                      {icons[service.icon]}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-[18px] font-semibold leading-tight" style={{ color: "#ffffff", letterSpacing: "-0.01em" }}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-5 flex-1 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {service.description}
                    </p>

                    {/* Tag chips */}
                    <div className="mb-5 flex flex-wrap gap-2">
                      {(tags[service.icon] ?? []).map((t) => (
                        <span key={t} className="rounded-full px-3 py-1 text-[11px] font-medium"
                          style={{ backgroundColor: `${accent}14`, color: accent, border: `1px solid ${accent}30` }}>
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Learn more */}
                    <a href={service.href} className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70" style={{ color: accent }}>
                      Learn more
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
