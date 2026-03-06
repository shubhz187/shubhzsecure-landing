"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { docSections, buildSidebar, type SidebarGroup } from "@/data/docs";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

/* ── Markdown-ish renderer ──────────────────────────────────── */
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="docs-code-block group relative my-4 overflow-hidden rounded-xl" style={{ backgroundColor: "#0d0d14", border: "1px solid rgba(255,255,255,0.06)" }}>
          {lang && (
            <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>{lang}</span>
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Tables
    if (line.includes("|") && line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        const header = tableLines[0].split("|").filter(Boolean).map((c) => c.trim());
        const rows = tableLines.slice(2).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
        elements.push(
          <div key={key++} className="my-4 overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            <table className="w-full text-[13px]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  {header.map((h, hi) => (
                    <th key={hi} className="px-4 py-3 text-left font-semibold" style={{ color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // H4
    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={key++} className="mb-3 mt-8 text-[15px] font-semibold" style={{ color: "#06b6d4" }}>
          {renderInline(line.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="mb-4 mt-10 text-[18px] font-bold" style={{ color: "#ffffff", letterSpacing: "-0.01em" }}>
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 ml-5 flex flex-col gap-1.5 list-decimal">
          {listItems.map((item, li) => (
            <li key={li} className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.trim().startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        listItems.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 ml-5 flex flex-col gap-1.5 list-disc">
          {listItems.map((item, li) => (
            <li key={li} className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="my-2 text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Split by inline code, bold, then reassemble
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

    type Match = { idx: number; len: number; node: React.ReactNode };
    const candidates: Match[] = [];

    if (codeMatch && codeMatch.index !== undefined) {
      candidates.push({
        idx: codeMatch.index,
        len: codeMatch[0].length,
        node: (
          <code
            key={`c${k++}`}
            className="rounded-md px-1.5 py-0.5 text-[12.5px] font-medium"
            style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.15)" }}
          >
            {codeMatch[1]}
          </code>
        ),
      });
    }

    if (boldMatch && boldMatch.index !== undefined) {
      candidates.push({
        idx: boldMatch.index,
        len: boldMatch[0].length,
        node: <strong key={`b${k++}`} style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{boldMatch[1]}</strong>,
      });
    }

    candidates.sort((a, b) => a.idx - b.idx);
    const firstMatch = candidates[0] ?? null;

    if (firstMatch) {
      if (firstMatch.idx > 0) {
        parts.push(remaining.slice(0, firstMatch.idx));
      }
      parts.push(firstMatch.node);
      remaining = remaining.slice(firstMatch.idx + firstMatch.len);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

/* ── Sidebar component ──────────────────────────────────────── */
function Sidebar({
  groups,
  activeId,
  onNavigate,
  search,
  onSearchChange,
}: {
  groups: SidebarGroup[];
  activeId: string;
  onNavigate: (id: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}) {
  const filteredGroups = useMemo(() => {
    if (!search.trim()) return groups;
    const q = search.toLowerCase();
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            g.label.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, search]);

  return (
    <div className="flex h-full flex-col">
      {/* Search */}
      <div className="px-4 pb-4 pt-1">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search docs..."
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none transition-colors"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.7)",
            }}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
        {filteredGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="relative mb-0.5 block w-full rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-all duration-200"
                  style={{
                    color: isActive ? "#06b6d4" : "rgba(255,255,255,0.45)",
                    backgroundColor: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: "#06b6d4" }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.title}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}

/* ── Main docs page ─────────────────────────────────────────── */
export default function DocsClient() {
  const sidebarGroups = useMemo(() => buildSidebar(), []);
  const [activeId, setActiveId] = useState(docSections[0].id);
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("[data-doc-section]");
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <main className="overflow-x-hidden" style={{ backgroundColor: "#000000" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ backgroundColor: "#000000" }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-5">
          <div className="pb-10 pt-20 lg:pb-14 lg:pt-28">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold" style={{ backgroundColor: "rgba(6,182,212,0.12)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                <span className="inline-block h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: "#06b6d4" }} />
                Documentation
              </span>
              <h1 className="mt-5" style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.035em", color: "#ffffff", fontWeight: 800 }}>
                PriAITect Docs
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                Everything you need to deploy, configure, and use the PriAITect privacy platform.
              </p>
            </motion.div>
          </div>
        </div>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </section>

      {/* Mobile sidebar toggle */}
      <div className="sticky top-12 z-40 lg:hidden" style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3">
          <span className="text-[13px] font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
            {docSections.find((s) => s.id === activeId)?.title ?? "Docs"}
          </span>
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            </svg>
            Menu
          </button>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 lg:hidden"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 35 }}
              className="fixed left-0 top-0 z-50 h-full w-72 pt-4 lg:hidden"
              style={{ backgroundColor: "#0a0a0f", borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="mb-3 flex items-center justify-between px-4">
                <span className="text-[14px] font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Navigation</span>
                <button onClick={() => setMobileNavOpen(false)} className="flex h-7 w-7 items-center justify-center rounded-md" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <Sidebar groups={sidebarGroups} activeId={activeId} onNavigate={handleNavigate} search={search} onSearchChange={setSearch} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div className="mx-auto max-w-[1200px] px-5">
        <div className="flex gap-0 lg:gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block" style={{ width: 260, flexShrink: 0 }}>
            <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-hidden pt-8">
              <Sidebar groups={sidebarGroups} activeId={activeId} onNavigate={handleNavigate} search={search} onSearchChange={setSearch} />
            </div>
          </aside>

          {/* Content */}
          <div ref={contentRef} className="min-w-0 flex-1 pb-28 pt-8 lg:pl-4" style={{ borderLeft: "none" }}>
            {/* Decorative left border on desktop */}
            <div className="hidden lg:block" style={{ position: "fixed", left: "calc(50% - 600px + 260px + 32px)", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.04)" }} />

            {docSections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                data-doc-section
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 scroll-mt-24"
              >
                {/* Section header */}
                {section.parent && (
                  <span className="mb-2 inline-block text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {section.parent}
                  </span>
                )}
                <h2
                  className="mb-6"
                  style={{
                    fontSize: section.level === 1 ? "clamp(1.8rem, 3.5vw, 2.4rem)" : "clamp(1.4rem, 2.5vw, 1.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "#ffffff",
                    fontWeight: 700,
                  }}
                >
                  {section.title}
                </h2>
                <div className="docs-content">{renderContent(section.content)}</div>

                {/* Section divider */}
                <div className="mt-12" style={{ height: 1, background: "linear-gradient(90deg, rgba(255,255,255,0.06), transparent 80%)" }} />
              </motion.section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
