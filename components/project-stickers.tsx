import Image from "next/image"
import Link from "next/link"
import type { ProjectMeta } from "@/lib/projects"

const tilt = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6"]

// Small tilted project thumbnails that sit inline in a sentence. They
// straighten together when the stack is hovered, and each one links to its
// project page. Negative vertical margin keeps them from stretching the line.
export function ProjectStickers({ projects }: { projects: ProjectMeta[] }) {
  return (
    <span className="group/stickers relative -my-2.5 ml-1.5 inline-flex align-middle">
      {projects.slice(0, 4).map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          title={project.title}
          aria-label={project.title}
          className={`relative inline-block h-8 w-8 overflow-hidden rounded-[8px] bg-card shadow-[0_3px_8px_rgb(0_0_0/0.18)] ring-2 ring-background transition-transform duration-300 ease-out hover:!z-20 hover:!-translate-y-0.5 hover:!scale-105 group-hover/stickers:rotate-0 ${
            i === 0 ? "" : "-ml-2.5"
          } ${tilt[i % tilt.length]}`}
          style={{ zIndex: 10 - i }}
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="32px"
            className="object-cover object-top"
          />
        </Link>
      ))}
    </span>
  )
}
