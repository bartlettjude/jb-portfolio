"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

export default function ContactPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <PageShell
      title="Contact"
      eyebrow="Get in Touch"
      description="Have a project in mind or just want to say hello? I'd love to hear from you."
      animateTitle
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left column - Contact info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-[var(--foreground)]">
              Email is the fastest way to get in touch. I'm open to web projects, UI polishing, and
              collaborations involving AI-assisted workflows.
            </p>
            <p className="text-[var(--text-secondary)]">
              Whether you have a specific project in mind or just want to explore possibilities, I'm happy to chat.
            </p>
          </div>

          {/* Contact links */}
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Connect
            </h2>
            <div className="space-y-3">
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                      Email
                    </p>
                    <p className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {siteConfig.email}
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-[var(--text-secondary)] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}

              {siteConfig.socials.github && (
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                      GitHub
                    </p>
                    <p className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      View my code
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-[var(--text-secondary)] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}

              {siteConfig.socials.linkedin && (
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 transition-all duration-200 hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </span>
                  <div className="flex-1">
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                      LinkedIn
                    </p>
                    <p className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      Connect with me
                    </p>
                  </div>
                  <svg className="h-5 w-5 text-[var(--text-secondary)] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right column - Inquiry CTA */}
        <div>
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            {/* Background gradient */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, var(--accent-glow), transparent 70%)",
              }}
              aria-hidden="true"
            />
            
            <div className="relative p-8 sm:p-10">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                Project Inquiry
              </h2>
              <h3 className="mb-4 font-display text-2xl font-semibold text-[var(--foreground)]">
                Ready to start something?
              </h3>
              <p className="mb-8 text-[var(--text-secondary)]">
                Fill out a quick form with your project details. I'll review it and get back to you within 24-48 hours.
              </p>
              
              <button
                type="button"
                onClick={() => setInquiryOpen(true)}
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-4 text-base font-semibold text-[var(--background)] transition-all duration-300"
              >
                Start an Inquiry
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              {/* Trust indicators */}
              <div className="mt-8 flex items-center justify-center gap-6 text-xs text-[var(--text-secondary)]">
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  No spam
                </span>
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Quick response
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </PageShell>
  );
}
