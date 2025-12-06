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

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20">
      <div className="relative overflow-hidden bg-[var(--card)]/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.12),transparent_40%)] opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(17,24,39,0.06),transparent_35%)]" />
        <Container className="relative flex flex-col gap-12 py-16 sm:flex-row sm:items-center sm:gap-20 sm:py-20">
          {/* Update your name, role, and tagline in data/siteConfig.ts */}
          <div className="flex-1 space-y-6">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 transition-all duration-300 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Portfolio
            </p>
            <h1
              className={`text-4xl font-extrabold leading-tight tracking-[-0.02em] text-gray-900 transition-all duration-300 ease-out sm:text-5xl ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {siteConfig.name}
            </h1>
            <p
              className={`text-lg font-semibold text-gray-800 transition-all duration-300 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
              }`}
            >
              {siteConfig.role}
            </p>
            <p
              className={`max-w-2xl text-base leading-relaxed text-gray-600 transition-all duration-400 ease-out ${
                loaded ? "opacity-90 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {siteConfig.tagline}
            </p>
            <div
              className={`flex flex-wrap items-center gap-3 transition-all duration-400 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <Button href="/projects">View Projects</Button>
              <Button href="/about" variant="ghost">
                About Me
              </Button>
            </div>
          </div>
          <div className="flex-1 rounded-2xl border border-white/60 bg-gradient-to-br from-white via-[color-mix(in_srgb,var(--accent)_6%,white)] to-[color-mix(in_srgb,var(--accent)_10%,white)] p-7 shadow-md shadow-gray-200/70">
            <div className="space-y-4 text-sm text-gray-700">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                What to expect
              </p>
              <ul className="space-y-3">
                <li>• Clean, thoughtful web experiences designed with purpose</li>
                <li>• Systems that stay maintainable as they grow</li>
                <li>• Fast, consistent workflows that deliver on time</li>
                <li>• Interfaces built for clarity, usability, and long-term reliability</li>
                <li>• A focus on performance, stability, and attention to detail</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      <Section
        title="Highlighted work"
        description="A few projects that represent my recent focus. Every page pulls from the data file—no hardcoded content."
        eyebrow="Recent projects"
        className="rounded-[24px] bg-[color-mix(in_srgb,#f8fafc_85%,white)] border border-[color-mix(in_srgb,var(--border)_60%,transparent)]"
      >
        {highlightedProjects.length ? (
          <>
            <ProjectGrid projects={highlightedProjects} />
            <div className="mt-6">
              <Button href="/projects" variant="ghost">
                View all projects
              </Button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Add projects to data/projects.ts to see them here.</p>
        )}
      </Section>

      <Section
        title="Start an Inquiry"
        description="Interested in working together? Share a few details below."
        className="rounded-[24px] border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[color-mix(in_srgb,#f8fafc_90%,white)]"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
              Inquiry
            </p>
            <p className="text-base text-gray-600">
              Interested in working together? Share a few details below.
            </p>
          </div>
          <Button onClick={() => setInquiryOpen(true)} href="#" variant="primary">
            Begin Inquiry
          </Button>
        </div>
      </Section>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </div>
  );
}
