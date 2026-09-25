import Image from "next/image"
import Link from "next/link"
import { Activity, ArrowUpRight, Bot, FileSearch, PanelsTopLeft } from "lucide-react"
import type React from "react"
import { BlurFade } from "@/components/magicui/blur-fade"
import { CopyEmail } from "@/components/copy-email"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { formatDate, getAllPosts } from "@/lib/posts"
import { projects, site, type Project } from "@/lib/site"

const focus = [
  {
    icon: Bot,
    tint: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    title: "AI agents",
    body: "LLM orchestration, tool use, and agents that finish the job.",
  },
  {
    icon: FileSearch,
    tint: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    title: "RAG",
    body: "Retrieval pipelines that ground answers in the right sources.",
  },
  {
    icon: PanelsTopLeft,
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    title: "Interfaces",
    body: "The product surfaces that make agents usable by real people.",
  },
  {
    icon: Activity,
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    title: "Production",
    body: "Systems that stay reliable, observable, and cheap once traffic hits.",
  },
]

export default function Portfolio() {
  const posts = getAllPosts().slice(0, 5)

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
              Full-stack engineer building{" "}
              <span className="whitespace-nowrap text-muted-foreground">AI agents</span> that ship to
              production.
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I work across the stack — LLM orchestration, RAG, and the interfaces that
              make agents usable. I care about systems that stay reliable, observable,
              and cheap to run once real traffic hits. I also{" "}
              <Link href="/blog" className="link">
                write
              </Link>{" "}
              about what I learn along the way.
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
      </div>

      {/* Selected work — breaks out of the text column */}
      <section id="work" className="mx-auto mt-24 max-w-[960px]">
        <div className="mx-auto mb-6 flex max-w-[640px] items-baseline justify-between md:max-w-none">
          <h2 className="eyebrow">Selected work</h2>
          <span className="font-mono text-[11px] text-muted-foreground">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="mx-auto grid max-w-[640px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-2">
          {projects.map((project, i) => (
            <BlurFade
              key={project.title}
              delay={0.05 * i}
              inView
              className={i === 0 ? "md:col-span-2" : undefined}
            >
              <ProjectCard project={project} index={i + 1} featured={i === 0} />
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

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project
  index: number
  featured?: boolean
}) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-card p-2 ring-1 ring-inset ring-border transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.18)]"
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/5 ${
          featured ? "aspect-[16/9] md:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <Image
          src={project.image}
          alt={`${project.title} — ${project.summary}`}
          fill
          sizes={featured ? "(min-width: 768px) 944px, 100vw" : "(min-width: 768px) 470px, 100vw"}
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          priority={featured}
        />
        <span className="absolute right-3 top-3 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="px-2 pb-1.5 pt-3">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="flex items-baseline gap-2.5 text-[15px] font-medium">
            <span className="font-mono text-[11px] font-normal text-muted-foreground">
              {String(index).padStart(2, "0")}
            </span>
            {project.title}
          </h3>
          <span className="eyebrow truncate text-[10px]">{project.tag}</span>
        </div>
        <p className="mt-1 pl-[26px] text-[13px] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
      </div>
    </a>
  )
}
