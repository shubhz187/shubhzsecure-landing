"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, fadeUp, wordStagger, wordRevealItem } from "@/lib/motion";
import TiltCard from "@/components/TiltCard";
import { useContactModal } from "@/components/ContactModal";

export default function CTASection() {
  const { open } = useContactModal();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Parallax: bg shifts slightly on scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  // Grid opacity fades in as section enters
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0.2]);
  // Orb scale pulses subtly
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  const headlineWords1 = "Zero-Trust.".split("-");
  const headlineWords2 = "Zero Compromise.".split(" ");

  return (
    <section ref={ref} className="px-5 py-12 lg:py-16">
      <div className="mx-auto max-w-[980px]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
        <TiltCard style={{ minHeight: 480 }} tiltIntensity={10} scaleHover={1.02} borderRadius={28}>
          <div className="relative overflow-hidden" style={{ minHeight: 480, borderRadius: 28, isolation: "isolate" }}>
          {/* Deep dark background with parallax */}
          <motion.div
            style={{ y: bgY }}
            className="absolute -inset-4"
          >
            <div className="absolute -inset-4" style={{ background: "linear-gradient(145deg, #000000, #0a0a14, #050510)" }} />

            {/* Perspective grid floor — the 3D effect */}
            <motion.div
              className="perspective-grid absolute -inset-4"
              style={{
                transform: "perspective(800px) rotateX(30deg) scale(1.5) translateY(30%)",
                transformOrigin: "bottom center",
                opacity: gridOpacity,
              }}
            />

            {/* Soft glow orbs with scroll-driven scale */}
            <motion.div
              style={{ scale: orbScale }}
              className="absolute"
            >
              <div style={{ width: 500, height: 500, position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 65%)", filter: "blur(40px)" }} />
            </motion.div>
            <div className="absolute" style={{ width: 400, height: 400, bottom: "-10%", right: "-5%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex min-h-[480px] flex-col items-center justify-center px-8 py-20 text-center">
            {/* Headline — word-by-word */}
            <motion.div
              variants={wordStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  color: "#ffffff",
                  fontWeight: 700,
                }}
              >
                {headlineWords1.map((word, i) => (
                  <motion.span key={i} variants={wordRevealItem} className="inline-block">
                    {word}{i < headlineWords1.length - 1 ? "-" : ""}
                  </motion.span>
                ))}
                <br />
                {headlineWords2.map((word, i) => (
                  <motion.span
                    key={`g-${i}`}
                    variants={wordRevealItem}
                    className="inline-block mr-[0.25em]"
                    style={{ background: "linear-gradient(90deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              ShubhzSecure deploys in minutes. Connect your data sources, run your
              first privacy scan, and get actionable threat intelligence — all powered
              by multi-provider AI.
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-8 flex flex-wrap justify-center gap-2">
              {["Privacy Scoring", "Threat Modeling", "PII Scanner", "Auto Diagrams"].map((f) => (
                <motion.span key={f} variants={staggerItem} className="rounded-full px-4 py-1.5 text-[12px] font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.04)" }}>
                  {f}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-10">
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
            </motion.div>
          </div>
          </div>
        </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
