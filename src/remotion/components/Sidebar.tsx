import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Analyses" },
  { label: "Diagrams" },
  { label: "Scanner" },
  { label: "Compliance" },
  { label: "Settings" },
];

function NavIcon({ active, index }: { active?: boolean; index: number }) {
  const color = active ? "#a78bfa" : "rgba(255,255,255,0.2)";
  const shapes = [
    // Dashboard - 4 squares
    <svg key="d" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill={color} />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill={color} />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill={color} />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill={color} />
    </svg>,
    // Analyses - target
    <svg key="a" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="3" stroke={color} strokeWidth="1.5" />
      <circle cx="8" cy="8" r="1" fill={color} />
    </svg>,
    // Diagrams - nodes
    <svg key="di" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="5" width="5" height="5" rx="1" fill={color} />
      <rect x="10" y="1" width="5" height="5" rx="1" fill={color} />
      <rect x="10" y="10" width="5" height="5" rx="1" fill={color} />
      <line x1="6" y1="7" x2="10" y2="4" stroke={color} strokeWidth="1" />
      <line x1="6" y1="8" x2="10" y2="12" stroke={color} strokeWidth="1" />
    </svg>,
    // Scanner - magnifier
    <svg key="s" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke={color} strokeWidth="1.5" />
      <line x1="11" y1="11" x2="14" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    // Compliance - shield
    <svg key="c" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5L2.5 4V8.5C2.5 11.5 5 14 8 14.5C11 14 13.5 11.5 13.5 8.5V4L8 1.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <polyline points="5.5,8 7.5,10 10.5,6" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    // Settings - gear
    <svg key="g" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" stroke={color} strokeWidth="1.5" />
      <path d="M8 1V3M8 13V15M1 8H3M13 8H15M3 3L4.5 4.5M11.5 11.5L13 13M13 3L11.5 4.5M4.5 11.5L3 13" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
  ];
  return shapes[index] || shapes[0];
}

export function Sidebar() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sidebarOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 10,
  });

  return (
    <div
      style={{
        width: 180,
        backgroundColor: "#0a0a18",
        borderRight: "1px solid rgba(124, 58, 237, 0.1)",
        display: "flex",
        flexDirection: "column",
        opacity: sidebarOpacity,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "18px 16px",
          borderBottom: "1px solid rgba(124,58,237,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              P
            </span>
          </div>
          <span
            style={{
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            ShubhzSecure
          </span>
        </div>
      </div>

      {/* Nav Items */}
      <div style={{ marginTop: 12, padding: "0 8px" }}>
        {navItems.map((item, i) => {
          const progress = spring({
            frame,
            fps,
            config: { damping: 200 },
            delay: 14 + i * 3,
          });

          return (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                marginBottom: 2,
                backgroundColor: item.active
                  ? "rgba(124,58,237,0.15)"
                  : "transparent",
                opacity: progress,
                transform: `translateY(${(1 - progress) * 12}px)`,
              }}
            >
              <NavIcon active={item.active} index={i} />
              <span
                style={{
                  fontSize: 12,
                  fontFamily: "system-ui, sans-serif",
                  color: item.active ? "#a78bfa" : "rgba(255,255,255,0.45)",
                  fontWeight: item.active ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom section */}
      <div style={{ marginTop: "auto", padding: "16px" }}>
        <div
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            backgroundColor: "rgba(124,58,237,0.08)",
            border: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Organization
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "system-ui, sans-serif",
              marginTop: 2,
            }}
          >
            Acme Corp
          </div>
        </div>
      </div>
    </div>
  );
}
