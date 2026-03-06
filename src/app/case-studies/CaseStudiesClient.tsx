"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import { useAnimatedCounter } from "@/lib/useAnimations";
import { useContactModal } from "@/components/ContactModal";
import {
  fadeUp,
  chipSlideIn,
  wordStagger,
  wordRevealItem,
  staggerContainer,
  staggerItem,
  scaleIn,
} from "@/lib/motion";

/* ── Data ────────────────────────────────────────────────────── */

const caseStudies = [
  {
    id: "finserv",
    number: "01",
    tag: "Financial Services",
    title: "Enterprise PII Discovery at Scale",
    headline: "14 databases.\n99.1% accuracy.",
    description:
      "A Fortune 500 bank deployed ShubhzSecure's Privacy Scanner across their entire data infrastructure — PostgreSQL, Oracle, and Snowflake clusters holding 800M+ records. The ML ensemble classifier identified PII fields with 99.1% accuracy, cutting compliance audit preparation from months to days.",
    challenge:
      "Manual PII audits across 14 databases took 4 months per cycle. Sensitive fields were routinely missed, leading to regulatory exposure and failed audits.",
    solution:
      "ShubhzSecure's scanner connected to all 14 data sources in under an hour, running ML-powered classification with NER and pattern matching across 800M+ records simultaneously.",
    stats: [
      { value: 14, suffix: "", label: "Databases Scanned" },
      { value: 99.1, suffix: "%", label: "Detection Accuracy", decimals: 1 },
      { value: 80, suffix: "%", label: "Faster Audits" },
    ],
    capabilities: [
      "PostgreSQL & Oracle Connectors",
      "Snowflake Deep Scan",
      "ML Ensemble Classification",
      "Per-Field Risk Scoring",
      "Automated PII Tagging",
      "Audit-Ready Reports",
    ],
    accent: "#06b6d4",
    comingSoon: true,
  },
  {
    id: "healthcare",
    number: "02",
    tag: "Healthcare",
    title: "HIPAA Compliance in 30 Days",
    headline: "30 days.\nFull HIPAA readiness.",
    description:
      "A digital health startup with 2M patient records used ShubhzSecure's compliance automation to achieve full HIPAA readiness in under a month — replacing a 6-month manual process. AI-validated evidence collection and automated control mapping eliminated the guesswork from compliance.",
    challenge:
      "The team estimated 6+ months for HIPAA readiness using spreadsheets and manual evidence gathering. Their small security team couldn't keep up with the 45+ control requirements.",
    solution:
      "ShubhzSecure's compliance module automatically mapped existing infrastructure to HIPAA controls, generated evidence documents, and flagged gaps — reducing the workload by 6x.",
    stats: [
      { value: 30, suffix: "", label: "Days to Compliance" },
      { value: 6, suffix: "x", label: "Faster than Manual" },
      { value: 100, suffix: "%", label: "HIPAA Coverage" },
    ],
    capabilities: [
      "HIPAA Control Mapping",
      "AI Evidence Validation",
      "Gap Analysis Dashboard",
      "PDF Report Generation",
      "Badge Certification",
      "Continuous Monitoring",
    ],
    accent: "#10b981",
    comingSoon: true,
  },
  {
    id: "saas",
    number: "03",
    tag: "SaaS Platform",
    title: "Multi-Cloud Privacy Scanning",
    headline: "3 clouds.\nZero blind spots.",
    description:
      "A B2B SaaS company operating across AWS, Azure, and GCP deployed ShubhzSecure to unify their privacy posture. The platform scanned 200+ cloud resources simultaneously — mapping data flows, detecting misconfigurations, and generating compliance evidence for SOC 2 and GDPR audits.",
    challenge:
      "Security visibility was fragmented across three cloud providers. Each had different tools, different dashboards, and different compliance evidence formats — creating dangerous blind spots.",
    solution:
      "ShubhzSecure's multi-cloud scanner unified all three environments into a single privacy topology view with LINDDUN threat mapping and automated compliance evidence collection.",
    stats: [
      { value: 3, suffix: "", label: "Cloud Providers" },
      { value: 200, suffix: "+", label: "Resources Scanned" },
      { value: 12, suffix: "", label: "Gaps Found & Fixed" },
    ],
    capabilities: [
      "AWS S3 & IAM Scanning",
      "Azure Blob & AD Analysis",
      "GCS & Cloud Audit Logs",
      "Unified Topology View",
      "LINDDUN Threat Mapping",
      "SOC 2 & GDPR Evidence",
    ],
    accent: "#8b5cf6",
    comingSoon: true,
  },
];

const heroStats = [
  { value: 3, suffix: "", label: "Industries" },
  { value: 99, suffix: "%", label: "Avg. Accuracy" },
  { value: 80, suffix: "%", label: "Faster Compliance" },
  { value: 200, suffix: "+", label: "Resources Scanned" },
];

/* ── Animated stat (hero) ──────────────────────────────────── */
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

/* ── Inline animated stat (inside case study) ──────────────── */
function CaseStat({ target, suffix, label, accent, decimals = 0 }: {
  target: number; suffix: string; label: string; accent: string; decimals?: number;
}) {
  const { ref, display } = useAnimatedCounter(target, 2, decimals);
  return (
    <motion.div variants={staggerItem}>
      <TiltCard className="h-full" tiltIntensity={14} scaleHover={1.04} borderRadius={16} darkMode>
        <div className="flex h-full flex-col items-center justify-center rounded-2xl p-6"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-3xl font-bold lg:text-4xl" style={{ color: accent, letterSpacing: "-0.03em" }}>
            <span ref={ref}>{display}</span>{suffix}
          </div>
          <div className="mt-1.5 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

/* ── Individual case study section (alternating layout) ────── */
function CaseStudyBlock({ study, index }: {
  study: typeof caseStudies[0]; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isEven = index % 2 === 0;

  const headlineLines = study.headline.split("\n");

  return (
    <section
      ref={ref}
      className="relative overflow-x-hidden py-28 lg:py-40"
      style={{ backgroundColor: isEven ? "#000000" : "#f5f5f7" }}
    >
      {/* Accent glow — dark sections only */}
      {isEven && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: bgOpacity }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 600, height: 600,
              background: `radial-gradient(circle, ${study.accent}12 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
        </motion.div>
      )}

      <div className="relative z-10 mx-auto max-w-[980px] px-5">
        {/* Number + tag */}
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
              backgroundColor: `${study.accent}18`,
              color: study.accent,
              border: `1px solid ${study.accent}30`,
            }}
          >
            {study.number}
          </span>
          <span
            className="text-[12px] font-semibold uppercase tracking-widest"
            style={{ color: isEven ? "rgba(255,255,255,0.35)" : "#6e6e73" }}
          >
            {study.tag}
          </span>
          {study.comingSoon && (
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: isEven ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                color: isEven ? "rgba(255,255,255,0.3)" : "#a1a1a6",
                border: isEven ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.06)",
              }}
            >
              Coming Soon
            </span>
          )}
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
          className="mx-auto mb-16 max-w-2xl text-center text-[17px] leading-relaxed"
          style={{ color: isEven ? "rgba(255,255,255,0.45)" : "#6e6e73" }}
        >
          {study.description}
        </motion.p>

        {/* Stats row — animated counters in TiltCards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-3 gap-3"
        >
          {study.stats.map((stat) => (
            <CaseStat
              key={stat.label}
              target={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              accent={study.accent}
              decimals={stat.decimals ?? 0}
            />
          ))}
        </motion.div>

        {/* Challenge & Solution — side by side */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <motion.div variants={staggerItem}>
            <TiltCard className="h-full" tiltIntensity={10} scaleHover={1.03} borderRadius={20} darkMode={isEven}>
              <div className="h-full rounded-[20px] p-7"
                style={{
                  backgroundColor: isEven ? "rgba(255,255,255,0.03)" : "#ffffff",
                  border: isEven ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                }}>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#ef444418" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: isEven ? "rgba(255,255,255,0.7)" : "#1d1d1f" }}>
                    The Challenge
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: isEven ? "rgba(255,255,255,0.4)" : "#6e6e73" }}>
                  {study.challenge}
                </p>
              </div>
            </TiltCard>
          </motion.div>

          <motion.div variants={staggerItem}>
            <TiltCard className="h-full" tiltIntensity={10} scaleHover={1.03} borderRadius={20} darkMode={isEven}>
              <div className="h-full rounded-[20px] p-7"
                style={{
                  backgroundColor: isEven ? "rgba(255,255,255,0.03)" : "#ffffff",
                  border: isEven ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                }}>
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${study.accent}18` }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={study.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span className="text-[13px] font-semibold" style={{ color: isEven ? "rgba(255,255,255,0.7)" : "#1d1d1f" }}>
                    The Solution
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed" style={{ color: isEven ? "rgba(255,255,255,0.4)" : "#6e6e73" }}>
                  {study.solution}
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>

        {/* Capabilities grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          {study.capabilities.map((cap) => (
            <motion.div key={cap} variants={staggerItem}>
              <TiltCard className="h-full" tiltIntensity={14} scaleHover={1.04} borderRadius={16} darkMode={isEven}>
                <div className="h-full rounded-2xl p-5"
                  style={{
                    backgroundColor: isEven ? "rgba(255,255,255,0.04)" : "#ffffff",
                    border: isEven ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  }}>
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${study.accent}18` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ stroke: study.accent }}>
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

/* ── Main page ───────────────────────────────────────────────── */
export default function CaseStudiesPage() {
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
            <pattern id="csGrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#csGrid)" />
        </svg>

        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[980px] px-5">
          <div className="pb-16 pt-20 lg:pb-24 lg:pt-28">
            {/* Label chip */}
            <motion.div
              variants={chipSlideIn}
              initial="hidden"
              animate="visible"
              className="mb-6 flex justify-center"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold"
                style={{
                  backgroundColor: "rgba(139,92,246,0.12)",
                  color: "#8b5cf6",
                  border: "1px solid rgba(139,92,246,0.3)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: "#8b5cf6" }}
                />
                Case Studies
              </span>
            </motion.div>

            {/* Headline — word-by-word */}
            <motion.div
              variants={wordStagger}
              initial="hidden"
              animate="visible"
              className="text-center"
            >
              <h1
                style={{
                  fontSize: "clamp(3rem, 7vw, 5.5rem)",
                  lineHeight: 1.03,
                  letterSpacing: "-0.035em",
                  color: "#ffffff",
                  fontWeight: 800,
                }}
              >
                {["Real", "results."].map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordRevealItem}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {["Real", "impact."].map((word, i) => (
                  <motion.span
                    key={`b-${i}`}
                    variants={wordRevealItem}
                    className="inline-block mr-[0.25em]"
                    style={{
                      background: "linear-gradient(90deg, #8b5cf6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
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
              See how teams across financial services, healthcare, and SaaS are using
              ShubhzSecure to transform their privacy operations.
            </motion.p>

            {/* Hero stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mt-14 grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-center sm:gap-12 lg:gap-16"
            >
              {heroStats.map((stat) => (
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

      {/* ── Case study sections (alternating dark/light) ── */}
      {caseStudies.map((study, i) => (
        <CaseStudyBlock key={study.id} study={study} index={i} />
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
                  style={{ width: 500, height: 500, background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)", filter: "blur(40px)" }} />

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
                      {"Ready to write your".split(" ").map((w, i) => (
                        <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.25em]">{w}</motion.span>
                      ))}
                      <br />
                      {"own success story?".split(" ").map((w, i) => (
                        <motion.span key={`b-${i}`} variants={wordRevealItem} className="inline-block mr-[0.25em]"
                          style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
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
                    className="mt-8 flex flex-wrap justify-center gap-3"
                  >
                    {["Financial Services", "Healthcare", "SaaS", "Enterprise"].map((tag) => (
                      <span key={tag} className="rounded-full px-4 py-1.5 text-[12px] font-medium"
                        style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.04)" }}>
                        {tag}
                      </span>
                    ))}
                  </motion.div>

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
