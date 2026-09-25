import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import { BlurFade } from "@/components/magicui/blur-fade"
import { JsonLd } from "@/components/json-ld"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getAllProjects, getProjectBySlug } from "@/lib/projects"
import { site } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  const { meta } = project
  const title = `${meta.title} — ${meta.tag}`
  const url = `/projects/${meta.slug}`

  return {
    title,
    description: meta.description,
    keywords: [meta.title, ...meta.stack, site.name],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: meta.description,
      siteName: site.name,
      images: [{ url: meta.image, alt: meta.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
      images: [meta.image],
      creator: "@impra20",
    },
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const { meta, content } = project
  const all = getAllProjects()
  const index = all.findIndex((p) => p.slug === meta.slug)
  const next = all[(index + 1) % all.length]
  const url = `${site.url}/projects/${meta.slug}`

  const facts = [
    { label: "Year", value: meta.year },
    { label: "Role", value: meta.role },
    { label: "Type", value: meta.tag },
  ]

  return (
    <main className="min-h-screen px-6 pt-16 md:pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: meta.title,
          headline: `${meta.title} — ${meta.tag}`,
          description: meta.description,
          url,
          image: `${site.url}${meta.image}`,
          dateCreated: meta.year.slice(0, 4),
          keywords: meta.stack.join(", "),
          creator: { "@type": "Person", name: site.name, url: site.url },
          ...(meta.live ? { sameAs: meta.live } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${site.url}/projects` },
            { "@type": "ListItem", position: 3, name: meta.title, item: url },
          ],
        }}
      />

      <div className="mx-auto max-w-[640px]">
        <SiteHeader />

        <BlurFade delay={0.05}>
          <nav aria-label="Breadcrumb" className="mt-14 font-mono text-[11px] text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/projects" className="transition-colors hover:text-foreground">
                  Projects
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-foreground">
                {meta.title}
              </li>
            </ol>
          </nav>

          <header className="mt-6">
            <h1 className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em] md:text-[30px]">
              {meta.title}
            </h1>
            <p className="mt-3 text-[17px] leading-relaxed text-muted-foreground text-pretty">
              {meta.summary}
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-dashed border-border py-4">
              {facts.map((fact) => (
                <div key={fact.label} className="min-w-0">
                  <dt className="eyebrow text-[10px]">{fact.label}</dt>
                  <dd className="mt-1 text-[13px] leading-snug">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {meta.live && (
                <a
                  href={meta.live}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background transition-opacity hover:opacity-90"
                >
                  Visit live site
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                </a>
              )}
              {meta.source.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  className={
                    !meta.live && i === 0
                      ? "group inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background transition-opacity hover:opacity-90"
                      : "group inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm text-foreground transition-colors hover:bg-secondary"
                  }
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                </a>
              ))}
            </div>
          </header>
        </BlurFade>
      </div>

      {/* Hero shot — breaks out of the text column like the homepage grid */}
      <BlurFade delay={0.15}>
        <figure className="mx-auto mt-12 max-w-[960px] rounded-xl bg-card p-2 ring-1 ring-inset ring-border">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/5">
            <Image
              src={meta.image}
              alt={meta.imageAlt}
              fill
              priority
              sizes="(min-width: 1008px) 944px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </figure>
      </BlurFade>

      <div className="mx-auto max-w-[640px]">
        <article
          className="prose prose-stone mt-14 max-w-none text-[15px] leading-relaxed dark:prose-invert
            prose-headings:font-medium prose-headings:tracking-[-0.02em]
            prose-h2:mb-3 prose-h2:mt-12 prose-h2:text-[18px]
            prose-p:text-foreground/85 prose-li:text-foreground/85 prose-li:marker:text-muted-foreground
            prose-strong:font-medium prose-strong:text-foreground
            prose-a:text-foreground prose-a:decoration-muted-foreground/40 prose-a:decoration-dotted prose-a:underline-offset-[5px] hover:prose-a:decoration-foreground
            prose-code:rounded prose-code:bg-secondary prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[12.5px] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-kbd:font-mono prose-kbd:text-[12px]
            prose-img:my-10 prose-img:rounded-xl prose-img:ring-1 prose-img:ring-border"
        >
          <MDXRemote source={content} />
        </article>

        <section className="mt-14 border-t border-dashed border-border pt-8">
          <h2 className="eyebrow mb-4">Built with</h2>
          <ul className="flex flex-wrap gap-2">
            {meta.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {next && next.slug !== meta.slug && (
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-14 flex items-center justify-between gap-6 rounded-xl bg-card p-5 ring-1 ring-inset ring-border transition-colors hover:bg-secondary/60"
          >
            <div>
              <p className="eyebrow text-[10px]">Next project</p>
              <p className="mt-1 text-[15px] font-medium">{next.title}</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">{next.summary}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </Link>
        )}

        <SiteFooter />
      </div>
    </main>
  )
}
