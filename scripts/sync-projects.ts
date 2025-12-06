import fs from "fs";
import path from "path";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_LOGIN = process.env.GITHUB_LOGIN || "bartlettjude";
const PROJECTS_FILE = path.join(process.cwd(), "data", "projects.ts");

type Repo = {
  name: string;
  description: string | null;
  homepageUrl: string | null;
  url: string;
  createdAt: string;
  pushedAt: string;
};

type ProjectStatus = "Planned" | "In Progress" | "Completed";
type ProjectType = "Web App" | "Tool" | "Experiment" | "Portfolio";

type Project = {
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

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeQuotes(text: string) {
  return text.replace(/"/g, '\\"');
}

async function fetchPinned(): Promise<Repo[]> {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing GITHUB_TOKEN env var. Create a fine-grained token with repo metadata access.");
  }

  const query = `
    query Pinned($login: String!) {
      user(login: $login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              homepageUrl
              url
              createdAt
              pushedAt
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
  });

  const json = await res.json();
  if (!res.ok || !json?.data?.user?.pinnedItems?.nodes) {
    throw new Error(`GitHub API error: ${JSON.stringify(json, null, 2)}`);
  }

  return json.data.user.pinnedItems.nodes as Repo[];
}

function mapRepoToProject(repo: Repo, index: number): Project {
  const description =
    repo.description || "A GitHub project with an in-progress description.";

  return {
    slug: slugify(repo.name),
    name: repo.name,
    shortDescription: description,
    fullDescription: description,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    type: "Web App",
    role: "Solo Developer",
    githubUrl: repo.url,
    demoUrl: repo.homepageUrl || repo.url,
    createdAt: repo.createdAt,
    updatedAt: repo.pushedAt,
    // Highlight the first few repos to feature them on Home
    highlighted: index < 3,
  };
}

function dedupeProjects(projects: Project[]): Project[] {
  const seen = new Set<string>();
  const result: Project[] = [];
  for (const project of projects) {
    if (seen.has(project.slug)) continue;
    seen.add(project.slug);
    result.push(project);
  }
  return result;
}

function formatProject(project: Project) {
  const fields = [
    `slug: "${project.slug}"`,
    `name: "${escapeQuotes(project.name)}"`,
    `shortDescription: "${escapeQuotes(project.shortDescription)}"`,
    `fullDescription: "${escapeQuotes(project.fullDescription)}"`,
    `techStack: [${project.techStack.map((t) => `"${escapeQuotes(t)}"`).join(", ")}]`,
    `status: "${project.status}"`,
    `type: "${project.type}"`,
  ];

  if (project.role) fields.push(`role: "${escapeQuotes(project.role)}"`);
  if (project.githubUrl) fields.push(`githubUrl: "${project.githubUrl}"`);
  if (project.demoUrl) fields.push(`demoUrl: "${project.demoUrl}"`);
  if (project.createdAt) fields.push(`createdAt: "${project.createdAt}"`);
  if (project.updatedAt) fields.push(`updatedAt: "${project.updatedAt}"`);
  if (project.highlighted !== undefined) fields.push(`highlighted: ${project.highlighted}`);

  return `  {\n    ${fields.join(",\n    ")}\n  }`;
}

function buildFile(projects: Project[]) {
  const exampleBlock = `// How to add a project:
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
`;

  const header = `// AUTO-GENERATED by scripts/sync-projects.ts
// - Pinned GitHub repos for ${GITHUB_LOGIN} are pulled in automatically.
// - Manual projects are appended from this script.
// - Edit data here directly if you prefer; or run: npm run sync:projects
//
`;

  const typeDefs = `export type ProjectStatus = "Planned" | "In Progress" | "Completed";
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
`;

  const body = `export const projects: Project[] = [
${projects.map(formatProject).join(",\n")}
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
`;

  return `${header}${exampleBlock}${typeDefs}\n${body}`;
}

async function main() {
  console.log(`Fetching pinned repositories for ${GITHUB_LOGIN}...`);
  const repos = await fetchPinned();
  const mapped = repos.map((repo, idx) => mapRepoToProject(repo, idx));

  const combined = dedupeProjects(mapped);
  const fileContent = buildFile(combined);

  fs.writeFileSync(PROJECTS_FILE, fileContent, "utf8");
  console.log(`Updated ${PROJECTS_FILE} with ${combined.length} projects.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

