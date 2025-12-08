"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/Button";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

export default function ContactPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <PageShell
      title="Contact"
      description="Ways to reach me for opportunities, collaborations, or feedback."
    >
      <div className="space-y-4 text-gray-700">
        <p>
          Email is the fastest way to get in touch. I’m open to web projects, UI polishing, and
          collaborations involving AI-assisted workflows.
        </p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-[var(--accent)]">
          {siteConfig.socials.github && (
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              GitHub
            </a>
          )}
          {siteConfig.socials.linkedin && (
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="link-underline"
            >
              LinkedIn
            </a>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--border)_70%,transparent)] bg-[color-mix(in_srgb,#f8fafc_90%,white)] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Inquiry
              </p>
              <p className="text-base text-gray-700">
                Want to discuss a project? Share a few details to get started.
              </p>
            </div>
            <Button href="#" onClick={() => setInquiryOpen(true)} className="!text-white">
              Begin Inquiry
            </Button>
          </div>
        </div>

        <InquiryModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      </div>
    </PageShell>
  );
}

