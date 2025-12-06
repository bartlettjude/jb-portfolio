import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";

type ProjectPageProps = {
  params: { slug: string };
};

const statusStyles = {
  Planned: "bg-amber-50 text-amber-700 border border-amber-100",
  "In Progress": "bg-blue-50 text-blue-700 border border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.name} | Project`,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = params;
  // Project content is sourced from data/projects.ts
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <PageShell title="Project not found">
        <p className="text-gray-600">This project does not exist yet. Try another link.</p>
        <div className="mt-6">
          <Button href="/projects" variant="ghost">
            Back to all projects
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={project.name}
      description={project.shortDescription}
      className="space-y-6"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
        <span className={`rounded-full px-3 py-1 ${statusStyles[project.status]}`}>
          {project.status}
        </span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">{project.type}</span>
        {project.role && (
          <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">Role: {project.role}</span>
        )}
      </div>

      <div className="space-y-4 text-base leading-relaxed text-gray-700">
        <p>{project.fullDescription}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Tag key={tech} label={tech} variant="muted" />
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {project.githubUrl && (
          <Button href={project.githubUrl} variant="ghost" external>
            View on GitHub
          </Button>
        )}
        {project.demoUrl && (
          <Button href={project.demoUrl} variant="primary" external>
            Live demo
          </Button>
        )}
      </div>

      <Link
        href="/projects"
        className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]"
      >
        ← Back to all projects
      </Link>
    </PageShell>
  );
}

