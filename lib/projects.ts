import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export type ProjectLink = { label: string; url: string }

export type ProjectMeta = {
  slug: string
  title: string
  tag: string
  summary: string
  description: string
  year: string
  role: string
  image: string
  imageAlt: string
  live?: string
  source: ProjectLink[]
  stack: string[]
  order: number
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return []
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getProjectBySlug(slug: string): { meta: ProjectMeta; content: string } | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"))

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      tag: data.tag ?? "",
      summary: data.summary ?? "",
      description: data.description ?? data.summary ?? "",
      year: data.year ?? "",
      role: data.role ?? "",
      image: data.image ?? "",
      imageAlt: data.imageAlt ?? data.title ?? slug,
      live: data.live,
      source: data.source ?? [],
      stack: data.stack ?? [],
      order: data.order ?? 99,
    },
    content,
  }
}

export function getAllProjects(): ProjectMeta[] {
  return getProjectSlugs()
    .map((slug) => getProjectBySlug(slug)?.meta)
    .filter((meta): meta is ProjectMeta => Boolean(meta))
    .sort((a, b) => a.order - b.order)
}
