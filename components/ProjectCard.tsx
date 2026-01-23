import Link from "next/link";
import clsx from "clsx";
import { Project } from "@/data/projects";
import { Tag } from "./Tag";

type ProjectCardProps = {
  project: Project;
  index?: number;
};

const statusStyles: Record<Project["status"], string> = {
  Planned: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const href = project.githubUrl || `/projects/${project.slug}`;
  const external = Boolean(project.githubUrl);

  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={clsx(
        "card-animate group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 transition-all duration-300",
        "hover:border-[var(--accent)]/50 hover:bg-[var(--muted)]/50",
        `card-stagger-${Math.min(index + 1, 6)}`
      )}
      style={{ opacity: 0 }}
    >
      {/* Hover glow effect */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,107,53,0.06), transparent 40%)",
        }}
        aria-hidden="true"
      />

      {/* Status & Type badges */}
      <div className="mb-5 flex items-center gap-2">
        <span
          className={clsx(
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
            statusStyles[project.status]
          )}
        >
          {project.status}
        </span>
        <span className="rounded-full border border-[var(--border)] bg-[var(--muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
          {project.type}
        </span>
      </div>

      {/* Project name */}
      <h3 className="mb-3 text-xl font-semibold text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)]">
        {project.name}
      </h3>

      {/* Description */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
        {project.shortDescription}
      </p>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <Tag key={tech} label={tech} variant="muted" />
        ))}
        {project.techStack.length > 4 && (
          <Tag label={`+${project.techStack.length - 4}`} variant="muted" />
        )}
      </div>

      {/* View link */}
      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
        <span>View project</span>
        <svg 
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}
