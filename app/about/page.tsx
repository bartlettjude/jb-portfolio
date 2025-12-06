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
          I’m a motivated and hardworking professional with strong leadership, communication, and
          customer service experience. I’ve managed teams, solved problems under pressure, and kept
          operations running smoothly in fast-paced environments, all while bringing a positive,
          people-focused attitude to every role.
        </p>
        <p>
          Outside of work, I’m a dedicated musician with years of creative experience, and I’m now
          growing my skills in technology and AI-driven fields. I love building things, learning
          quickly, and finding solutions that make experiences better for both teams and customers.
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

