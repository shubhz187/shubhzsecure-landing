"use client";

import React, { useState, useRef, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyDUdQ60SEA2x46jYwp3Gg0DQs4enzD_HcIZiGu_aqemoj4uReYwIA3SsY6lDaDroke/exec";

/* ── Context ─────────────────────────────────────────────────── */
const ContactModalContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
}>({ open: () => {}, close: () => {}, isOpen: false });

export function useContactModal() {
  return useContext(ContactModalContext);
}

/* ── Provider ────────────────────────────────────────────────── */
export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <ContactModalOverlay isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}

/* ── Cinematic easing ────────────────────────────────────────── */
const easeCinematic = [0.16, 1, 0.3, 1] as const;

/* ── 3D Tilt logic (matches TiltCard) ────────────────────────── */
function useTilt(intensity: number = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width;
    const cy = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (cy - 0.5) * -intensity, y: (cx - 0.5) * intensity });
    setShine({ x: cx * 100, y: cy * 100 });
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => { setTilt({ x: 0, y: 0 }); setHovered(false); };

  return { ref, tilt, shine, hovered, onMouseMove, onEnter, onLeave };
}

/* ── Stagger variants ────────────────────────────────────────── */
const formStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const formItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeCinematic } },
};

/* ── Input component ─────────────────────────────────────────── */
function FormInput({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div variants={formItem} className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
        {label}
      </label>
      <input
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className="w-full rounded-xl px-4 py-3 text-[14px] font-medium text-white placeholder:text-white/20 outline-none transition-all duration-300"
        style={{
          backgroundColor: focused ? "rgba(6,182,212,0.06)" : "rgba(255,255,255,0.04)",
          border: focused ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: focused ? "0 0 20px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      />
    </motion.div>
  );
}

/* ── Textarea component ──────────────────────────────────────── */
function FormTextarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <motion.div variants={formItem} className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
        {label}
      </label>
      <textarea
        {...props}
        onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
        className="w-full rounded-xl px-4 py-3 text-[14px] font-medium text-white placeholder:text-white/20 outline-none transition-all duration-300 resize-none"
        style={{
          backgroundColor: focused ? "rgba(6,182,212,0.06)" : "rgba(255,255,255,0.04)",
          border: focused ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: focused ? "0 0 20px rgba(6,182,212,0.08), inset 0 1px 0 rgba(255,255,255,0.04)" : "inset 0 1px 0 rgba(255,255,255,0.02)",
        }}
      />
    </motion.div>
  );
}

/* ── Modal overlay + form ────────────────────────────────────── */
function ContactModalOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { ref: tiltRef, tilt, shine, hovered, onMouseMove, onEnter, onLeave } = useTilt(6);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus("success");
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus("idle"), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={handleClose}
        >
          {/* 3D Tilt container — matches TiltCard perspective */}
          <div
            ref={tiltRef}
            onMouseMove={onMouseMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            onClick={(e) => e.stopPropagation()}
            style={{ perspective: 900 }}
            className="w-full max-w-[440px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotateX: 12, y: 40, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: tilt.x,
                rotateY: tilt.y,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{ opacity: 0, scale: 0.92, y: 30, filter: "blur(6px)" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
                rotateX: { type: "spring", stiffness: 260, damping: 22 },
                rotateY: { type: "spring", stiffness: 260, damping: 22 },
              }}
              className="relative w-full overflow-hidden"
              style={{
                borderRadius: 24,
                transformStyle: "preserve-3d",
                backgroundColor: "#0d0d14",
                boxShadow: hovered
                  ? "0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1), 0 1px 0 rgba(6,182,212,0.3) inset, 0 0 80px rgba(6,182,212,0.04)"
                  : "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.04) inset",
              }}
            >
              {/* Radial shine layer — identical to TiltCard */}
              <div
                className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                style={{
                  borderRadius: 24,
                  background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${hovered ? "0.06" : "0"}) 0%, transparent 60%)`,
                  opacity: hovered ? 1 : 0,
                }}
              />

              {/* Accent gradient top line */}
              <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 2, background: "linear-gradient(90deg, transparent, #06b6d4, #8b5cf6, transparent)" }} />

              {/* Background glow orbs */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ borderRadius: 24 }}>
                <div
                  className="orb-slow absolute"
                  style={{
                    width: 300, height: 300,
                    top: "-15%", right: "-10%",
                    background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <div
                  className="orb-medium absolute"
                  style={{
                    width: 250, height: 250,
                    bottom: "-10%", left: "-5%",
                    background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
              </div>

              {/* Close button */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-5 z-30 flex h-8 w-8 items-center justify-center rounded-full cursor-pointer"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              {/* Content */}
              <div className="relative z-10 p-8 pt-9">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: easeCinematic }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    {/* Animated check circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                      className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))",
                        border: "1px solid rgba(16,185,129,0.25)",
                        boxShadow: "0 0 40px rgba(16,185,129,0.1)",
                      }}
                    >
                      <motion.svg
                        width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <polyline points="20,6 9,17 4,12" />
                      </motion.svg>
                    </motion.div>

                    <h3 className="mb-2 text-[22px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                      Request Received
                    </h3>
                    <p className="mb-8 max-w-[260px] text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                      Our team will reach out within 24 hours to get you started.
                    </p>
                    <motion.button
                      onClick={handleClose}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex h-11 items-center rounded-full px-7 text-[14px] font-semibold text-white cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                        boxShadow: "0 4px 20px rgba(6,182,212,0.25)",
                      }}
                    >
                      Done
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div variants={formStagger} initial="hidden" animate="visible">
                    {/* Header */}
                    <motion.div variants={formItem} className="mb-7">
                      <div className="mb-3 flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{
                            background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.12))",
                            border: "1px solid rgba(6,182,212,0.2)",
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-[18px] font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
                            Get Started
                          </h3>
                          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                            Start your privacy transformation
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <FormInput
                          label="Full Name"
                          name="name"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                        <FormInput
                          label="Work Email"
                          name="email"
                          type="email"
                          placeholder="jane@company.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <FormInput
                          label="Company"
                          name="company"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={handleChange}
                        />
                        <FormInput
                          label="Phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <FormTextarea
                        label="Message"
                        name="message"
                        placeholder="Tell us about your privacy and compliance needs..."
                        value={form.message}
                        onChange={handleChange}
                        rows={3}
                      />

                      {/* Submit */}
                      <motion.div variants={formItem} className="pt-1">
                        <motion.button
                          type="submit"
                          disabled={status === "sending"}
                          whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(6,182,212,0.3)" }}
                          whileTap={{ scale: 0.98 }}
                          className="relative w-full h-12 rounded-full text-[15px] font-semibold text-white cursor-pointer transition-opacity disabled:opacity-50 overflow-hidden"
                          style={{
                            background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
                            boxShadow: "0 4px 20px rgba(6,182,212,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
                          }}
                        >
                          {/* Shimmer effect */}
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                              animation: status === "sending" ? "none" : undefined,
                            }}
                          />
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {status === "sending" ? (
                              <>
                                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
                                  <path d="M12 2a10 10 0 019.95 9" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Submit Request
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="9,18 15,12 9,6" />
                                </svg>
                              </>
                            )}
                          </span>
                        </motion.button>
                      </motion.div>

                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-[12px] font-medium"
                          style={{ color: "#ef4444" }}
                        >
                          Something went wrong. Please try again.
                        </motion.p>
                      )}
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
