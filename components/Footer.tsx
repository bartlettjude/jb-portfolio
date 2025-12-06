import { siteConfig } from "@/data/siteConfig";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] py-8 text-sm text-gray-600">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {siteConfig.socials.github && (
            <a
              href={siteConfig.socials.github}
              className="transition hover:text-[var(--accent)]"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {siteConfig.socials.linkedin && (
            <a
              href={siteConfig.socials.linkedin}
              className="transition hover:text-[var(--accent)]"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}

