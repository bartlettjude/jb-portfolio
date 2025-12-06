// How to add a project:
// 1) Copy the example object below.
// 2) Paste it into the projects array.
// 3) Update each field with your details. Required fields: slug, name,
//    shortDescription, fullDescription, techStack, status, type.
// 4) Keep the slug unique (it becomes the page URL: /projects/your-slug).
//
// Example:
// const example: Project = {
//   slug: "my-new-idea",
//   name: "My New Idea",
//   shortDescription: "A one-line summary visitors will see in the card.",
//   fullDescription:
//     "A few sentences explaining what the project does, why you built it, and any notable results.",
//   techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
//   status: "In Progress",
//   type: "Web App",
//   role: "Solo Developer",
//   githubUrl: "https://github.com/your-handle/my-new-idea",
//   demoUrl: "https://my-new-idea.example.com",
//   createdAt: "2024-12-01",
//   updatedAt: "2024-12-10",
//   highlighted: true,
// };

export type ProjectStatus = "Planned" | "In Progress" | "Completed";
export type ProjectType = "Web App" | "Tool" | "Experiment" | "Portfolio";

export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  status: ProjectStatus;
  type: ProjectType;
  role?: string;
  githubUrl?: string;
  demoUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  highlighted?: boolean;
};

export const projects: Project[] = [
  {
    slug: "verbal-vandal",
    name: "Verbal Vandal",
    shortDescription:
      "A playful AI sidekick that crafts clever, over-the-top roasts on demand.",
    fullDescription:
      "Built an AI-powered web tool that delivers witty, cheeky insults on request. Emphasizes fast UX with responsive UI states, copy-to-clipboard for punchlines, and guardrails to keep things light-hearted.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
    status: "Completed",
    type: "Web App",
    role: "Solo Developer",
    githubUrl: "https://github.com/bartlettjude/Verbal-Vandal",
    createdAt: "2024-09-15",
    updatedAt: "2024-10-01",
    highlighted: true,
  },
  {
    slug: "track-tempo",
    name: "Track Tempo",
    shortDescription:
      "A minimal tracker for practice sessions and tempo changes, built for musicians.",
    fullDescription:
      "Lightweight tool for logging practice intervals, BPM changes, and streaks. Keeps data lean, works offline-first, and uses clear visual cues so you can focus on the session instead of the UI.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    type: "Tool",
    role: "Solo Developer",
    githubUrl: "https://github.com/bartlettjude/Track-Tempo",
    createdAt: "2024-07-10",
    updatedAt: "2024-08-01",
    highlighted: false,
  },
];

function sortValue(dateString?: string) {
  return dateString ? new Date(dateString).getTime() : 0;
}

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => sortValue(b.createdAt) - sortValue(a.createdAt));
}

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getHighlightedProjects(): Project[] {
  return projects.filter((project) => project.highlighted);
}

