import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProjectMeta } from "@/lib/projects"

export function ProjectCard({
  project,
  index,
  priority,
}: {
  project: ProjectMeta
  index: number
  priority?: boolean
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl bg-card p-2 ring-1 ring-inset ring-border transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-12px_rgb(0_0_0/0.18)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-muted ring-1 ring-foreground/5">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 470px, 100vw"
          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          priority={priority}
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
    </Link>
  )
}
