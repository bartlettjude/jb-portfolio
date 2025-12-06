 "use client";

import { siteConfig } from "@/data/siteConfig";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/Tag";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import clsx from "clsx";

const skills = ["React", "TypeScript", "Next.js", "Tailwind CSS", "Cursor AI", "Node.js"];

export default function AboutPage() {
  const { ref: introRef, visible: introVisible } = useFadeInOnScroll();
  const { ref: snapshotRef, visible: snapshotVisible } = useFadeInOnScroll();
  const { ref: skillsRef, visible: skillsVisible } = useFadeInOnScroll();

  return (
    <PageShell
      title="About"
      description=""
      animateTitle
    >
      <div className="space-y-6 text-gray-700">
        {/* Edit your bio below to personalize the page */}
        <div
          ref={introRef as React.RefObject<HTMLDivElement>}
          className={clsx("fade-section", introVisible && "is-visible")}
        >
          <p>
            I’m a motivated and hardworking professional with strong leadership, communication, and
            customer service experience. I’ve managed teams, solved problems under pressure, and kept
            operations running smoothly in fast-paced environments, all while bringing a positive,
            people-focused attitude to every role.
          </p>
          <p className="mt-3">
            Outside of work, I’m a dedicated musician with years of creative experience, and I’m now
            expanding my skills in technology and web development. I love building things, learning
            quickly, and finding solutions that make experiences better for both teams and customers.
          </p>
        </div>

        <div
          ref={snapshotRef as React.RefObject<HTMLDivElement>}
          className={clsx("space-y-3 fade-section", snapshotVisible && "is-visible")}
        >
          <p className="font-semibold text-gray-900">Snapshot</p>
          <ul className="space-y-2 text-sm">
            <li>• Name: {siteConfig.name}</li>
            <li>• Role: {siteConfig.role}</li>
            {siteConfig.location && <li>• Location: {siteConfig.location}</li>}
            <li>• Email: {siteConfig.email}</li>
          </ul>
        </div>

        <div
          ref={skillsRef as React.RefObject<HTMLDivElement>}
          className={clsx("space-y-3 fade-section", skillsVisible && "is-visible")}
        >
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

