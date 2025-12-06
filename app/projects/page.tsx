import { getAllProjects } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { ProjectGrid } from "@/components/ProjectGrid";

const projects = getAllProjects();

const statusOrder = ["In Progress", "Completed", "Planned"] as const;

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      description="All projects are powered by data/projects.ts. Add or edit entries there to keep this page up to date."
    >
      <div className="space-y-10">
        {statusOrder.map((status) => {
          const group = projects.filter((project) => project.status === status);
          if (!group.length) return null;

          return (
            <section key={status} className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">{status}</h2>
                <span className="text-sm text-gray-500">({group.length})</span>
              </div>
              <ProjectGrid projects={group} />
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}

