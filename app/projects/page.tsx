import { getAllProjects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";

const projects = getAllProjects();

const statusOrder = ["In Progress", "Completed", "Planned"] as const;

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      eyebrow="My Work"
      description="A collection of projects I've built—from experiments to polished products. Each one taught me something new."
      animateTitle
    >
      <div className="space-y-16">
        {statusOrder.map((status) => {
          const group = projects.filter((project) => project.status === status);
          if (!group.length) return null;

          return (
            <section key={status} className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="font-display text-2xl font-semibold text-[var(--foreground)]">
                  {status}
                </h2>
                <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-sm text-[var(--text-secondary)]">
                  {group.length}
                </span>
              </div>
              <ProjectGrid projects={group} />
            </section>
          );
        })}

        {projects.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-12 text-center">
            <p className="text-[var(--text-secondary)]">
              No projects yet. Add entries to{" "}
              <code className="rounded bg-[var(--muted)] px-2 py-1 text-xs">data/projects.ts</code>{" "}
              to populate this page.
            </p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
