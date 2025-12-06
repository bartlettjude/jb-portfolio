import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/Button";

export default function ContactPage() {
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
        <div className="flex flex-col gap-3">
          <Button href={`mailto:${siteConfig.email}`} variant="primary">
            Email {siteConfig.name}
          </Button>
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
        </div>
      </div>
    </PageShell>
  );
}

