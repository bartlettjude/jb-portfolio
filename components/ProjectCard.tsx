import Link from "next/link";
import clsx from "clsx";
import { Project } from "@/data/projects";
import { Tag } from "./Tag";

type ProjectCardProps = {
  project: Project;
};

const statusCopy: Record<Project["status"], string> = {
  Planned: "Planned",
  "In Progress": "In Progress",
  Completed: "Completed",
};

const statusStyles: Record<Project["status"], string> = {
  Planned: "bg-amber-50 text-amber-700 border border-amber-100",
  "In Progress": "bg-blue-50 text-blue-700 border border-blue-100",
  Completed: "bg-emerald-50 text-emerald-700 border border-emerald-100",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 ease-out hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg hover:brightness-[1.02] active:scale-[0.98]"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-600">
        <span
          className={clsx(
            "inline-flex items-center rounded-full px-2.5 py-1",
            statusStyles[project.status],
          )}
        >
          {statusCopy[project.status]}
        </span>
        <span className="text-gray-400">•</span>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-700">
          {project.type}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--accent)]">
        {project.name}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm text-gray-600">{project.shortDescription}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.slice(0, 4).map((tech) => (
          <Tag key={tech} label={tech} variant="muted" />
        ))}
        {project.techStack.length > 4 && (
          <Tag label={`+${project.techStack.length - 4}`} variant="muted" />
        )}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
        View details
        <span aria-hidden className="transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}

