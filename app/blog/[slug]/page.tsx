import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.meta.title} | Prathamesh Bhandekar`,
    description: post.meta.summary,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All posts
        </Link>

        <header className="mt-10 space-y-3">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {formatDate(post.meta.date)}
          </p>
          <h1 className="text-3xl md:text-4xl font-light leading-[1.1] tracking-[-0.03em]">
            {post.meta.title}
          </h1>
        </header>

        <article
          className="prose prose-invert mt-12 max-w-none
            prose-headings:font-light prose-headings:tracking-[-0.02em]
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-code:font-mono prose-code:text-primary prose-code:before:content-none prose-code:after:content-none
            prose-pre:border prose-pre:border-border prose-pre:bg-card
            prose-hr:border-border prose-img:rounded-md"
        >
          <MDXRemote source={post.content} />
        </article>
      </div>
    </div>
  )
}
