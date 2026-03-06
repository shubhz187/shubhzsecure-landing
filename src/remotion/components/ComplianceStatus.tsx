import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const frameworks = [
  { name: "GDPR", value: 96, color: "#7c3aed", status: "Compliant" },
  { name: "CCPA", value: 91, color: "#06b6d4", status: "Compliant" },
  { name: "HIPAA", value: 88, color: "#10b981", status: "In Progress" },
];

export function ComplianceStatus() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 140,
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "rgba(14, 14, 30, 0.75)",
        border: "1px solid rgba(124, 58, 237, 0.12)",
        borderRadius: 10,
        padding: 16,
        opacity: cardAppear,
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
        Compliance Status
      </div>
      <div
        style={{
          fontSize: 10,
          color: "rgba(255,255,255,0.3)",
          fontFamily: "system-ui, sans-serif",
          marginBottom: 16,
        }}
      >
        Regulatory framework coverage
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
          justifyContent: "center",
        }}
      >
        {frameworks.map((fw, i) => {
          const fillProgress = spring({
            frame,
            fps,
            config: { damping: 35, stiffness: 70 },
            delay: 148 + i * 10,
          });

          const itemAppear = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay: 144 + i * 8,
          });

          return (
            <div
              key={fw.name}
              style={{
                opacity: itemAppear,
                transform: `translateX(${(1 - itemAppear) * 16}px)`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#ffffff",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {fw.name}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      color:
                        fw.status === "Compliant"
                          ? "rgba(16,185,129,0.8)"
                          : "rgba(245,158,11,0.8)",
                      fontFamily: "system-ui, sans-serif",
                      backgroundColor:
                        fw.status === "Compliant"
                          ? "rgba(16,185,129,0.1)"
                          : "rgba(245,158,11,0.1)",
                      padding: "2px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {fw.status}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: fw.color,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {Math.round(fw.value * fillProgress)}%
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  backgroundColor: "rgba(124,58,237,0.08)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${fw.value * fillProgress}%`,
                    backgroundColor: fw.color,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
