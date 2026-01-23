import Link from "next/link";
import type { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { PageShell } from "@/components/PageShell";
import { Tag } from "@/components/Tag";
import { Button } from "@/components/Button";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const statusStyles = {
  Planned: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
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
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const demoLink = project?.demoUrl || project?.githubUrl;

  if (!project) {
    return (
      <PageShell title="Project not found" eyebrow="Error">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center">
          <p className="text-[var(--text-secondary)]">
            This project does not exist yet. Try another link.
          </p>
          <div className="mt-6">
            <Button href="/projects" variant="ghost">
              Back to all projects
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title={project.name}
      eyebrow={project.type}
      description={project.shortDescription}
      animateTitle
    >
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        {/* Main content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Overview */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Overview
            </h2>
            <p className="text-lg leading-relaxed text-[var(--foreground)]">
              {project.fullDescription}
            </p>
          </div>

          {/* Tech stack */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <Tag key={tech} label={tech} variant="accent" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Meta info */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
              Project Info
            </h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Status
                </dt>
                <dd className="mt-2">
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
                  >
                    {project.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                  Type
                </dt>
                <dd className="mt-1 text-[var(--foreground)]">{project.type}</dd>
              </div>
              {project.role && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Role
                  </dt>
                  <dd className="mt-1 text-[var(--foreground)]">{project.role}</dd>
                </div>
              )}
              {project.createdAt && (
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">
                    Started
                  </dt>
                  <dd className="mt-1 text-[var(--foreground)]">
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* Links */}
          <div className="space-y-3">
            {demoLink && (
              <Button href={demoLink} external className="w-full justify-center">
                View Live
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="ghost" external className="w-full justify-center">
                View on GitHub
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-12 border-t border-[var(--border)] pt-8">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--foreground)]"
        >
          <svg className="h-4 w-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to all projects
        </Link>
      </div>
    </PageShell>
  );
}
