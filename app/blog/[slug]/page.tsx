import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
    <main className="min-h-screen px-6 pt-16 md:pt-24">
      <div className="mx-auto max-w-[640px]">
        <SiteHeader />

        <Link
          href="/blog"
          className="mt-14 inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          All posts
        </Link>

        <header className="mt-6 space-y-2">
          <h1 className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-balance md:text-[30px]">
            {post.meta.title}
          </h1>
          <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {formatDate(post.meta.date)}
          </p>
        </header>

        <article
          className="prose prose-stone mt-10 max-w-none text-[15px] leading-relaxed dark:prose-invert
            prose-headings:font-medium prose-headings:tracking-[-0.02em]
            prose-h2:mt-10 prose-h2:text-[18px]
            prose-p:text-foreground/85
            prose-a:text-foreground prose-a:decoration-muted-foreground/40 prose-a:decoration-dotted prose-a:underline-offset-[5px] hover:prose-a:decoration-foreground
            prose-code:font-mono prose-code:text-[13px] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:bg-card prose-pre:text-foreground
            prose-hr:border-dashed prose-hr:border-border prose-img:rounded-xl"
        >
          <MDXRemote source={post.content} />
        </article>

        <SiteFooter />
      </div>
    </main>
  )
}
