import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const findings = [
  {
    source: "users_db",
    type: "PostgreSQL",
    piiCount: "2,341",
    risk: "High",
    riskColor: "#ef4444",
  },
  {
    source: "logs_bucket",
    type: "S3 Bucket",
    piiCount: "856",
    risk: "Medium",
    riskColor: "#f59e0b",
  },
  {
    source: "analytics_store",
    type: "Azure Blob",
    piiCount: "124",
    risk: "Low",
    riskColor: "#10b981",
  },
  {
    source: "customer_api",
    type: "REST API",
    piiCount: "1,089",
    risk: "High",
    riskColor: "#ef4444",
  },
];

const columns = ["Source", "Type", "PII Count", "Risk"];

export function ScannerFindings() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tableAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 180,
  });

  return (
    <div
      style={{
        backgroundColor: "rgba(14, 14, 30, 0.75)",
        border: "1px solid rgba(124, 58, 237, 0.12)",
        borderRadius: 10,
        padding: 16,
        opacity: tableAppear,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "rgba(255,255,255,0.7)",
          fontFamily: "system-ui, sans-serif",
          marginBottom: 12,
        }}
      >
        Scanner Findings
      </div>

      {/* Header row */}
      <div
        style={{
          display: "flex",
          padding: "6px 10px",
          backgroundColor: "rgba(124,58,237,0.06)",
          borderRadius: 6,
          marginBottom: 4,
        }}
      >
        {columns.map((col, i) => (
          <div
            key={col}
            style={{
              flex: i === 3 ? 0.7 : 1,
              fontSize: 9,
              fontWeight: 600,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Data rows */}
      {findings.map((row, i) => {
        const rowSlide = spring({
          frame,
          fps,
          config: { damping: 30, stiffness: 100 },
          delay: 185 + i * 6,
        });

        return (
          <div
            key={row.source}
            style={{
              display: "flex",
              padding: "7px 10px",
              borderBottom:
                i < findings.length - 1
                  ? "1px solid rgba(124,58,237,0.05)"
                  : "none",
              opacity: rowSlide,
              transform: `translateX(${(1 - rowSlide) * 40}px)`,
            }}
          >
            <div
              style={{
                flex: 1,
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {row.source}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 10,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {row.type}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 10,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              {row.piiCount}
            </div>
            <div style={{ flex: 0.7 }}>
              <span
                style={{
                  fontSize: 9,
                  color: row.riskColor,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: 600,
                  backgroundColor: `${row.riskColor}15`,
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {row.risk}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
