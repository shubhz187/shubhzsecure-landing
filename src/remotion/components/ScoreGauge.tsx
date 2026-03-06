import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export function ScoreGauge() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const targetPercent = 94.2;

  const progress = interpolate(frame, [20, 60], [0, targetPercent / 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const dashOffset = circumference * (1 - progress);

  const displayValue = interpolate(frame, [20, 60], [0, targetPercent], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  // Ambient glow pulse after everything settles (frames 240-300)
  const glowOpacity =
    frame >= 240 ? 0.15 + 0.08 * Math.sin((frame - 240) * 0.15) : 0;

  return (
    <div
      style={{
        position: "relative",
        width: 130,
        height: 130,
        flexShrink: 0,
        opacity: appear,
        transform: `scale(${0.8 + appear * 0.2})`,
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
          opacity: glowOpacity,
        }}
      />

      <svg width="130" height="130" viewBox="0 0 130 130">
        <defs>
          <linearGradient
            id="gaugeGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#5b21b6" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Background ring */}
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke="rgba(124,58,237,0.1)"
          strokeWidth="8"
          fill="none"
        />

        {/* Animated gradient ring */}
        <circle
          cx="65"
          cy="65"
          r={radius}
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
      </svg>

      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#ffffff",
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          {displayValue.toFixed(1)}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.35)",
            fontFamily: "system-ui, sans-serif",
            marginTop: 3,
          }}
        >
          Overall Score
        </div>
      </div>
    </div>
  );
}
