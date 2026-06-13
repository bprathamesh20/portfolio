import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export type PostMeta = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      summary: data.summary ?? "",
      tags: data.tags ?? [],
    },
    content,
  }
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug)?.meta)
    .filter((meta): meta is PostMeta => Boolean(meta))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function formatDate(date: string): string {
  if (!date) return ""
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
