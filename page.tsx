import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Import React

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12">
        {/* Left Column - Bio Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Akshar Barot</h1>
            <p className="text-gray-400">
              Designer and engineer studying{" "}
              <a href="#" className="underline hover:text-white">
                Software Engineering @ the University of Waterloo
              </a>
              . Currently at Shopify.
            </p>
            <p className="text-gray-400">
              Trying to blend form and function to solve problems and make life more convenient.
            </p>
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <ExperienceItem
              icon="/placeholder.svg?height=40&width=40"
              company="Shopify"
              role="Software Engineering Intern"
            />
            <ExperienceItem icon="/placeholder.svg?height=40&width=40" company="Rootly" role="Software Engineer" />
            <ExperienceItem icon="/placeholder.svg?height=40&width=40" company="Wat Street" role="Frontend Lead" />
            <ExperienceItem
              icon="/placeholder.svg?height=40&width=40"
              company="Brew Bites"
              role="Operations Technology Specialist"
            />
          </div>

          <Button variant="link" className="text-gray-400 hover:text-white p-0">
            Click here for resume →
          </Button>

          {/* Social Links */}
          <div className="flex gap-4">
            <SocialLink href="#" icon={<Github className="h-6 w-6" />} />
            <SocialLink href="#" icon={<Linkedin className="h-6 w-6" />} />
            <SocialLink href="#" icon={<Twitter className="h-6 w-6" />} />
            <SocialLink href="#" icon={<Mail className="h-6 w-6" />} />
          </div>
        </div>

        {/* Right Column - Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="Spots"
            description="12000+ users in first week"
            subtitle="Campus classroom availability map"
          />
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="Jarvis"
            description="Featured on OpenCV Live"
            subtitle="Interactive hologram environment"
          />
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="BASIC Web"
            description="UofT Hacks 11 Winner"
            subtitle="BASIC variant and web dev compiler"
          />
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="Colors"
            description="Tailwind color format conversion tool"
          />
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="Click Clack"
            description=""
          />
          <ProjectCard
            image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aN1s5Fl9alHLtgZbGm7RjTkxS0tI0Z.png"
            title="Shopping List App"
            description=""
          />
        </div>
      </div>
    </div>
  )
}

function ExperienceItem({ icon, company, role }: { icon: string; company: string; role: string }) {
  return (
    <div className="flex items-center gap-4">
      <Image src={icon || "/placeholder.svg"} alt={company} width={40} height={40} className="rounded-lg" />
      <div>
        <h3 className="font-medium">{company}</h3>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  )
}

function ProjectCard({
  image,
  title,
  description,
  subtitle,
}: {
  image: string
  title: string
  description: string
  subtitle?: string
}) {
  return (
    <div className="space-y-3">
      <div className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-lg">{title}</h3>
        {description && <p className="text-sm text-gray-300">{description}</p>}
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
    </div>
  )
}

