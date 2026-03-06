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

/* ── Shared window chrome for all mockups ──────────────── */
function WindowChrome({ title }: { title: string }) {
  return (
    <>
      <rect width="440" height="32" rx="16" fill="rgba(255,255,255,0.03)" />
      <rect y="16" width="440" height="16" fill="rgba(255,255,255,0.03)" />
      <circle cx="18" cy="16" r="4" fill="#ff5f57" opacity="0.8" />
      <circle cx="34" cy="16" r="4" fill="#febc2e" opacity="0.8" />
      <circle cx="50" cy="16" r="4" fill="#28c840" opacity="0.8" />
      <text x="220" y="20" fill="rgba(255,255,255,0.3)" fontSize="9" textAnchor="middle" fontFamily="system-ui" fontWeight="500">
        {title}
      </text>
    </>
  );
}

/* ── Dashboard: Architecture Diagram ───────────────────── */
function DashboardMockup() {
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
      <WindowChrome title="ShubhzSecure — Architecture (Auto-Generated)" />

      {/* USERS */}
      <rect x="16" y="68" width="95" height="48" rx="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" strokeWidth="1" />
      <text x="63" y="86" fill="#06b6d4" fontSize="9.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">USERS</text>
      <text x="63" y="102" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">External Entity</text>

      {/* WEB APP */}
      <rect x="170" y="50" width="105" height="54" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" strokeWidth="1" />
      <text x="222" y="72" fill="#8b5cf6" fontSize="10" textAnchor="middle" fontWeight="600" fontFamily="system-ui">WEB APP</text>
      <text x="222" y="88" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">React Frontend</text>

      {/* API GATEWAY */}
      <rect x="170" y="130" width="105" height="54" rx="10" fill="rgba(245,158,11,0.06)" stroke="#f59e0b" strokeWidth="1" />
      <text x="222" y="152" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="600" fontFamily="system-ui">API GATEWAY</text>
      <text x="222" y="168" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">FastAPI + Auth</text>

      {/* DATABASE */}
      <rect x="50" y="215" width="95" height="48" rx="10" fill="rgba(16,185,129,0.06)" stroke="#10b981" strokeWidth="1" />
      <text x="97" y="233" fill="#10b981" fontSize="9.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">DATABASE</text>
      <text x="97" y="249" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">Supabase</text>

      {/* AI ENGINE */}
      <rect x="180" y="215" width="105" height="48" rx="10" fill="rgba(239,68,68,0.06)" stroke="#ef4444" strokeWidth="1" />
      <text x="232" y="233" fill="#ef4444" fontSize="9.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">AI ENGINE</text>
      <text x="232" y="249" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">Multi-Provider</text>

      {/* PII SCANNER */}
      <rect x="320" y="130" width="105" height="54" rx="10" fill="rgba(6,182,212,0.06)" stroke="#06b6d4" strokeWidth="1" />
      <text x="372" y="152" fill="#06b6d4" fontSize="10" textAnchor="middle" fontWeight="600" fontFamily="system-ui">PII SCANNER</text>
      <text x="372" y="168" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">ML Classifier</text>

      {/* CLOUD */}
      <rect x="320" y="215" width="105" height="48" rx="10" fill="rgba(139,92,246,0.06)" stroke="#8b5cf6" strokeWidth="1" />
      <text x="372" y="233" fill="#8b5cf6" fontSize="9.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">CLOUD</text>
      <text x="372" y="249" fill="rgba(255,255,255,0.35)" fontSize="7.5" textAnchor="middle" fontFamily="system-ui">S3 / Azure / GCS</text>

      {/* Connections */}
      <line x1="111" y1="92" x2="170" y2="77" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="222" y1="104" x2="222" y2="130" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="197" y1="184" x2="127" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="232" y1="184" x2="232" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="275" y1="157" x2="320" y2="157" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />
      <line x1="372" y1="184" x2="372" y2="215" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrD)" />

      {/* Threat panel */}
      <rect x="16" y="285" width="408" height="82" rx="10" fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.12)" strokeWidth="1" />
      <text x="30" y="306" fill="#ef4444" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="0.05em">⚠ PRIVACY THREATS DETECTED</text>
      {[
        { label: "Linkability", level: "High", c: "#ef4444", w: 150, fill: 105 },
        { label: "Identifiability", level: "Medium", c: "#f59e0b", w: 110, fill: 77 },
        { label: "Non-repudiation", level: "Low", c: "#10b981", w: 65, fill: 45 },
      ].map((t, i) => (
        <g key={i}>
          <text x="30" y={325 + i * 18} fill="rgba(255,255,255,0.4)" fontSize="8.5" fontFamily="system-ui">{t.label}</text>
          <rect x="150" y={318 + i * 18} width={t.w} height="8" rx="4" fill="rgba(255,255,255,0.05)" />
          <rect x="150" y={318 + i * 18} width={t.fill} height="8" rx="4" fill={t.c} opacity="0.6" />
          <text x={157 + t.w} y={326 + i * 18} fill={t.c} fontSize="8" fontWeight="600" fontFamily="system-ui">{t.level}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Scanner: PII Scan Results ─────────────────────────── */
function ScannerMockup() {
  const scanRows = [
    { source: "users_db", type: "Email", confidence: 98, count: 14320, c: "#ef4444" },
    { source: "users_db", type: "Phone", confidence: 95, count: 11204, c: "#f59e0b" },
    { source: "payments_s3", type: "Credit Card", confidence: 99, count: 8541, c: "#ef4444" },
    { source: "health_blob", type: "SSN", confidence: 97, count: 3210, c: "#ef4444" },
    { source: "logs_gcs", type: "IP Address", confidence: 88, count: 45600, c: "#f59e0b" },
    { source: "analytics_pg", type: "Full Name", confidence: 92, count: 22100, c: "#10b981" },
  ];

  return (
    <svg viewBox="0 0 440 380" className="h-full w-full" fill="none">
      <defs>
        <pattern id="sgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="440" height="380" rx="16" fill="#0a0a14" />
      <rect width="440" height="380" rx="16" fill="url(#sgrid)" />
      <WindowChrome title="ShubhzSecure — PII Scanner Results" />

      {/* Scan status bar */}
      <rect x="16" y="44" width="408" height="32" rx="8" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
      <circle cx="32" cy="60" r="4" fill="#10b981" opacity="0.8" />
      <text x="44" y="63" fill="#10b981" fontSize="7.5" fontWeight="600" fontFamily="system-ui">SCAN COMPLETE</text>
      <text x="160" y="63" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="system-ui">6 sources · 104,975 records · 23.4s</text>

      {/* Table header */}
      <text x="24" y="98" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">SOURCE</text>
      <text x="140" y="98" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">PII TYPE</text>
      <text x="255" y="98" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">CONFIDENCE</text>
      <text x="370" y="98" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">COUNT</text>
      <line x1="16" y1="105" x2="424" y2="105" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Table rows */}
      {scanRows.map((row, i) => {
        const y = 120 + i * 30;
        return (
          <g key={i}>
            <rect x="16" y={y - 8} width="408" height="28" rx="6" fill={i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"} />
            <text x="24" y={y + 5} fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">{row.source}</text>
            <rect x="136" y={y - 4} width="60" height="16" rx="4" fill={`${row.c}12`} />
            <text x="166" y={y + 5} fill={row.c} fontSize="7" textAnchor="middle" fontWeight="600" fontFamily="system-ui">{row.type}</text>
            {/* Confidence bar */}
            <rect x="255" y={y - 1} width="60" height="6" rx="3" fill="rgba(255,255,255,0.05)" />
            <rect x="255" y={y - 1} width={60 * row.confidence / 100} height="6" rx="3" fill={row.c} opacity="0.6" />
            <text x="322" y={y + 5} fill={row.c} fontSize="6.5" fontWeight="600" fontFamily="system-ui">{row.confidence}%</text>
            <text x="370" y={y + 5} fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">{row.count.toLocaleString()}</text>
          </g>
        );
      })}

      {/* Summary panel */}
      <rect x="16" y="305" width="408" height="62" rx="10" fill="rgba(6,182,212,0.04)" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
      <text x="30" y="325" fill="#06b6d4" fontSize="7.5" fontWeight="700" fontFamily="system-ui" letterSpacing="0.05em">SCAN SUMMARY</text>
      {[
        { label: "Critical PII", value: "3 types", c: "#ef4444" },
        { label: "Medium Risk", value: "2 types", c: "#f59e0b" },
        { label: "Low Risk", value: "1 type", c: "#10b981" },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={30 + i * 140} cy="347" r="3.5" fill={s.c} opacity="0.7" />
          <text x={40 + i * 140} y="350" fill="rgba(255,255,255,0.4)" fontSize="7" fontFamily="system-ui">{s.label}:</text>
          <text x={100 + i * 140} y="350" fill={s.c} fontSize="7" fontWeight="600" fontFamily="system-ui">{s.value}</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Compliance: Framework Dashboard ───────────────────── */
function ComplianceMockup() {
  const frameworks = [
    { name: "GDPR", score: 87, status: "Passing", c: "#10b981" },
    { name: "CCPA", score: 92, status: "Passing", c: "#10b981" },
    { name: "HIPAA", score: 64, status: "In Progress", c: "#f59e0b" },
  ];

  const checks = [
    { item: "Data Processing Records (Art. 30)", status: "pass", framework: "GDPR" },
    { item: "DPIA Completed", status: "pass", framework: "GDPR" },
    { item: "Consent Management Active", status: "pass", framework: "GDPR" },
    { item: "Right to Erasure Workflow", status: "pass", framework: "CCPA" },
    { item: "Consumer Opt-Out Mechanism", status: "pass", framework: "CCPA" },
    { item: "PHI Encryption at Rest", status: "warn", framework: "HIPAA" },
    { item: "Access Audit Logging", status: "warn", framework: "HIPAA" },
    { item: "BAA Documentation", status: "fail", framework: "HIPAA" },
  ];

  return (
    <svg viewBox="0 0 440 380" className="h-full w-full" fill="none">
      <defs>
        <pattern id="cgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="440" height="380" rx="16" fill="#0a0a14" />
      <rect width="440" height="380" rx="16" fill="url(#cgrid)" />
      <WindowChrome title="ShubhzSecure — Compliance Dashboard" />

      {/* Framework score cards */}
      {frameworks.map((fw, i) => {
        const x = 16 + i * 140;
        return (
          <g key={i}>
            <rect x={x} y="44" width="128" height="62" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={x + 12} y="62" fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="700" fontFamily="system-ui">{fw.name}</text>
            <text x={x + 12} y="82" fill={fw.c} fontSize="18" fontWeight="800" fontFamily="system-ui">{fw.score}%</text>
            <rect x={x + 70} y="58" width="48" height="16" rx="4" fill={`${fw.c}15`} />
            <text x={x + 94} y="69" fill={fw.c} fontSize="6" textAnchor="middle" fontWeight="600" fontFamily="system-ui">{fw.status}</text>
            {/* Mini progress bar */}
            <rect x={x + 12} y="92" width="104" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
            <rect x={x + 12} y="92" width={104 * fw.score / 100} height="4" rx="2" fill={fw.c} opacity="0.6" />
          </g>
        );
      })}

      {/* Checklist header */}
      <text x="24" y="130" fill="rgba(255,255,255,0.25)" fontSize="6.5" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">COMPLIANCE CHECKS</text>
      <line x1="16" y1="137" x2="424" y2="137" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Checklist rows */}
      {checks.map((check, i) => {
        const y = 152 + i * 27;
        const statusColor = check.status === "pass" ? "#10b981" : check.status === "warn" ? "#f59e0b" : "#ef4444";
        const statusIcon = check.status === "pass" ? "✓" : check.status === "warn" ? "!" : "✗";
        return (
          <g key={i}>
            <rect x="16" y={y - 6} width="408" height="24" rx="5" fill={i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"} />
            {/* Status indicator */}
            <circle cx="30" cy={y + 5} r="6" fill={`${statusColor}15`} stroke={statusColor} strokeWidth="0.8" />
            <text x="30" y={y + 8} fill={statusColor} fontSize="6" textAnchor="middle" fontWeight="700" fontFamily="system-ui">{statusIcon}</text>
            {/* Item text */}
            <text x="44" y={y + 8} fill="rgba(255,255,255,0.55)" fontSize="7" fontFamily="system-ui">{check.item}</text>
            {/* Framework tag */}
            <rect x="350" y={y - 2} width="40" height="14" rx="3" fill="rgba(255,255,255,0.04)" />
            <text x="370" y={y + 7} fill="rgba(255,255,255,0.3)" fontSize="5.5" textAnchor="middle" fontWeight="600" fontFamily="system-ui">{check.framework}</text>
          </g>
        );
      })}

      {/* Overall score bar */}
      <rect x="16" y="370" width="408" height="1" rx="0.5" fill="rgba(255,255,255,0.06)" />
    </svg>
  );
}

/* ── Tab mockup selector ───────────────────────────────── */
const tabMockups = [DashboardMockup, ScannerMockup, ComplianceMockup];

/* ── Main Section ──────────────────────────────────────── */
export default function InsightSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const [activeTab, setActiveTab] = useState(0);

  const ActiveMockup = tabMockups[activeTab];

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
          {/* Left — Animated diagram that switches per tab */}
          <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <TiltCard tiltIntensity={10} scaleHover={1.02} borderRadius={20} darkMode>
              <div className="overflow-hidden rounded-[20px] relative" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ActiveMockup />
                  </motion.div>
                </AnimatePresence>
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
                  className="mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {insightArticle.date}
                  </span>
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
