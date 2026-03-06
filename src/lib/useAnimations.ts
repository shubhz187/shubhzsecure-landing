"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform, useScroll, MotionValue } from "framer-motion";

/* ── Animated counter — counts up when element enters viewport  ── */
export function useAnimatedCounter(
    target: number,
    duration: number = 2,
    decimals: number = 0
) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "0px" });
    const motionVal = useMotionValue(0);
    const springVal = useSpring(motionVal, {
        duration: duration * 1000,
        bounce: 0,
    });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (inView) motionVal.set(target);
    }, [inView, motionVal, target]);

    useEffect(() => {
        const unsubscribe = springVal.on("change", (v) => {
            setDisplay(
                decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
            );
        });
        return unsubscribe;
    }, [springVal, decimals]);

    return { ref, display, inView };
}

/* ── Parallax — offset an element by fraction of scroll ────── */
export function useParallax(
    range: [number, number] = [0, -60],
): { ref: React.RefObject<HTMLDivElement | null>; y: MotionValue<number> } {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], range);
    return { ref, y };
}

/* ── Scroll-linked opacity (e.g., element fades as it exits) ── */
export function useScrollFade(
    opacityRange: [number, number] = [1, 0]
): { ref: React.RefObject<HTMLDivElement | null>; opacity: MotionValue<number> } {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], opacityRange);
    return { ref, opacity };
}
