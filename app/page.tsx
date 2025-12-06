"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { getHighlightedProjects } from "@/data/projects";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";

const highlightedProjects = getHighlightedProjects();

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16">
      <div className="bg-[var(--card)]/60">
        <Container className="flex flex-col gap-10 py-12 sm:flex-row sm:items-center sm:gap-16 sm:py-16">
          {/* Update your name, role, and tagline in data/siteConfig.ts */}
          <div className="flex-1 space-y-5">
            <p
              className={`text-sm font-semibold uppercase tracking-[0.18em] text-gray-500 transition-all duration-300 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              Portfolio
            </p>
            <h1
              className={`text-4xl font-semibold leading-tight text-gray-900 transition-all duration-300 ease-out sm:text-5xl ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {siteConfig.name}
            </h1>
            <p
              className={`text-lg font-medium text-gray-800 transition-all duration-300 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              {siteConfig.role}
            </p>
            <p
              className={`max-w-2xl text-base text-gray-600 transition-all duration-400 ease-out ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
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
          <div className="flex-1 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-white to-[color-mix(in_srgb,var(--accent)_8%,white)] p-6 shadow-sm">
            <div className="space-y-3 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">What to expect</p>
              <ul className="space-y-2">
                <li>• Clean, thoughtful web experiences</li>
                <li>• Systems that are easy to maintain</li>
                <li>• AI-assisted workflows to move fast</li>
              </ul>
              <p className="text-xs text-gray-500">
                Content is data-driven. To update projects, edit <code>data/projects.ts</code>.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Section
        title="Highlighted work"
        description="A few projects that represent my recent focus. Every page pulls from the data file—no hardcoded content."
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
    </div>
  );
}
