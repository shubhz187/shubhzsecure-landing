"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { featureCategories, featureStats } from "@/data/features";
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  chipSlideIn,
  wordStagger,
  wordRevealItem,
  scaleIn,
} from "@/lib/motion";
import { useAnimatedCounter } from "@/lib/useAnimations";
import TiltCard from "@/components/TiltCard";
import { useContactModal } from "@/components/ContactModal";

/* ── Animated stat ─────────────────────────────────────────── */
function AnimatedStat({ target, suffix, label }: {
  target: number; suffix: string; label: string;
}) {
  const { ref, display } = useAnimatedCounter(target, 2);
  return (
    <motion.div variants={staggerItem} className="text-center">
      <div className="text-3xl font-bold lg:text-4xl" style={{ color: "#ffffff", letterSpacing: "-0.03em" }}>
        <span ref={ref}>{display}</span>{suffix}
      </div>
      <div className="mt-1 text-[12px]" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
    </motion.div>
  );
}

/* ── Individual feature section (alternating layout) ───────── */
function FeatureBlock({ feature, index }: {
  feature: typeof featureCategories[0]; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isEven = index % 2 === 0;

  const headlineLines = feature.headline.split("\n");

  return (
    <section
      ref={ref}
      className="relative overflow-x-hidden py-28 lg:py-40"
      style={{ backgroundColor: isEven ? "#000000" : "#f5f5f7" }}
    >
      {/* Subtle accent glow — only on dark sections */}
      {isEven && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: bgOpacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 600, height: 600,
              background: `radial-gradient(circle, ${feature.accent}12 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-[980px] px-5">
        {/* Number + label */}
        <motion.div
          variants={chipSlideIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold tabular-nums"
            style={{
              backgroundColor: `${feature.accent}18`,
              color: feature.accent,
              border: `1px solid ${feature.accent}30`,
            }}
          >
            {feature.number}
          </span>
          <span
            className="text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: isEven ? "rgba(255,255,255,0.35)" : "#6e6e73" }}
          >
            {feature.title}
          </span>
        </motion.div>

        {/* Headline — word-by-word */}
        <motion.div
          variants={wordStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-5 text-center"
        >
          <h2 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: isEven ? "#ffffff" : "#1d1d1f",
            fontWeight: 700,
          }}>
            {headlineLines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {line.split(" ").map((word, wi) => (
                  <motion.span
                    key={`${li}-${wi}`}
                    variants={wordRevealItem}
                    className="inline-block mr-[0.3em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-xl text-center text-[17px] leading-relaxed"
          style={{ color: isEven ? "rgba(255,255,255,0.45)" : "#6e6e73" }}
        >
          {feature.description}
        </motion.p>

        {/* Capabilities grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {feature.capabilities.map((cap) => (
            <motion.div key={cap} variants={staggerItem}>
              <TiltCard className="h-full" tiltIntensity={14} scaleHover={1.04} borderRadius={16} darkMode={isEven}>
                <div className="h-full rounded-2xl p-5"
                  style={{
                    backgroundColor: isEven ? "rgba(255,255,255,0.04)" : "#ffffff",
                    border: isEven
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${feature.accent}18` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ stroke: feature.accent }}>
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <div className="text-[13px] font-medium leading-snug"
                    style={{ color: isEven ? "rgba(255,255,255,0.75)" : "#1d1d1f" }}>
                    {cap}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main page ─────────────────────────────────────────────── */
export default function FeaturesPageClient() {
  const { open } = useContactModal();
  return (
    <main className="overflow-x-hidden">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="relative overflow-x-hidden pt-16"
        style={{ backgroundColor: "#000000" }}
      >
        {/* Background grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
          <defs>
            <pattern id="featGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#featGrid)" />
        </svg>

        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto max-w-[980px] px-5">
          <div className="pb-16 pt-20 lg:pb-24 lg:pt-28">
            {/* Label */}
            <motion.div
              variants={chipSlideIn}
              initial="hidden"
              animate="visible"
              className="mb-6 flex justify-center"
            >
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
                Platform Capabilities
              </span>
            </motion.div>

            {/* Headline — word-by-word */}
            <motion.div variants={wordStagger} initial="hidden" animate="visible" className="text-center">
              <h1 style={{
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                lineHeight: 1.03,
                letterSpacing: "-0.035em",
                color: "#ffffff",
                fontWeight: 800,
              }}>
                {["Everything", "your", "privacy"].map((word, i) => (
                  <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.25em]">
                    {word}
                  </motion.span>
                ))}
                <br />
                {["team", "needs."].map((word, i) => (
                  <motion.span key={`b-${i}`} variants={wordRevealItem} className="inline-block mr-[0.25em]">
                    {word}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-6 max-w-lg text-center text-[17px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Six integrated modules for privacy threat modeling, PII scanning,
              compliance automation, and AI-powered architecture — built for enterprise scale.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-14 grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-center sm:gap-12 lg:gap-16"
            >
              {featureStats.map((stat) => (
                <AnimatedStat
                  key={stat.label}
                  target={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </section>

      {/* ── Feature sections (alternating dark/light) ──── */}
      {featureCategories.map((feature, i) => (
        <FeatureBlock key={feature.id} feature={feature} index={i} />
      ))}

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <section className="px-5 py-12 lg:py-16" style={{ backgroundColor: "#000000" }}>
        <div className="mx-auto max-w-[980px]">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
          <TiltCard tiltIntensity={10} scaleHover={1.02} borderRadius={28}>
            <div className="relative overflow-hidden" style={{ minHeight: 420, borderRadius: 28 }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, #0d1117, #111827, #0d1117)" }} />

            {/* Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%)", filter: "blur(40px)" }} />

            <div className="relative z-10 flex min-h-[420px] flex-col items-center justify-center px-8 py-20 text-center">
              <motion.div
                variants={wordStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 4rem)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  fontWeight: 700,
                }}>
                  {"Ready to secure your".split(" ").map((w, i) => (
                    <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.25em]">{w}</motion.span>
                  ))}
                  <br />
                  {"privacy infrastructure?".split(" ").map((w, i) => (
                    <motion.span key={`b-${i}`} variants={wordRevealItem} className="inline-block mr-[0.25em]"
                      style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                    >{w}</motion.span>
                  ))}
                </h2>
              </motion.div>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Deploy ShubhzSecure in minutes. Connect your data sources, run your
                first privacy scan, and get actionable threat intelligence.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.button
                  onClick={open}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center gap-2 rounded-full px-8 text-[15px] font-medium cursor-pointer"
                  style={{ backgroundColor: "#ffffff", color: "#1d1d1f" }}
                >
                  Start Free Trial
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </motion.button>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center rounded-full px-8 text-[15px] font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                >
                  Back to Home
                </motion.a>
              </motion.div>
            </div>
            </div>
          </TiltCard>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
