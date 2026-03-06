"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, chipSlideIn, wordStagger, wordRevealItem } from "@/lib/motion";
import { testimonials } from "@/data/content";

const avatarColors = ["#6366f1", "#3b82f6", "#06b6d4"];

export default function TestimonialsSection() {
  const headlineWords = "Trusted by privacy teams".split(" ");
  const accentWords = "around the world.".split(" ");

  return (
    <section className="py-28 lg:py-40" style={{ backgroundColor: "#ffffff" }}>
      <div className="mx-auto max-w-[980px] px-5">

        {/* Label */}
        <motion.div variants={chipSlideIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5 text-center">
          <span className="text-[12px] font-medium uppercase tracking-widest" style={{ color: "#6e6e73" }}>
            Customer Stories
          </span>
        </motion.div>

        {/* Headline — word-by-word */}
        <motion.div
          variants={wordStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#1d1d1f", fontWeight: 700 }}>
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

        {/* Testimonial cards — staggered blur reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="flex flex-col rounded-[20px] p-7"
              style={{
                backgroundColor: "#f5f5f7",
                border: "1px solid rgba(0,0,0,0.04)",
              }}
            >
              {/* Open quote */}
              <div
                className="mb-4 text-5xl font-bold leading-none"
                style={{ color: avatarColors[i], fontFamily: "Georgia, serif", lineHeight: 0.8 }}
              >
                &ldquo;
              </div>

              <p className="mb-6 flex-1 text-[14px] leading-relaxed" style={{ color: "#1d1d1f" }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: avatarColors[i] }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: "#1d1d1f" }}>{t.name}</div>
                  <div className="text-[11px]" style={{ color: "#6e6e73" }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
