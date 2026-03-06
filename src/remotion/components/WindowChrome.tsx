import { useCurrentFrame, interpolate, Easing } from "remotion";

export function WindowChrome() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 20], [0.96, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        height: 40,
        backgroundColor: "#14142b",
        borderBottom: "1px solid rgba(124, 58, 237, 0.12)",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#ff5f57",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#febc2e",
          }}
        />
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: "#28c840",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: 13,
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 500,
          letterSpacing: "0.02em",
        }}
      >
        ShubhzSecure Dashboard
      </div>
      <div style={{ width: 52 }} />
    </div>
  );
}
