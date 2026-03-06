import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const threats = [
  { label: "L", fullLabel: "Linkability", value: 78, color: "#7c3aed" },
  { label: "I", fullLabel: "Identifiability", value: 55, color: "#06b6d4" },
  { label: "N", fullLabel: "Non-repudiation", value: 92, color: "#7c3aed" },
  { label: "D", fullLabel: "Detectability", value: 40, color: "#f59e0b" },
  { label: "D", fullLabel: "Disclosure", value: 68, color: "#06b6d4" },
  { label: "U", fullLabel: "Unawareness", value: 50, color: "#7c3aed" },
  { label: "N", fullLabel: "Non-compliance", value: 85, color: "#10b981" },
];

export function ThreatChart() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chartAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 100,
  });

  const maxBarHeight = 100;

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(14, 14, 30, 0.75)",
        border: "1px solid rgba(124, 58, 237, 0.12)",
        borderRadius: 10,
        padding: 16,
        opacity: chartAppear,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "system-ui, sans-serif",
          marginBottom: 4,
        }}
      >
        Privacy Threat Analysis
      </div>
      <div
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "system-ui, sans-serif",
          marginBottom: 16,
        }}
      >
        Privacy threat distribution
      </div>

      {/* Chart area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: 8,
          paddingBottom: 20,
          position: "relative",
        }}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 20 + (pct / 100) * maxBarHeight,
              height: 1,
              backgroundColor: "rgba(124,58,237,0.06)",
            }}
          />
        ))}

        {threats.map((threat, i) => {
          const barGrow = spring({
            frame,
            fps,
            config: { damping: 25, stiffness: 80 },
            delay: 105 + i * 6,
          });

          const barHeight = (threat.value / 100) * maxBarHeight * barGrow;

          return (
            <div
              key={`${threat.label}-${i}`}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              {/* Bar */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 28,
                  height: barHeight,
                  backgroundColor: threat.color,
                  borderRadius: "4px 4px 2px 2px",
                  opacity: 0.85,
                  position: "relative",
                }}
              >
                {/* Value label on top of bar */}
                {barGrow > 0.8 && (
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: 9,
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "system-ui, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {threat.value}
                  </div>
                )}
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {threat.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
