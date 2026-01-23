"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { getHighlightedProjects } from "@/data/projects";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

const highlightedProjects = getHighlightedProjects();

function Waveform() {
  const [heights, setHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate random heights only on the client to avoid hydration mismatch
    setHeights(Array.from({ length: 12 }, () => 20 + Math.random() * 44));
  }, []);

  return (
    <div className="flex items-end justify-center gap-1" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="waveform-bar h-16 w-1 rounded-full bg-[var(--accent)] transition-[height] duration-500"
          style={{
            height: heights[i] ? `${heights[i]}px` : "32px",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="space-y-0">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Grid pattern background */}
        <div className="pointer-events-none absolute inset-0 grid-pattern opacity-50" aria-hidden="true" />
        
        {/* Animated accent gradient */}
        <div 
          className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]"
          style={{ background: "var(--accent)" }}
          aria-hidden="true"
        />

        <Container className="relative flex min-h-[90vh] flex-col justify-center py-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
            {/* Left column - Content */}
            <div className="space-y-8">
              {/* Eyebrow */}
              <div
                className={`transition-all duration-700 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  Available for projects
                </span>
              </div>

              {/* Main heading */}
              <h1
                className={`font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl transition-all duration-700 delay-100 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-[var(--foreground)]">Hi, I'm </span>
                <span className="text-accent-gradient">{siteConfig.name.split(" ")[0]}</span>
                <span className="text-[var(--foreground)]">.</span>
              </h1>

              {/* Role */}
              <p
                className={`text-xl font-medium text-[var(--foreground)] sm:text-2xl transition-all duration-700 delay-200 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {siteConfig.role}
              </p>

              {/* Tagline */}
              <p
                className={`max-w-lg text-lg leading-relaxed text-[var(--text-secondary)] transition-all duration-700 delay-300 ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {siteConfig.tagline}
              </p>

              {/* CTA buttons */}
              <div
                className={`flex flex-wrap items-center gap-4 transition-all duration-700 delay-[400ms] ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Button href="/projects" size="lg">
                  View My Work
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
                <Button href="/about" variant="ghost" size="lg">
                  About Me
                </Button>
              </div>
            </div>

            {/* Right column - Visual element */}
            <div
              className={`relative flex items-center justify-center transition-all duration-1000 delay-500 ease-out ${
                loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Card with waveform */}
              <div className="relative w-full max-w-md">
                {/* Glow behind card */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                  style={{ background: "var(--accent-glow)" }}
                  aria-hidden="true"
                />
                
                <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)]/80 p-8 backdrop-blur-xl">
                  {/* Waveform visualization */}
                  <div className="mb-8 flex justify-center">
                    <Waveform />
                  </div>
                  
                  {/* Value props */}
                  <div className="space-y-4">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                      What I bring
                    </p>
                    <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>Clean, thoughtful web experiences designed with purpose</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>Systems that stay maintainable as they grow</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>Fast, consistent workflows that deliver on time</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>A focus on performance, clarity, and attention to detail</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-[var(--text-secondary)]">
              <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
              <div className="h-12 w-px bg-gradient-to-b from-[var(--text-secondary)] to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================
          PROJECTS SECTION
          ============================================ */}
      <Section
        title="Selected Work"
        description="A curated selection of recent projects. Each one built with care, tested thoroughly, and shipped on time."
        eyebrow="Featured Projects"
        className="border-t border-[var(--border)]"
      >
        {highlightedProjects.length ? (
          <>
            <ProjectGrid projects={highlightedProjects} />
            <div className="mt-10 flex justify-center">
              <Button href="/projects" variant="ghost">
                View All Projects
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              Projects coming soon. Add entries to <code className="rounded bg-[var(--muted)] px-2 py-1 text-xs">data/projects.ts</code> to see them here.
            </p>
          </div>
        )}
      </Section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <Section className="border-t border-[var(--border)]">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
          {/* Background gradient */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, var(--accent-glow), transparent 70%)",
            }}
            aria-hidden="true"
          />
          
          <div className="relative flex flex-col items-center gap-6 px-8 py-16 text-center sm:py-20">
            <h2 className="font-display text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
              Let's build something together
            </h2>
            <p className="max-w-md text-[var(--text-secondary)]">
              Have a project in mind? I'd love to hear about it. Share a few details and let's start the conversation.
            </p>
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="btn-primary mt-2 inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-8 py-4 text-base font-semibold text-[var(--background)] transition-all duration-300"
            >
              Start an Inquiry
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </Section>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
