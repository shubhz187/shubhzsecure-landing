import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { WindowChrome } from "./components/WindowChrome";
import { Sidebar } from "./components/Sidebar";
import { ScoreGauge } from "./components/ScoreGauge";
import { ScoreDetailBars } from "./components/ScoreDetailBars";
import { MetricCards } from "./components/MetricCards";
import { ThreatChart } from "./components/ThreatChart";
import { ComplianceStatus } from "./components/ComplianceStatus";
import { ScannerFindings } from "./components/ScannerFindings";

export function DashboardVideo() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Grade badge bounce animation
  const gradeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.8 },
    delay: 50,
  });

  const gradeAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 48,
  });

  // Score hero card appear
  const scoreHeroAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 20,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#06060e",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {/* Window Chrome */}
      <WindowChrome />

      {/* Main body */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            overflow: "hidden",
          }}
        >
          {/* Score Hero Card */}
          <div
            style={{
              backgroundColor: "rgba(14, 14, 30, 0.75)",
              border: "1px solid rgba(124, 58, 237, 0.12)",
              borderRadius: 12,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: 28,
              opacity: scoreHeroAppear,
              transform: `translateY(${(1 - scoreHeroAppear) * 16}px)`,
            }}
          >
            {/* Circular Gauge */}
            <ScoreGauge />

            {/* Score Detail Bars */}
            <ScoreDetailBars />

            {/* Grade Badge */}
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 14,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transform: `scale(${gradeScale})`,
                opacity: gradeAppear,
                boxShadow: "0 0 24px rgba(124,58,237,0.3)",
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                A
              </span>
            </div>
          </div>

          {/* Metric Cards Row */}
          <MetricCards />

          {/* Bottom Grid */}
          <div
            style={{
              display: "flex",
              gap: 14,
              flex: 1,
              minHeight: 0,
            }}
          >
            {/* Privacy Threat Chart */}
            <ThreatChart />

            {/* Right Column: Compliance + Scanner */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <ComplianceStatus />
              <ScannerFindings />
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
