"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionBadge from "@/components/SectionBadge";
import docsDataRaw from "@/data/docs.json";
import {
  PlayCircle,
  ClipboardList,
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Users,
  Wallet,
  Wrench,
  MessageSquare,
  FileText,
  LifeBuoy,
  UserPlus,
  Zap,
  BarChart3,
  Bell,
  Bot,
  Settings,
  Globe,
  File,
  FileEdit,
  Shield,
  Command,
  Search,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Check,
  Copy,
} from "lucide-react";

export interface DocArticle {
  slug: string;
  title: string;
  category: string;
  icon: string;
  order: number;
  content: string;
}

const docsData = docsDataRaw as DocArticle[];

// Map icon string names from docs.json to Lucide components
function renderDocIcon(iconName: string, size = 16, className = "") {
  const props = { size, className };
  switch (iconName) {
    case "play-circle":
      return <PlayCircle {...props} />;
    case "clipboard":
      return <ClipboardList {...props} />;
    case "layout":
      return <LayoutDashboard {...props} />;
    case "folder":
      return <FolderKanban {...props} />;
    case "check-circle":
      return <CheckCircle2 {...props} />;
    case "users":
      return <Users {...props} />;
    case "wallet":
      return <Wallet {...props} />;
    case "wrench":
      return <Wrench {...props} />;
    case "message-circle":
      return <MessageSquare {...props} />;
    case "file-text":
      return <FileText {...props} />;
    case "life-buoy":
      return <LifeBuoy {...props} />;
    case "user-plus":
      return <UserPlus {...props} />;
    case "zap":
      return <Zap {...props} />;
    case "bar-chart":
      return <BarChart3 {...props} />;
    case "bell":
      return <Bell {...props} />;
    case "bot":
      return <Bot {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "globe":
      return <Globe {...props} />;
    case "file":
      return <File {...props} />;
    case "edit":
      return <FileEdit {...props} />;
    case "lock":
      return <Shield {...props} />;
    case "command":
      return <Command {...props} />;
    default:
      return <BookOpen {...props} />;
  }
}

// Markdown parser
function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineMd(s: string) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, function (_, text, href) {
      if (href.startsWith("./") || href.endsWith(".md") || href.includes(".md#")) {
        const clean = href.replace("./", "").replace(".md", "");
        const [slug, subHash] = clean.split("#");
        return `<a href="#${slug || ""}${subHash ? "-" + subHash : ""}" class="docs-internal-link" data-slug="${slug}">${text}</a>`;
      }
      return `<a href="${href}" target="_blank" rel="noopener" class="docs-external-link">${text}</a>`;
    });
}

function parseTable(rows: string[]) {
  if (rows.length < 2) return "";
  const parse = (r: string) => r.split("|").map((c) => c.trim()).filter((c) => c !== "");
  const headers = parse(rows[0]);
  const startIdx = rows.length > 1 && /^[\s|:-]+$/.test(rows[1]) ? 2 : 1;
  let t = '<div class="docs-table-wrapper"><table><thead><tr>';
  headers.forEach((h) => (t += "<th>" + inlineMd(h) + "</th>"));
  t += "</tr></thead><tbody>";
  for (let r = startIdx; r < rows.length; r++) {
    const cells = parse(rows[r]);
    if (cells.length === 0) continue;
    t += "<tr>";
    cells.forEach((c) => (t += "<td>" + inlineMd(c) + "</td>"));
    t += "</tr>";
  }
  t += "</tbody></table></div>";
  return t;
}

function renderMarkdownToHtml(src: string): string {
  let html = "";
  const lines = src.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      let code = "";
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code += esc(lines[i]) + "\n";
        i++;
      }
      i++;
      const codeClean = code.trimEnd();
      html += `<div class="docs-code-block"><div class="docs-code-header"><span class="docs-code-lang">${lang || "code"}</span><button class="docs-copy-btn" data-code="${encodeURIComponent(codeClean)}">Copy</button></div><pre><code>${codeClean}</code></pre></div>\n`;
      continue;
    }

    // Table
    if (line.includes("|") && line.trim().startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim().startsWith("|")) {
        rows.push(lines[i]);
        i++;
      }
      html += parseTable(rows);
      continue;
    }

    // Headings
    const hm = line.match(/^(#{2,4})\s+(.+)/);
    if (hm) {
      const lvl = hm[1].length;
      const id = hm[2].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      html += `<h${lvl} id="${id}">${inlineMd(hm[2])}</h${lvl}>\n`;
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      html += "<hr>\n";
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith(">")) {
      let bq = "";
      while (i < lines.length && lines[i].startsWith(">")) {
        bq += lines[i].replace(/^>\s?/, "") + "\n";
        i++;
      }
      html += "<blockquote>" + renderMarkdownToHtml(bq.trim()) + "</blockquote>\n";
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      html += "<ol>\n";
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        let li = lines[i].replace(/^\d+\.\s+/, "");
        i++;
        while (
          i < lines.length &&
          /^\s{2,}/.test(lines[i]) &&
          !/^\d+\.\s/.test(lines[i].trim()) &&
          !lines[i].trim().startsWith("- ")
        ) {
          li += " " + lines[i].trim();
          i++;
        }
        html += "<li>" + inlineMd(li) + "</li>\n";
      }
      html += "</ol>\n";
      continue;
    }

    // Unordered list
    if (/^[-*]\s/.test(line)) {
      html += "<ul>\n";
      while (i < lines.length && /^[-*]\s/.test(lines[i])) {
        let li = lines[i].replace(/^[-*]\s+/, "");
        i++;
        while (i < lines.length && /^\s{2,}/.test(lines[i]) && !/^[-*]\s/.test(lines[i].trim())) {
          li += " " + lines[i].trim();
          i++;
        }
        html += "<li>" + inlineMd(li) + "</li>\n";
      }
      html += "</ul>\n";
      continue;
    }

    // Blank line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Paragraph
    let para = line;
    i++;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("- ") &&
      !lines[i].startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i]) &&
      !(lines[i].includes("|") && lines[i].trim().startsWith("|")) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      para += " " + lines[i];
      i++;
    }
    html += "<p>" + inlineMd(para) + "</p>\n";
  }
  return html;
}

function extractHeadings(content: string) {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## ") && !l.startsWith("### "))
    .map((l) => {
      const text = l.replace(/^##\s+/, "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return { text, id };
    });
}

const CATEGORIES = [
  "Getting Started",
  "Core Features",
  "Team & Workflow",
  "Configuration",
];

export default function DocsPage() {
  const [activeSlug, setActiveSlug] = useState<string>("getting-started");
  const [search, setSearch] = useState<string>("");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const articleContainerRef = useRef<HTMLDivElement>(null);

  // Sync with window.location.hash on mount and hashchange
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace("#", "").split("-")[0];
      if (hash && docsData.some((d) => d.slug === hash)) {
        setActiveSlug(hash);
      }
    }

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const activeArticle = useMemo(() => {
    return docsData.find((d) => d.slug === activeSlug) || docsData[0];
  }, [activeSlug]);

  const activeIndex = useMemo(() => {
    return docsData.findIndex((d) => d.slug === activeArticle.slug);
  }, [activeArticle]);

  const prevArticle = activeIndex > 0 ? docsData[activeIndex - 1] : null;
  const nextArticle = activeIndex < docsData.length - 1 ? docsData[activeIndex + 1] : null;

  const headings = useMemo(() => {
    return extractHeadings(activeArticle.content);
  }, [activeArticle]);

  const renderedHtml = useMemo(() => {
    return renderMarkdownToHtml(activeArticle.content);
  }, [activeArticle]);

  // Filtered categories & items
  const filteredGroups = useMemo(() => {
    const q = search.toLowerCase().trim();
    const groups: { category: string; articles: DocArticle[] }[] = [];

    CATEGORIES.forEach((cat) => {
      const inCat = docsData.filter((d) => d.category === cat);
      const matches = q
        ? inCat.filter(
            (d) =>
              d.title.toLowerCase().includes(q) ||
              d.content.toLowerCase().includes(q)
          )
        : inCat;

      if (matches.length > 0) {
        groups.push({ category: cat, articles: matches });
      }
    });

    return groups;
  }, [search]);

  // Handle article selection
  const handleSelectArticle = (slug: string) => {
    setActiveSlug(slug);
    window.location.hash = slug;
    setMobileDrawerOpen(false);
    if (articleContainerRef.current) {
      articleContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Intercept click on internal links and copy buttons inside the rendered article
  const handleArticleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    // 1. Copy button
    const copyBtn = target.closest(".docs-copy-btn") as HTMLButtonElement | null;
    if (copyBtn) {
      e.preventDefault();
      const code = decodeURIComponent(copyBtn.getAttribute("data-code") || "");
      if (code) {
        navigator.clipboard.writeText(code);
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        copyBtn.style.color = "#10B981";
        setTimeout(() => {
          copyBtn.innerText = originalText;
          copyBtn.style.color = "";
        }, 2000);
      }
      return;
    }

    // 2. Internal link
    const internalLink = target.closest(".docs-internal-link") as HTMLAnchorElement | null;
    if (internalLink) {
      const slug = internalLink.getAttribute("data-slug");
      if (slug && docsData.some((d) => d.slug === slug)) {
        e.preventDefault();
        handleSelectArticle(slug);
      }
    }
  };

  // Scroll to heading within the current article
  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileDrawerOpen(false);
  };

  const totalMatches = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.articles.length, 0);
  }, [filteredGroups]);

  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
      <Navbar />

      <main className="flex-1">
        {/* Sticky Mobile Category Bar */}
        <div className="lg:hidden sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-[11px] font-bold text-[#3F72AF] uppercase tracking-wider shrink-0">
              Docs:
            </span>
            <span className="text-xs font-semibold text-[#0F172A] truncate">
              {activeArticle.title}
            </span>
          </div>

          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors shrink-0"
          >
            <Menu size={14} className="text-[#3F72AF]" />
            <span>Guides ({docsData.length})</span>
          </button>
        </div>

        {/* Documentation Main Layout */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── Left Sidebar (Desktop Sticky) ── */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-hidden flex flex-col bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl shadow-xs">
              
              {/* Search Box */}
              <div className="p-3.5 border-b border-[#E2E8F0] bg-white rounded-t-2xl">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    placeholder="Search 22 guides..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-7 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3F72AF] focus:ring-1 focus:ring-[#3F72AF] transition-colors"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                {search && (
                  <div className="mt-2 text-[10px] text-[#64748B] font-medium flex items-center justify-between px-1">
                    <span>Matches:</span>
                    <span className="font-semibold text-[#0F172A]">{totalMatches} guides</span>
                  </div>
                )}
              </div>

              {/* Navigation Scrollable Area */}
              <div className="overflow-y-auto flex-1 p-3 space-y-5">
                {filteredGroups.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#94A3B8]">
                    No guides match &ldquo;{search}&rdquo;
                  </div>
                ) : (
                  filteredGroups.map((group) => (
                    <div key={group.category} className="space-y-1">
                      <div className="px-2 py-1 text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                        {group.category}
                      </div>

                      <div className="space-y-0.5">
                        {group.articles.map((art) => {
                          const isActive = art.slug === activeArticle.slug;
                          return (
                            <div key={art.slug} className="flex flex-col">
                              <button
                                onClick={() => handleSelectArticle(art.slug)}
                                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                                  isActive
                                    ? "bg-white text-[#3F72AF] shadow-2xs font-semibold border border-[#E2E8F0]"
                                    : "text-[#475569] hover:bg-white/80 hover:text-[#0F172A]"
                                }`}
                              >
                                <span
                                  className={`p-1 rounded-md transition-colors ${
                                    isActive
                                      ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                                      : "bg-white text-[#64748B] border border-[#E2E8F0]"
                                  }`}
                                >
                                  {renderDocIcon(art.icon, 13)}
                                </span>
                                <span className="flex-1 truncate">{art.title}</span>
                                {isActive && headings.length > 0 && (
                                  <ChevronDown size={12} className="text-[#3F72AF] shrink-0" />
                                )}
                              </button>

                              {/* Accordion Table of Contents when Active */}
                              {isActive && headings.length > 0 && (
                                <div className="ml-7 pl-2.5 my-1 border-l border-[#3F72AF]/30 space-y-1">
                                  {headings.map((h) => (
                                    <button
                                      key={h.id}
                                      onClick={() => scrollToHeading(h.id)}
                                      className="block w-full text-left text-[11px] text-[#64748B] hover:text-[#3F72AF] truncate py-0.5 transition-colors"
                                    >
                                      {h.text}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar Footer Support Pill */}
              <div className="p-3 border-t border-[#E2E8F0] bg-white rounded-b-2xl text-[11px] text-[#64748B] flex items-center justify-between">
                <span>Need custom help?</span>
                <a
                  href="/contact/"
                  className="font-semibold text-[#3F72AF] hover:underline"
                >
                  Contact team &rarr;
                </a>
              </div>
            </aside>

            {/* ── Right Content Pane ── */}
            <article
              ref={articleContainerRef}
              className="lg:col-span-8 xl:col-span-9 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs min-w-0"
            >
              {/* Breadcrumbs & Category Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-[#F1F5F9]">
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <a href="/" className="hover:text-[#0F172A] transition-colors">
                    Home
                  </a>
                  <span>/</span>
                  <a href="/docs/" className="hover:text-[#0F172A] transition-colors">
                    Documentation
                  </a>
                  <span>/</span>
                  <span className="text-[#0F172A] font-medium">{activeArticle.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <SectionBadge text={activeArticle.category} />
                  <span className="text-[11px] font-mono text-[#94A3B8]">
                    Guide {activeIndex + 1} of {docsData.length}
                  </span>
                </div>
              </div>

              {/* Title & Eyebrow */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#3F72AF]/10 border border-[#3F72AF]/20 flex items-center justify-center text-[#3F72AF] shadow-2xs shrink-0">
                  {renderDocIcon(activeArticle.icon, 22)}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A]">
                    {activeArticle.title}
                  </h1>
                </div>
              </div>

              {/* Article Content Rendered Markdown */}
              <div
                onClick={handleArticleClick}
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
                className="docs-article-body mt-8 pt-4 border-t border-[#F1F5F9]"
              />

              {/* Bottom Pagination: Previous / Next Guides */}
              <div className="mt-12 pt-8 border-t border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <button
                    onClick={() => handleSelectArticle(prevArticle.slug)}
                    className="flex flex-col items-start p-4 rounded-xl border border-[#E2E8F0] hover:border-[#3F72AF]/40 hover:bg-[#F8FAFC] transition-all text-left group"
                  >
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[#64748B] group-hover:text-[#3F72AF] transition-colors">
                      <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
                      <span>Previous Guide</span>
                    </span>
                    <span className="text-sm font-semibold text-[#0F172A] mt-1 group-hover:text-[#3F72AF] transition-colors line-clamp-1">
                      {prevArticle.title}
                    </span>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextArticle ? (
                  <button
                    onClick={() => handleSelectArticle(nextArticle.slug)}
                    className="flex flex-col items-end p-4 rounded-xl border border-[#E2E8F0] hover:border-[#3F72AF]/40 hover:bg-[#F8FAFC] transition-all text-right group sm:col-start-2"
                  >
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[#64748B] group-hover:text-[#3F72AF] transition-colors">
                      <span>Next Guide</span>
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-sm font-semibold text-[#0F172A] mt-1 group-hover:text-[#3F72AF] transition-colors line-clamp-1">
                      {nextArticle.title}
                    </span>
                  </button>
                ) : (
                  <div />
                )}
              </div>

              {/* Helpful Feedback Box */}
              <div className="mt-10 p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs font-semibold text-[#0F172A]">
                    Looking for custom onboarding or team training?
                  </div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">
                    Our agency architects can help configure your workspace and workflows.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="/demo/"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#3F72AF]/40 text-xs font-semibold text-[#0F172A] hover:text-[#3F72AF] shadow-2xs transition-colors whitespace-nowrap"
                  >
                    Interactive Demo
                  </a>
                  <a
                    href="/contact/"
                    className="px-3.5 py-1.5 rounded-lg bg-[#3F72AF] hover:bg-[#112D4E] text-xs font-semibold text-white shadow-2xs transition-colors whitespace-nowrap"
                  >
                    Talk to Support
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>

        {/* Mobile Off-Canvas Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            />

            {/* Slide-out Panel */}
            <div className="fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
              
              {/* Drawer Header */}
              <div className="p-4 bg-white border-b border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-[#3F72AF]" />
                  <span className="text-sm font-bold text-[#0F172A]">Documentation</span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#64748B]"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Search */}
              <div className="p-3 border-b border-[#E2E8F0] bg-white">
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                  />
                  <input
                    type="text"
                    placeholder="Search 22 guides..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-8 pr-7 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#3F72AF]"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Categories & Articles */}
              <div className="overflow-y-auto flex-1 p-3 space-y-4">
                {filteredGroups.map((group) => (
                  <div key={group.category} className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider">
                      {group.category}
                    </div>

                    <div className="space-y-0.5">
                      {group.articles.map((art) => {
                        const isActive = art.slug === activeArticle.slug;
                        return (
                          <button
                            key={art.slug}
                            onClick={() => handleSelectArticle(art.slug)}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-left transition-all ${
                              isActive
                                ? "bg-white text-[#3F72AF] shadow-2xs font-semibold border border-[#E2E8F0]"
                                : "text-[#475569] hover:bg-white"
                            }`}
                          >
                            <span
                              className={`p-1 rounded-md ${
                                isActive
                                  ? "bg-[#3F72AF]/10 text-[#3F72AF]"
                                  : "bg-white text-[#64748B] border border-[#E2E8F0]"
                              }`}
                            >
                              {renderDocIcon(art.icon, 13)}
                            </span>
                            <span className="flex-1 truncate">{art.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-3 bg-white border-t border-[#E2E8F0] text-center text-xs">
                <a
                  href="/"
                  className="text-[#64748B] hover:text-[#0F172A] font-medium"
                >
                  &larr; Back to Home
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
