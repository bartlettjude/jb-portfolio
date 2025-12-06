import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/Tag";

const skills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Cursor AI", "Node.js"];

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description="Update this content anytime in app/about/page.tsx. Your name, role, and socials come from data/siteConfig.ts."
    >
      <div className="space-y-6 text-gray-700">
        {/* Edit your bio below to personalize the page */}
        <p>
          I build web experiences that balance clarity, performance, and maintainability. I enjoy
          pairing strong UI foundations with automation to move quickly without sacrificing quality.
        </p>
        <p>
          Recently I have been leaning on Cursor to iterate faster, keep structure tight, and ship
          projects that are easy to extend. I appreciate clean design systems, sensible data models,
          and thoughtful documentation.
        </p>
        <div className="space-y-3">
          <p className="font-semibold text-gray-900">Snapshot</p>
          <ul className="space-y-2 text-sm">
            <li>• Name: {siteConfig.name}</li>
            <li>• Role: {siteConfig.role}</li>
            {siteConfig.location && <li>• Location: {siteConfig.location}</li>}
            <li>• Email: {siteConfig.email}</li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="font-semibold text-gray-900">Skills & tools</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Tag key={skill} label={skill} variant="muted" />
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

