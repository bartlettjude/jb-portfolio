"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/Tag";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { InquiryModal } from "@/components/inquiry/InquiryModal";
import clsx from "clsx";

const skills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Cursor AI", "Node.js"];
const qualifications: string[] = [];

export default function AboutPage() {
  const { ref: bioRef, visible: bioVisible } = useFadeInOnScroll();
  const { ref: snapshotRef, visible: snapshotVisible } = useFadeInOnScroll();
  const { ref: skillsRef, visible: skillsVisible } = useFadeInOnScroll();
  const { ref: qualsRef, visible: qualsVisible } = useFadeInOnScroll();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <PageShell
      title="About"
      eyebrow="The Story"
      description="A bit about who I am and what drives my work."
      animateTitle
    >
      <div className="grid gap-16 lg:grid-cols-3 lg:gap-20">
        {/* Main content - left 2 columns */}
        <div className="space-y-12 lg:col-span-2">
          {/* Bio section */}
          <div
            ref={bioRef as React.RefObject<HTMLDivElement>}
            className={clsx("fade-section space-y-6", bioVisible && "is-visible")}
          >
            <p className="text-lg leading-relaxed text-[var(--foreground)]">
              I'm a motivated and hardworking professional with strong leadership, communication, and
              customer service experience. I've managed teams, solved problems under pressure, and kept
              operations running smoothly in fast-paced environments—all while bringing a positive,
              people-focused attitude to every role.
            </p>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Outside of work, I'm a dedicated musician with years of creative experience, and I'm now
              expanding my skills in technology and web development. I love building things, learning
              quickly, and finding solutions that make experiences better for both teams and customers.
            </p>
          </div>

          {/* Skills section */}
          <div
            ref={skillsRef as React.RefObject<HTMLDivElement>}
            className={clsx("fade-section space-y-6", skillsVisible && "is-visible")}
          >
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                Skills & Tools
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Technologies I work with regularly
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Tag key={skill} label={skill} variant="accent" />
              ))}
            </div>
          </div>

          {/* Qualifications section */}
          <div
            ref={qualsRef as React.RefObject<HTMLDivElement>}
            className={clsx("fade-section space-y-6", qualsVisible && "is-visible")}
          >
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                Qualifications
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Certifications and formal training
              </p>
            </div>
            {qualifications.length === 0 ? (
              <p className="text-[var(--text-secondary)]">
                More coming soon. Currently focused on building and shipping.
              </p>
            ) : (
              <ul className="space-y-3">
                {qualifications.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--foreground)]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Sidebar - right column */}
        <div className="space-y-8">
          {/* Snapshot card */}
          <div
            ref={snapshotRef as React.RefObject<HTMLDivElement>}
            className={clsx(
              "fade-section rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6",
              snapshotVisible && "is-visible"
            )}
          >
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Quick Facts
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Name
                </dt>
                <dd className="mt-1 text-[var(--foreground)]">{siteConfig.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Role
                </dt>
                <dd className="mt-1 text-[var(--foreground)]">{siteConfig.role}</dd>
              </div>
              {siteConfig.location && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Location
                  </dt>
                  <dd className="mt-1 text-[var(--foreground)]">{siteConfig.location}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[var(--accent)] transition-colors hover:text-[var(--foreground)]"
                  >
                    {siteConfig.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* CTA card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Let's Connect
            </h3>
            <p className="mb-6 text-sm text-[var(--text-secondary)]">
              Interested in collaborating? Share a few details to start the conversation.
            </p>
            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="btn-primary w-full rounded-lg bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--background)] transition-all duration-300"
            >
              Start an Inquiry
            </button>
          </div>
        </div>
      </div>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </PageShell>
  );
}
