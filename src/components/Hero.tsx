"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, lazy, Suspense } from "react";
import { useContactModal } from "@/components/ContactModal";
import {
  heroTextStagger,
  heroLine,
  chipSlideIn,
  fadeUp,
  staggerContainer,
  staggerItem,
  wordStagger,
  wordRevealItem,
} from "@/lib/motion";

const LazyPlayer = lazy(() =>
  import("@remotion/player").then((mod) => ({ default: mod.Player }))
);
const LazyDashboardVideo = lazy(() =>
  import("@/remotion/DashboardVideo").then((mod) => ({
    default: mod.DashboardVideo,
  }))
);

/* ── Dashboard player ─────────────────────────────────────── */
function DashboardPlayer() {
  return (
    <Suspense fallback={<div className="h-full w-full" style={{ backgroundColor: "#06060e" }} />}>
      <LazyPlayer
        component={LazyDashboardVideo}
        compositionWidth={1040}
        compositionHeight={760}
        durationInFrames={300}
        fps={30}
        loop
        autoPlay
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%", borderRadius: 20 }}
        controls={false}
      />
    </Suspense>
  );
}

/* ── Vivid glowing background orbs ───────────────────────── */
function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep dark base */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #0d1a2e 0%, #000000 60%)" }} />

      {/* Primary cyan glow — top center */}
      <div className="orb-slow absolute" style={{
        width: 900, height: 700,
        top: "-20%", left: "50%", transform: "translateX(-50%)",
        background: "radial-gradient(ellipse, rgba(6,182,212,0.35) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      {/* Purple glow — top right */}
      <div className="orb-medium absolute" style={{
        width: 700, height: 600,
        top: "-10%", right: "-10%",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)",
        filter: "blur(70px)",
      }} />

      {/* Blue accent — left */}
      <div className="orb-fast absolute" style={{
        width: 500, height: 500,
        top: "25%", left: "-10%",
        background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 65%)",
        filter: "blur(50px)",
      }} />

      {/* Subtle horizon glow at bottom of bg */}
      <div className="absolute" style={{
        width: "110%", height: 200,
        bottom: 0, left: "-5%",
        background: "linear-gradient(to top, rgba(6,182,212,0.06), transparent)",
      }} />
    </div>
  );
}

export default function Hero() {
  const { open } = useContactModal();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Scroll-driven 3D: player starts tilted and straightens as user scrolls */
  const playerRotateX = useTransform(scrollYProgress, [0, 0.4], [12, 0]);
  const playerScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1]);
  const playerY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  /* Hero text parallax — text moves up faster as user scrolls */
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto max-w-[980px] px-5">
        {/* Scrollable hero text block — fades and slides up on scroll */}
        <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }}>
          {/* Eyebrow chip */}
          <motion.div
            variants={chipSlideIn}
            initial="hidden"
            animate="visible"
            className="flex justify-center pt-28 pb-7"
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
              Introducing ShubhzSecure 2.0
            </span>
          </motion.div>

          {/* Headline — word-by-word 3D reveal */}
          <motion.div variants={wordStagger} initial="hidden" animate="visible" className="text-center">
            <h1 style={{
              fontSize: "clamp(3.2rem, 8vw, 6.4rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              fontWeight: 800,
            }}>
              {["Privacy", "Intelligence,"].map((word, i) => (
                <motion.span key={i} variants={wordRevealItem} className="inline-block mr-[0.25em]">
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span variants={wordRevealItem} className="inline-block">
                Redefined.
              </motion.span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mt-6 max-w-lg text-center text-[18px] leading-relaxed"
            style={{ color: "rgba(255,255,255,0.52)", fontWeight: 400 }}
          >
            AI-powered threat modeling, PII scanning across 22+ connectors,
            and automated compliance — all in one platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" className="mt-9 flex items-center justify-center gap-4">
            <motion.button
              onClick={open}
              whileHover={{ scale: 1.05, backgroundColor: "#06b6d4" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center rounded-full px-8 text-[15px] font-semibold text-white transition-colors duration-300 cursor-pointer"
              style={{ backgroundColor: "#06b6d4" }}
            >
              Get Started Free
            </motion.button>
            <motion.a
              href="#about"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex h-12 items-center gap-2 rounded-full border px-8 text-[15px] font-medium transition-all duration-300"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.75)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              See the platform
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-12 flex items-center justify-center gap-12">
            {[
              { value: "22+", label: "Cloud Connectors" },
              { value: "99.1%", label: "Detection Rate" },
              { value: "6", label: "Compliance Frameworks" },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={staggerItem} className="relative text-center">
                {i > 0 && (
                  <div className="absolute -left-6 top-1/2 h-6 w-px -translate-y-1/2" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
                )}
                <div className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[12px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dashboard Player — scroll-driven 3D perspective tilt */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative mt-14"
          style={{ perspective: 1400 }}
        >
          {/* Glow behind the player */}
          <div
            className="absolute inset-0 rounded-[24px] blur-3xl"
            style={{
              background: "radial-gradient(ellipse, rgba(6,182,212,0.25) 0%, rgba(139,92,246,0.15) 50%, transparent 80%)",
              transform: "scale(0.95) translateY(20px)",
              zIndex: -1,
            }}
          />

          <motion.div
            style={{
              rotateX: playerRotateX,
              scale: playerScale,
              y: playerY,
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative w-full overflow-hidden rounded-[20px]"
              style={{
                aspectRatio: "1040/760",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 60px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              <DashboardPlayer />
            </div>
          </motion.div>

          {/* Floating badge — Privacy Score */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
            className="absolute -top-5 right-6 z-20 rounded-2xl px-5 py-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="text-2xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
              94.2<span className="text-base" style={{ color: "#06b6d4" }}>%</span>
            </div>
            <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>Privacy Score</div>
          </motion.div>

          {/* Floating badge — Scan Complete */}
          <motion.div
            initial={{ opacity: 0, x: -16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
            className="absolute -bottom-4 left-6 z-20 flex items-center gap-3 rounded-xl px-4 py-3"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: "#10b981" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
            <div>
              <div className="text-[12px] font-semibold text-white">Scan Complete</div>
              <div className="text-[10px]" style={{ color: "rgba(255,255,255,0.45)" }}>2,341 PII fields detected</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Partner strip — on dark */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="relative z-10 mt-28 py-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-8 px-5">
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>Trusted by teams using</p>
          {["PostgreSQL", "AWS S3", "Azure Blob", "GCP", "MySQL", "Snowflake"].map((name) => (
            <span key={name} className="text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.01em" }}>
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
