"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { footerLinks } from "@/data/content";

export default function Footer() {
  return (
    <footer id="contact" className="pb-10 pt-20" style={{ backgroundColor: "#1d1d1f" }}>
      <div className="mx-auto max-w-[980px] px-5">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-10 pb-14 md:grid-cols-4 lg:grid-cols-5"
        >
          {/* Brand */}
          <motion.div variants={staggerItem} className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="mb-5 flex items-center gap-2">
              <img src="/shubhzsecure-landing/logo.png" alt="ShubhzSecure" width="22" height="22" />
              <span className="text-[16px] font-semibold text-white" style={{ letterSpacing: "-0.02em" }}>
                ShubhzSecure
              </span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Privacy-first security intelligence for modern engineering and compliance teams.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { label: "GitHub", path: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" },
                { label: "Twitter/X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 4a2 2 0 100 4 2 2 0 000-4z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:opacity-100"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
              Contact
            </h4>
            <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.45)" }}>info@shubhztechwork.com</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
              Product
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] transition-opacity hover:opacity-100" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Explore */}
          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[13px] transition-opacity hover:opacity-100" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>
            Copyright © 2026 ShubhzSecure. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Use", "Legal"].map((l) => (
              <a key={l} href="#" className="text-[12px] transition-opacity hover:opacity-100" style={{ color: "rgba(255,255,255,0.25)" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
