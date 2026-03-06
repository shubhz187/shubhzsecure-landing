import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const scores = [
  { label: "Privacy Score", value: 87, color: "#7c3aed" },
  { label: "Security Score", value: 91, color: "#06b6d4" },
  { label: "Data Protection", value: 78, color: "#10b981" },
];

export function ScoreDetailBars() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
        minWidth: 0,
      }}
    >
      {scores.map((score, i) => {
        const fillProgress = spring({
          frame,
          fps,
          config: { damping: 40, stiffness: 80 },
          delay: 40 + i * 8,
        });

        const appear = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 38 + i * 6,
        });

        return (
          <div
            key={score.label}
            style={{
              opacity: appear,
              transform: `translateX(${(1 - appear) * 20}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {score.label}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#ffffff",
                  fontWeight: 600,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {Math.round(score.value * fillProgress)}%
              </span>
            </div>
            <div
              style={{
                height: 6,
                backgroundColor: "rgba(124,58,237,0.1)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${score.value * fillProgress}%`,
                  backgroundColor: score.color,
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
