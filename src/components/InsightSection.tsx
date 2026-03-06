"use client";

import { motion } from "framer-motion";
import { flipIn, staggerContainer, staggerItem, fadeUp, chipSlideIn, slideInLeft, slideInRight, wordStagger, wordRevealItem, scaleIn } from "@/lib/motion";
import { insightArticle, productFeatures } from "@/data/content";
import { useParallax } from "@/lib/useAnimations";
import TiltCard from "@/components/TiltCard";

/* ── Architecture Diagram Mockup (kept, restyled frame) ───── */
function DiagramMockup() {
  return (
    <svg viewBox="0 0 440 360" className="h-full w-full" fill="none">
      <rect width="440" height="360" rx="12" fill="#ffffff" />
      {/* Window bar */}
      <rect width="440" height="28" rx="12" fill="#f5f5f7" />
      <rect y="16" width="440" height="12" fill="#f5f5f7" />
      <circle cx="16" cy="14" r="4" fill="#ff5f57" />
      <circle cx="30" cy="14" r="4" fill="#febc2e" />
      <circle cx="44" cy="14" r="4" fill="#28c840" />
      <text x="220" y="17" fill="#a1a1a6" fontSize="7" textAnchor="middle" fontFamily="system-ui">ShubhzSecure — Architecture (Auto-Generated)</text>

      {/* DFD Nodes */}
      <rect x="16" y="60" width="90" height="44" rx="8" fill="#f5f5f7" stroke="#06b6d4" strokeWidth="1" />
      <text x="61" y="78" fill="#06b6d4" fontSize="7" textAnchor="middle" fontWeight="600" fontFamily="system-ui">USERS</text>
      <text x="61" y="92" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">External Entity</text>

      <rect x="170" y="44" width="100" height="50" rx="8" fill="#f5f5f7" stroke="#8b5cf6" strokeWidth="1" />
      <text x="220" y="66" fill="#8b5cf6" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">WEB APP</text>
      <text x="220" y="80" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">React Frontend</text>

      <rect x="170" y="120" width="100" height="50" rx="8" fill="#f5f5f7" stroke="#f59e0b" strokeWidth="1" />
      <text x="220" y="142" fill="#f59e0b" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">API GATEWAY</text>
      <text x="220" y="156" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">FastAPI + Auth</text>

      <rect x="50" y="200" width="90" height="44" rx="8" fill="#f5f5f7" stroke="#10b981" strokeWidth="1" />
      <text x="95" y="218" fill="#10b981" fontSize="7" textAnchor="middle" fontWeight="600" fontFamily="system-ui">DATABASE</text>
      <text x="95" y="232" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">Supabase</text>

      <rect x="180" y="200" width="100" height="44" rx="8" fill="#f5f5f7" stroke="#ef4444" strokeWidth="1" />
      <text x="230" y="218" fill="#ef4444" fontSize="7" textAnchor="middle" fontWeight="600" fontFamily="system-ui">AI ENGINE</text>
      <text x="230" y="232" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">Multi-Provider</text>

      <rect x="320" y="120" width="100" height="50" rx="8" fill="#f5f5f7" stroke="#06b6d4" strokeWidth="1" />
      <text x="370" y="142" fill="#06b6d4" fontSize="7.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">PII SCANNER</text>
      <text x="370" y="156" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">ML Classifier</text>

      <rect x="320" y="200" width="100" height="44" rx="8" fill="#f5f5f7" stroke="#8b5cf6" strokeWidth="1" />
      <text x="370" y="218" fill="#8b5cf6" fontSize="7" textAnchor="middle" fontWeight="600" fontFamily="system-ui">CLOUD</text>
      <text x="370" y="232" fill="#a1a1a6" fontSize="6" textAnchor="middle" fontFamily="system-ui">S3 / Azure / GCS</text>

      {/* Arrows */}
      <line x1="106" y1="82" x2="170" y2="69" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <line x1="220" y1="94" x2="220" y2="120" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <line x1="195" y1="170" x2="125" y2="200" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <line x1="230" y1="170" x2="230" y2="200" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <line x1="270" y1="145" x2="320" y2="145" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <line x1="370" y1="170" x2="370" y2="200" stroke="#d1d1d6" strokeWidth="1" markerEnd="url(#arr2)" />
      <defs>
        <marker id="arr2" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="#d1d1d6" />
        </marker>
      </defs>

      {/* Threat annotation */}
      <rect x="16" y="270" width="408" height="78" rx="8" fill="#f5f5f7" />
      <text x="28" y="290" fill="#ef4444" fontSize="7.5" fontWeight="600" fontFamily="system-ui">⚠ LINDDUN THREATS DETECTED</text>
      {[
        { label: "Linkability", level: "High", c: "#ef4444", w: 140 },
        { label: "Identifiability", level: "Medium", c: "#f59e0b", w: 100 },
        { label: "Non-repudiation", level: "Low", c: "#10b981", w: 60 },
      ].map((t, i) => (
        <g key={i}>
          <text x="28" y={308 + i * 16} fill="#6e6e73" fontSize="7" fontFamily="system-ui">{t.label}</text>
          <rect x="130" y={301 + i * 16} width={t.w} height="6" rx="3" fill={t.c} opacity="0.35" />
          <text x={136 + t.w} y={309 + i * 16} fill={t.c} fontSize="6.5" fontFamily="system-ui">{t.level}</text>
        </g>
      ))}
    </svg>
  );
}

export default function InsightSection() {
  const { ref: parallaxRef, y: diagramY } = useParallax([0, -40]);

  return (
    <section id="insights" className="py-28 lg:py-40" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="mx-auto max-w-[980px] px-5">

        {/* Label */}
        <motion.div variants={chipSlideIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 text-center">
          <span className="text-[12px] font-medium uppercase tracking-widest" style={{ color: "#6e6e73" }}>
            Platform Intelligence
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
          <h2 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1d1d1f", fontWeight: 700 }}>
            {"Limitless protection.".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto mb-20 max-w-xl text-center text-[17px] leading-relaxed" style={{ color: "#6e6e73" }}>
          {insightArticle.description}
        </motion.p>

        {/* Split layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — Diagram with parallax */}
          <div ref={parallaxRef}>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ y: diagramY }}
            >
              <div
                className="overflow-hidden rounded-[20px]"
                style={{ aspectRatio: "440/360", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)" }}
              >
                <DiagramMockup />
              </div>
            </motion.div>
          </div>

          {/* Right — Article + features (staggered reveal) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            {/* Category tabs */}
            <motion.div variants={staggerItem} className="mb-6 flex gap-3">
              {insightArticle.categories.map((cat, i) => (
                <span key={cat} className="rounded-full px-4 py-1.5 text-[12px] font-medium"
                  style={{
                    backgroundColor: i === 0 ? "#1d1d1f" : "transparent",
                    color: i === 0 ? "#ffffff" : "#6e6e73",
                    border: i === 0 ? "none" : "1px solid rgba(0,0,0,0.1)",
                  }}>
                  {cat}
                </span>
              ))}
            </motion.div>

            <motion.h3 variants={staggerItem} className="mb-4 text-[20px] font-bold leading-snug" style={{ color: "#1d1d1f", letterSpacing: "-0.02em" }}>
              {insightArticle.title}
            </motion.h3>

            {/* Feature grid — each card staggers in */}
            {productFeatures.slice(0, 4).map((feat) => (
              <motion.div key={feat.label} variants={staggerItem} className="mb-3">
                <TiltCard tiltIntensity={12} scaleHover={1.03} borderRadius={16} darkMode={false}>
                  <div className="p-4"
                    style={{ backgroundColor: "#ffffff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16 }}>
                    <div className="mb-1 text-[13px] font-semibold" style={{ color: "#1d1d1f" }}>{feat.label}</div>
                    <div className="text-[11px] leading-snug" style={{ color: "#6e6e73" }}>{feat.description}</div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

            <motion.div variants={staggerItem} className="flex items-center justify-between pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <span className="text-[12px]" style={{ color: "#a1a1a6" }}>{insightArticle.date}</span>
              <a href="#" className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: "#06b6d4" }}>
                View Full Docs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
