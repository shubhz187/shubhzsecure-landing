import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const metrics = [
  {
    label: "Total Analyses",
    value: 47,
    color: "#7c3aed",
    icon: (c: string) => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1" fill={c} />
        <rect x="9" y="1" width="6" height="6" rx="1" fill={c} opacity="0.5" />
        <rect x="1" y="9" width="6" height="6" rx="1" fill={c} opacity="0.5" />
        <rect x="9" y="9" width="6" height="6" rx="1" fill={c} opacity="0.3" />
      </svg>
    ),
  },
  {
    label: "Active Threats",
    value: 12,
    color: "#f59e0b",
    icon: (c: string) => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1L14.5 13H1.5L8 1Z"
          stroke={c}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line
          x1="8"
          y1="6"
          x2="8"
          y2="9"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11" r="0.75" fill={c} />
      </svg>
    ),
  },
  {
    label: "Data Sources",
    value: 8,
    color: "#06b6d4",
    icon: (c: string) => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <ellipse cx="8" cy="4" rx="6" ry="2.5" stroke={c} strokeWidth="1.5" />
        <path d="M2 4V12C2 13.4 4.7 14.5 8 14.5S14 13.4 14 12V4" stroke={c} strokeWidth="1.5" />
        <path d="M2 8C2 9.4 4.7 10.5 8 10.5S14 9.4 14 8" stroke={c} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "PII Findings",
    value: 2341,
    color: "#ef4444",
    icon: (c: string) => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.5" />
        <circle cx="8" cy="8" r="2" fill={c} />
        <line
          x1="8"
          y1="2"
          x2="8"
          y2="4"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="8"
          x2="12"
          y2="8"
          stroke={c}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function MetricCards() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ display: "flex", gap: 12 }}>
      {metrics.map((metric, i) => {
        const appear = spring({
          frame,
          fps,
          config: { damping: 30, stiffness: 120 },
          delay: 60 + i * 8,
        });

        const countStart = 80 + i * 10;
        const countEnd = countStart + 60;
        const displayValue = Math.round(
          interpolate(frame, [countStart, countEnd], [0, metric.value], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        );

        return (
          <div
            key={metric.label}
            style={{
              flex: 1,
              backgroundColor: "rgba(14, 14, 30, 0.75)",
              border: "1px solid rgba(124, 58, 237, 0.12)",
              borderRadius: 10,
              padding: "14px 16px",
              opacity: appear,
              transform: `translateY(${(1 - appear) * 24}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  backgroundColor: `${metric.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {metric.icon(metric.color)}
              </div>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#ffffff",
                fontFamily: "system-ui, sans-serif",
                lineHeight: 1,
              }}
            >
              {displayValue.toLocaleString()}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.35)",
                fontFamily: "system-ui, sans-serif",
                marginTop: 5,
              }}
            >
              {metric.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
