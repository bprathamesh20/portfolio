import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { getAllPosts, formatDate } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog | Prathamesh Bhandekar",
  description: "Notes on engineering, AI, and side projects by Prathamesh Bhandekar.",
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12 lg:p-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <header className="mt-10 space-y-4">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Writing
          </p>
          <h1 className="text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.03em]">
            Blog
          </h1>
          <p className="text-muted-foreground">
            Notes on engineering, AI, and the side projects I build along the way.
          </p>
        </header>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {posts.length === 0 && (
            <p className="py-8 text-muted-foreground">No posts yet — check back soon.</p>
          )}
          {posts.map((post, i) => (
            <BlurFade key={post.slug} delay={0.1 + i * 0.1} inView>
              <Link href={`/blog/${post.slug}`} className="group block py-8">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-2 flex items-center gap-1.5 text-xl font-medium transition-colors group-hover:text-primary">
                  {post.title}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                </h2>
                {post.summary && (
                  <p className="mt-1.5 text-muted-foreground">{post.summary}</p>
                )}
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </div>
  )
}
