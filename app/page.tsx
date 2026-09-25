import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, FlaskConical, ScanText, Search, Workflow } from "lucide-react"
import type React from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { CopyEmail } from "@/components/copy-email"
import { SiteFooter } from "@/components/site-footer"
import { ProjectCard } from "@/components/project-card"
import { SiteHeader } from "@/components/site-header"
import { formatDate, getAllPosts } from "@/lib/posts"
import { getAllProjects } from "@/lib/projects"
import { site } from "@/lib/site"

// Canonical lives here rather than in the root layout, where every page would inherit "/".
export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

const focus = [
  {
    icon: Workflow,
    tint: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    title: "Agentic workflows",
    body: "LangGraph agents that read documents, compare options and draft decisions.",
  },
  {
    icon: ScanText,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    title: "Document intelligence",
    body: "Multimodal pipelines that turn messy PDFs into structured, checkable data.",
  },
  {
    icon: Search,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    title: "Retrieval",
    body: "Hybrid full-text and vector search over documents that keep changing.",
  },
  {
    icon: FlaskConical,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    title: "Evaluation",
    body: "Labelled datasets and harnesses that pick models on accuracy, latency and cost.",
  },
]

export default function Portfolio() {
  const posts = getAllPosts().slice(0, 5)
  const projects = getAllProjects()

  return (
    <main className="min-h-screen px-6 pt-16 md:pt-24">
      <div className="mx-auto max-w-[640px]">
        <BlurFade>
          <SiteHeader />
        </BlurFade>

        {/* Intro */}
        <BlurFade delay={0.1}>
          <section className="mt-14 space-y-5">
            <h1 className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em] text-balance md:text-[30px]">
              AI engineer building{" "}
              <span className="whitespace-nowrap text-muted-foreground">LLM systems</span> that hold
              up in production.
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I design and build LLM systems end to end: agentic workflows, document
              intelligence, retrieval, and the evaluation that shows whether any of it
              works. I care about what decides success in production: cost, latency,
              observability and knowing when an answer is wrong.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I currently work at{" "}
              <a href={site.company.url} target="_blank" rel="noopener" className="link">
                {site.company.name}
              </a>
              . On the side I build tools like{" "}
              <Link href="/projects/mindvault" className="link">
                MindVault
              </Link>
              , and I{" "}
              <Link href="/blog" className="link">
                write
              </Link>{" "}
              about what I learn. I&apos;m most interested in data systems for agents: retrieval
              over documents that change, and evaluating agents at scale.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Find me on{" "}
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
              ,{" "}
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                LinkedIn
              </a>{" "}
              and{" "}
              <a href={site.socials.x} target="_blank" rel="noopener noreferrer" className="link">
                X
              </a>
              , or write to me at{" "}
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
              .
            </p>
          </section>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background transition-opacity hover:opacity-90"
            >
              View resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
            </a>
            <CopyEmail />
          </div>
        </BlurFade>

        <Section title="Experience">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h3 className="text-[15px] font-medium">
              Founding Engineer ·{" "}
              <a href={site.company.url} target="_blank" rel="noopener" className="link">
                {site.company.name}
              </a>
            </h3>
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              Jun 2025 — Present
            </span>
          </div>
          <p className="mt-1 text-[14px] text-muted-foreground">
            AI-agentic sourcing platform for manufacturing procurement
          </p>
        </Section>
      </div>

      {/* Selected work — breaks out of the text column */}
      <section id="work" className="mx-auto mt-24 max-w-[960px]">
        <div className="mx-auto mb-6 flex max-w-[640px] items-baseline justify-between md:max-w-none">
          <h2 className="eyebrow">Selected work</h2>
          <Link
            href="/projects"
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            All projects →
          </Link>
        </div>
        <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade key={project.slug} delay={0.05 * i} inView>
              <ProjectCard project={project} index={i + 1} priority={i < 2} />
            </BlurFade>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[640px]">
        {/* Focus */}
        <Section title="What I work on">
          <ul className="space-y-4">
            {focus.map(({ icon: Icon, tint, title, body }) => (
              <li key={title} className="flex items-start gap-4">
                <span
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ring-foreground/5 ${tint}`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <p className="text-[15px] leading-relaxed">
                  <span className="text-foreground">{title}</span>
                  <span className="mx-2 text-border">•</span>
                  <span className="text-muted-foreground">{body}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Writing */}
        <Section title="Writing" action={{ href: "/blog", label: "All posts" }}>
          {posts.length === 0 ? (
            <p className="text-[15px] text-muted-foreground">No posts yet — check back soon.</p>
          ) : (
            <ul className="-mx-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-center justify-between gap-6 rounded-lg px-3 py-3 transition-colors hover:bg-secondary/70"
                  >
                    <span className="text-[15px]">{post.title}</span>
                    <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                      {formatDate(post.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* Contact */}
        <Section title="Contact">
          <p className="text-[22px] font-medium leading-snug tracking-[-0.02em] text-balance">
            Building something with AI?{" "}
            <span className="text-muted-foreground">
              I&apos;m always happy to talk shop.
            </span>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background transition-opacity hover:opacity-90"
            >
              Say hello
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <CopyEmail />
          </div>
        </Section>

        <SiteFooter />
      </div>
    </main>
  )
}

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: { href: string; label: string }
  children: React.ReactNode
}) {
  return (
    <BlurFade inView>
      <section className="mt-16 border-t border-dashed border-border pt-10">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="eyebrow">{title}</h2>
          {action && (
            <Link
              href={action.href}
              className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {action.label} →
            </Link>
          )}
        </div>
        {children}
      </section>
    </BlurFade>
  )
}
