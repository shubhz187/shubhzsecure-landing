"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/content";
import { navReveal } from "@/lib/motion";
import { useContactModal } from "@/components/ContactModal";

/* ── Animated nav link with sliding underline + glow ────────── */
function NavLink({
  href,
  label,
  textColor,
  scrolled,
}: {
  href: string;
  label: string;
  textColor: string;
  scrolled: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isInternal = href.startsWith("/");
  const Tag = isInternal ? Link : "a";
  const accentColor = scrolled ? "#06b6d4" : "#ffffff";

  return (
    <Tag
      href={href}
      className="relative px-1 py-1 text-[13px] font-medium transition-opacity duration-200"
      style={{ color: hovered ? (scrolled ? "#1d1d1f" : "#ffffff") : textColor, opacity: hovered ? 1 : 0.7 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {/* Sliding underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1.5px] rounded-full"
        style={{ backgroundColor: accentColor }}
        initial={{ width: "0%", opacity: 0 }}
        animate={{
          width: hovered ? "100%" : "0%",
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      />
      {/* Subtle glow behind text on hover */}
      <motion.span
        className="pointer-events-none absolute inset-0 -mx-2 -my-1 rounded-lg"
        style={{
          backgroundColor: scrolled
            ? "rgba(0,0,0,0.04)"
            : "rgba(255,255,255,0.06)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </Tag>
  );
}

export default function Navbar() {
  const { open } = useContactModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled ? "#1d1d1f" : "rgba(255,255,255,0.85)";
  const logoColor = scrolled ? "#1d1d1f" : "#ffffff";
  const iconColor = scrolled ? "#1d1d1f" : "#ffffff";

  return (
    <motion.nav
      variants={navReveal}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.76)" : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
      }}
    >
      <div className="mx-auto max-w-[980px] px-5">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/shubhzsecure-landing/logo.png" alt="ShubhzSecure" width="28" height="28" />
              <span
                className="text-[17px] font-semibold transition-colors duration-300"
                style={{ color: logoColor, letterSpacing: "-0.02em" }}
              >
                ShubhzSecure
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                textColor={textColor}
                scrolled={scrolled}
              />
            ))}
          </div>

          {/* Right: CTA pill */}
          <div className="hidden items-center gap-3 md:flex">
            <motion.button
              onClick={open}
              whileHover={{ scale: 1.06, boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.15)" : "0 4px 20px rgba(6,182,212,0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="inline-flex h-8 items-center rounded-full px-4 text-[13px] font-medium transition-colors duration-300 cursor-pointer"
              style={{
                backgroundColor: scrolled ? "#1d1d1f" : "rgba(255,255,255,0.15)",
                color: "#ffffff",
                border: scrolled ? "none" : "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <motion.button
            className="flex h-8 w-8 items-center justify-center md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.85 }}
          >
            <div className="flex flex-col gap-[5px]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-[1.5px] w-5 transition-all duration-300"
                  style={{
                    backgroundColor: iconColor,
                    transform:
                      mobileOpen && i === 0
                        ? "translateY(6.5px) rotate(45deg)"
                        : mobileOpen && i === 2
                          ? "translateY(-6.5px) rotate(-45deg)"
                          : "none",
                    opacity: mobileOpen && i === 1 ? 0 : 1,
                  }}
                />
              ))}
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden pb-5 md:hidden"
              style={{
                borderTop: `1px solid ${scrolled ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.12)"}`,
                backgroundColor: scrolled ? "transparent" : "rgba(0,0,0,0.6)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className="flex flex-col gap-0 pt-2">
                {navLinks.map((link, i) => {
                  const isInternal = link.href.startsWith("/");
                  const Tag = isInternal ? Link : "a";
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <Tag
                        href={link.href}
                        className="block py-2.5 text-[15px] transition-opacity duration-200 hover:opacity-100"
                        style={{ color: textColor, opacity: 0.7 }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Tag>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                >
                  <button
                    onClick={() => { setMobileOpen(false); open(); }}
                    className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full text-[15px] font-medium text-white cursor-pointer"
                    style={{ backgroundColor: scrolled ? "#1d1d1f" : "#06b6d4" }}
                  >
                    Get Started
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
