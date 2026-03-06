import type { Variants } from "framer-motion";

/* ── Apple easing curves ───────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const;           // smooth out
const easeApple = [0.25, 0.1, 0.25, 1] as const;    // Apple's native
const easeCinematic = [0.16, 1, 0.3, 1] as const;   // slow start, butter end

/* ── Standard fades ───────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeCinematic },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: {
    opacity: 1, filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

/* ── Apple-style reveal (subtle scale + fade + blur) ───────── */
export const appleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.0, ease: easeCinematic },
  },
};

/* ── 3D rotateX flip-in (for headings) ───────────────────── */
export const flipIn: Variants = {
  hidden: {
    opacity: 0, rotateX: 14, y: 24,
    transformPerspective: 600,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1, rotateX: 0, y: 0,
    transformPerspective: 600,
    filter: "blur(0px)",
    transition: { duration: 1.0, ease: easeCinematic },
  },
};

/* ── Scale in (product shots / images) ───────────────────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: "blur(8px)" },
  visible: {
    opacity: 1, scale: 1, filter: "blur(0px)",
    transition: { duration: 1.2, ease: easeCinematic },
  },
};

/* ── Slide from left (with blur) ──────────────────────────── */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 1.0, ease: easeCinematic },
  },
};

/* ── Slide from right (with blur) ─────────────────────────── */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(6px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 1.0, ease: easeCinematic },
  },
};

/* ── Stagger containers (Apple-style timing) ─────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeCinematic },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.0 },
  },
};

/* ── Hero-specific ────────────────────────────────────────── */
export const heroTextStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

export const heroLine: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 12, transformPerspective: 500, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, rotateX: 0, transformPerspective: 500,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: easeCinematic },
  },
};

export const chipSlideIn: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeApple },
  },
};

export const navReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: easeApple } },
};

/* ── Word-by-word container (for AppleWordReveal) ─────────── */
export const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

export const wordRevealItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: easeCinematic },
  },
};
