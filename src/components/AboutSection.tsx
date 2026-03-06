"use client";

import { motion } from "framer-motion";
import { flipIn, staggerContainer, staggerItem, fadeUp, chipSlideIn, wordStagger, wordRevealItem } from "@/lib/motion";
import { useAnimatedCounter } from "@/lib/useAnimations";
import TiltCard from "@/components/TiltCard";

/* ── Animated stat block ─────────────────────────────────── */
function AnimatedStat({ target, suffix, label, desc, decimals = 0 }: {
  target: number; suffix: string; label: string; desc: string; decimals?: number;
}) {
  const { ref, display } = useAnimatedCounter(target, 2, decimals);
  return (
    <motion.div variants={staggerItem}>
      <TiltCard className="h-full" tiltIntensity={14} scaleHover={1.04} borderRadius={0} darkMode={false}>
        <div className="flex h-full flex-col justify-between p-8 lg:p-10" style={{ backgroundColor: "#ffffff" }}>
          <div>
            <div style={{ fontSize: "clamp(2.6rem, 4.5vw, 3.6rem)", fontWeight: 700, letterSpacing: "-0.04em", color: "#1d1d1f", lineHeight: 1 }}>
              <span ref={ref}>{display}</span>{suffix}
            </div>
            <div className="mt-2 text-[14px] font-semibold" style={{ color: "#1d1d1f" }}>{label}</div>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed" style={{ color: "#6e6e73" }}>{desc}</p>
        </div>
      </TiltCard>
    </motion.div>
  );
}

const stats = [
  { target: 22, suffix: "+", label: "Data Connectors", desc: "PostgreSQL, MySQL, S3, Azure, GCS, Snowflake, BigQuery and more" },
  { target: 99.1, suffix: "%", label: "ML Accuracy", desc: "Ensemble classifier for PII/SPI with NER and pattern matching", decimals: 1 },
  { target: 6, suffix: "", label: "Compliance Frameworks", desc: "GDPR, CCPA, SOC 2, ISO 27001, HIPAA, and PCI-DSS covered" },
  { target: 4, suffix: "", label: "AI Providers", desc: "Groq, DeepSeek, Claude, and Gemini working in orchestration" },
];

const pillars = [
  { label: "LINDDUN Framework", color: "#06b6d4" },
  { label: "NIST PRAM", color: "#8b5cf6" },
  { label: "FAIR-Privacy", color: "#10b981" },
  { label: "MITRE PANOPTIC", color: "#f59e0b" },
];

export default function AboutSection() {
  const headlineWords = "Privacy at the core.".split(" ");
  const accentWords = "Intelligence at the edge.".split(" ");

  return (
    <section id="about" className="py-28 lg:py-40" style={{ backgroundColor: "#f5f5f7" }}>
      <div className="mx-auto max-w-[980px] px-5">

        {/* Section label */}
        <motion.div variants={chipSlideIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 text-center">
          <span className="text-[12px] font-medium uppercase tracking-widest" style={{ color: "#6e6e73" }}>
            About ShubhzSecure
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal */}
        <motion.div
          variants={wordStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h2 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#1d1d1f",
            fontWeight: 700,
          }}>
            {headlineWords.map((word, i) => (
              <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
            <br />
            {accentWords.map((word, i) => (
              <motion.span key={`a-${i}`} variants={wordRevealItem} className="gradient-text-accent inline-block mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto mb-16 max-w-2xl text-center text-[17px] leading-relaxed"
          style={{ color: "#6e6e73" }}
        >
          ShubhzSecure combines multi-provider AI with ML-powered PII classification
          to scan databases, cloud storage, and APIs for sensitive data — generating
          architecture diagrams, threat models, and compliance reports from a single
          unified dashboard.
        </motion.p>

        {/* Framework pills */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20 flex flex-wrap items-center justify-center gap-3">
          {pillars.map((p) => (
            <motion.span key={p.label} variants={staggerItem} className="rounded-full px-5 py-2 text-[13px] font-medium"
              style={{ border: `1px solid ${p.color}40`, color: p.color, backgroundColor: `${p.color}10` }}>
              {p.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Big number stats grid — animated counters */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 gap-px lg:grid-cols-4"
          style={{ backgroundColor: "rgba(0,0,0,0.06)", borderRadius: 20, overflow: "hidden" }}
        >
          {stats.map((s) => (
            <AnimatedStat
              key={s.label}
              target={s.target}
              suffix={s.suffix}
              label={s.label}
              desc={s.desc}
              decimals={s.decimals ?? 0}
            />
          ))}
        </motion.div>

        {/* Bottom CTA link */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-12 flex justify-center">
          <a href="#services" className="inline-flex items-center gap-2 text-[15px] font-medium transition-opacity hover:opacity-70" style={{ color: "#06b6d4" }}>
            Explore the platform
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
