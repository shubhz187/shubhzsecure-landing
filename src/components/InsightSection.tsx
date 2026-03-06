"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  chipSlideIn,
  wordStagger,
  wordRevealItem,
  scaleIn,
} from "@/lib/motion";
import { insightArticle, insightTabFeatures } from "@/data/content";
import TiltCard from "@/components/TiltCard";

const featureAccents = ["#06b6d4", "#8b5cf6", "#10b981", "#f59e0b"];

/* ── Dark Architecture Diagram ─────────────────────────── */
function DarkDiagramMockup() {
  return (
    <svg viewBox="0 0 440 380" className="h-full w-full" fill="none">
      <defs>
        <marker id="arrD" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.2)" />
        </marker>
        <pattern id="dgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="440" height="380" rx="16" fill="#0a0a14" />
      <rect width="440" height="380" rx="16" fill="url(#dgrid)" />

      {/* Window bar */}
      <rect width="440" height="32" rx="16" fill="rgba(255,255,255,0.03)" />
      <rect y="16" width="440" height="16" fill="rgba(255,255,255,0.03)" />
      <circle cx="18" cy="16" r="4" fill="#ff5f57" opacity="0.8" />
      <circle cx="34" cy="16" r="4" fill="#febc2e" opacity="0.8" />
      <circle cx="50" cy="16" r="4" fill="#28c840" opacity="0.8" />
      <text x="220" y="19" fill="rgba(255,255,255,0.3)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui" fontWeight="500">
        ShubhzSecure — Architecture (Auto-Generated)
      </text>

      {/* USERS */}
      <rect x="16" y="68" width="95" height="48" rx="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" strokeWidth="1" />
      <text x="63" y="88" fill="#06b6d4" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">USERS</text>
      <text x="63" y="102" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">External Entity</text>

      {/* WEB APP */}
      <rect x="170" y="50" width="105" height="54" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" strokeWidth="1" />
      <text x="222" y="74" fill="#8b5cf6" fontSize="8" textAnchor="middle" fontWeight="600" fontFamily="system-ui">WEB APP</text>
      <text x="222" y="88" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">React Frontend</text>

      {/* API GATEWAY */}
      <rect x="170" y="130" width="105" height="54" rx="10" fill="rgba(245,158,11,0.06)" stroke="#f59e0b" strokeWidth="1" />
      <text x="222" y="154" fill="#f59e0b" fontSize="8" textAnchor="middle" fontWeight="600" fontFamily="system-ui">API GATEWAY</text>
      <text x="222" y="168" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">FastAPI + Auth</text>

      {/* DATABASE */}
      <rect x="50" y="215" width="95" height="48" rx="10" fill="rgba(16,185,129,0.06)" stroke="#10b981" strokeWidth="1" />
      <text x="97" y="235" fill="#10b981" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">DATABASE</text>
      <text x="97" y="249" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">Supabase</text>

      {/* AI ENGINE */}
      <rect x="180" y="215" width="105" height="48" rx="10" fill="rgba(239,68,68,0.06)" stroke="#ef4444" strokeWidth="1" />
      <text x="232" y="235" fill="#ef4444" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">AI ENGINE</text>
      <text x="232" y="249" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">Multi-Provider</text>

      {/* PII SCANNER */}
      <rect x="320" y="130" width="105" height="54" rx="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" strokeWidth="1" />
      <text x="372" y="154" fill="#06b6d4" fontSize="8" textAnchor="middle" fontWeight="600" fontFamily="system-ui">PII SCANNER</text>
      <text x="372" y="168" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">ML Classifier</text>

      {/* CLOUD */}
      <rect x="320" y="215" width="105" height="48" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" strokeWidth="1" />
      <text x="372" y="235" fill="#8b5cf6" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">CLOUD</text>
      <text x="372" y="249" fill="rgba(255,255,255,0.35)" fontSize="6" textAnchor="middle" fontFamily="system-ui">S3 / Azure / GCS</text>

      {/* Dashed connections */}
      <line x1="111" y1="92" x2="170" y2="77" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="222" y1="104" x2="222" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="197" y1="184" x2="127" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="232" y1="184" x2="232" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="275" y1="157" x2="320" y2="157" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="372" y1="184" x2="372" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />

      {/* Threat panel */}
      <rect x="16" y="285" width="408" height="82" rx="10" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.12)" strokeWidth="1" />
      <text x="30" y="306" fill="#ef4444" fontSize="7.5" fontWeight="700" fontFamily="system-ui" letterSpacing="0.05em">⚠ LINDDUN THREATS DETECTED</text>
      {[
        { label: "Linkability", level: "High", c: "#ef4444", w: 150, fill: 105 },
        { label: "Identifiability", level: "Medium", c: "#f59e0b", w: 110, fill: 77 },
        { label: "Non-repudiation", level: "Low", c: "#10b981", w: 65, fill: 45 },
      ].map((t, i) => (
        <g key={i}>
          <text x="30" y={324 + i * 17} fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="system-ui">{t.label}</text>
          <rect x="135" y={317 + i * 17} width={t.w} height="7" rx="3.5" fill="rgba(255,255,255,0.05)" />
          <rect x="135" y={317 + i * 17} width={t.fill} height="7" rx="3.5" fill={t.c} opacity="0.6" />
          <text x={142 + t.w} y={325 + i * 17} fill={t.c} fontSize="6.5" fontWeight="600" fontFamily="system-ui">{t.level}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Main Section ──────────────────────────────────────── */
export default function InsightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section ref={ref} id="insights" className="relative overflow-hidden py-28 lg:py-40" style={{ backgroundColor: "#000000" }}>
      {/* Grid texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
        <defs>
          <pattern id="insGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#insGrid)" />
      </svg>

      {/* Glow orbs */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ opacity: glowOpacity }}>
        <div
          className="absolute left-1/4 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2"
          style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)", filter: "blur(50px)" }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[980px] px-5">
        {/* Chip label */}
        <motion.div variants={chipSlideIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-6 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold"
            style={{
              backgroundColor: "rgba(6,182,212,0.12)",
              color: "#06b6d4",
              border: "1px solid rgba(6,182,212,0.3)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#06b6d4" }} />
            Platform Intelligence
          </span>
        </motion.div>

        {/* Headline — gradient accent */}
        <motion.div variants={wordStagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 text-center">
          <h2 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", fontWeight: 700 }}>
            <motion.span variants={wordRevealItem} className="inline-block mr-[0.3em]" style={{ color: "#ffffff" }}>
              Limitless
            </motion.span>
            <motion.span
              variants={wordRevealItem}
              className="inline-block"
              style={{
                background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              protection.
            </motion.span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-xl text-center text-[17px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {insightArticle.description}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Left — Dark Diagram */}
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <TiltCard tiltIntensity={10} scaleHover={1.02} borderRadius={20} darkMode>
              <div className="overflow-hidden rounded-[20px]" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <DarkDiagramMockup />
              </div>
            </TiltCard>
          </motion.div>

          {/* Right — Intelligence Panel */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TiltCard tiltIntensity={10} scaleHover={1.02} borderRadius={20} darkMode>
              <div
                className="flex h-full flex-col rounded-[20px] p-6 lg:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {/* Interactive tabs */}
                <motion.div variants={staggerItem} className="mb-6 flex gap-2">
                  {insightArticle.categories.map((cat, i) => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(i)}
                      className="rounded-full px-4 py-1.5 text-[12px] font-medium transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: activeTab === i ? "rgba(6,182,212,0.15)" : "transparent",
                        color: activeTab === i ? "#06b6d4" : "rgba(255,255,255,0.35)",
                        border: activeTab === i ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: activeTab === i ? "0 0 20px rgba(6,182,212,0.1)" : "none",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </motion.div>

                {/* Article title */}
                <motion.h3
                  variants={staggerItem}
                  className="mb-6 text-[20px] font-bold leading-snug"
                  style={{ color: "#ffffff", letterSpacing: "-0.02em" }}
                >
                  {insightArticle.title}
                </motion.h3>

                {/* Feature items — switch per active tab */}
                <div className="flex flex-1 flex-col gap-3 relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col gap-3"
                    >
                      {(insightTabFeatures[insightArticle.categories[activeTab]] ?? []).map((feat, i) => (
                        <div
                          key={feat.label}
                          className="group relative overflow-hidden rounded-xl p-4 transition-colors duration-300 hover:bg-[rgba(255,255,255,0.04)]"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderLeft: `3px solid ${featureAccents[i]}`,
                          }}
                        >
                          {/* Hover glow bleed */}
                          <div
                            className="pointer-events-none absolute -left-10 top-0 h-full w-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ background: `linear-gradient(90deg, ${featureAccents[i]}15, transparent)` }}
                          />
                          <div className="relative flex items-start gap-3">
                            <div
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                              style={{ backgroundColor: `${featureAccents[i]}15` }}
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{ stroke: featureAccents[i] }}
                              >
                                <polyline points="20,6 9,17 4,12" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>
                                {feat.label}
                              </div>
                              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {feat.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom bar */}
                <motion.div
                  variants={staggerItem}
                  className="mt-6 flex items-center justify-between pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {insightArticle.date}
                  </span>
                  <a
                    href="/docs"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-80"
                    style={{ color: "#06b6d4" }}
                  >
                    View Full Docs
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9,18 15,12 9,6" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
