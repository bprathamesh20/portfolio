import type { Metadata } from "next"
import { BlurFade } from "@/components/magicui/blur-fade"
import { JsonLd } from "@/components/json-ld"
import { ProjectCard } from "@/components/project-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getAllProjects } from "@/lib/projects"
import { site } from "@/lib/site"

const description =
  "AI products and agents built by Prathamesh Bhandekar: a private AI knowledge base, a real-time voice interview agent, a research agent for study notes, and more."

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: `Projects | ${site.name}`,
    description,
    siteName: site.name,
    images: ["/opengraph-image.png"],
  },
}

export default function ProjectsIndex() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen px-6 pt-16 md:pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `Projects by ${site.name}`,
          itemListElement: projects.map((project, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site.url}/projects/${project.slug}`,
            name: project.title,
          })),
        }}
      />

      <div className="mx-auto max-w-[640px]">
        <SiteHeader />

        <BlurFade delay={0.05}>
          <header className="mt-14 space-y-3">
            <h1 className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em] md:text-[30px]">
              Projects
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Things I&apos;ve designed and built, mostly AI agents and the products around them.
              Each one has a write-up on how it works and why it&apos;s built that way.
            </p>
          </header>
        </BlurFade>
      </div>

      <section className="mx-auto mt-12 grid max-w-[640px] grid-cols-1 gap-4 md:max-w-[960px] md:grid-cols-2">
        {projects.map((project, i) => (
          <BlurFade key={project.slug} delay={0.1 + 0.05 * i} inView>
            <ProjectCard project={project} index={i + 1} priority={i < 2} />
          </BlurFade>
        ))}
      </section>

      <div className="mx-auto max-w-[640px]">
        <SiteFooter />
      </div>
    </main>
  )
}
