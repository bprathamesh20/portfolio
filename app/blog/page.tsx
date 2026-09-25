import Link from "next/link"
import type { Metadata } from "next"
import { BlurFade } from "@/components/magicui/blur-fade"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getAllPosts, formatDate } from "@/lib/posts"

const description = "Notes on engineering, AI, and side projects by Prathamesh Bhandekar."

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Blog | Prathamesh Bhandekar",
    description,
    siteName: "Prathamesh Bhandekar",
    images: ["/opengraph-image.png"],
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen px-6 pt-16 md:pt-24">
      <div className="mx-auto max-w-[640px]">
        <BlurFade>
          <SiteHeader />
        </BlurFade>

        <BlurFade delay={0.1}>
          <header className="mt-14 space-y-3">
            <h1 className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em] md:text-[30px]">
              Writing
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Notes on engineering, AI, and the side projects I build along the way.
            </p>
          </header>
        </BlurFade>

        <section className="mt-12 border-t border-dashed border-border pt-6">
          {posts.length === 0 && (
            <p className="py-6 text-[15px] text-muted-foreground">No posts yet — check back soon.</p>
          )}
          <ul className="-mx-3">
            {posts.map((post, i) => (
              <li key={post.slug}>
                <BlurFade delay={0.15 + i * 0.05} inView>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-lg px-3 py-4 transition-colors hover:bg-secondary/70"
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <h2 className="text-[15px] font-medium">{post.title}</h2>
                      <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                        {formatDate(post.date)}
                      </span>
                    </div>
                    {post.summary && (
                      <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                        {post.summary}
                      </p>
                    )}
                  </Link>
                </BlurFade>
              </li>
            ))}
          </ul>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}
