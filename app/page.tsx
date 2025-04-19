import Image from "next/image"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import type React from "react" // Import React
import Link from "next/link"
import { BlurFade } from "@/components/magicui/blur-fade"

export default function Portfolio() {
  return (
    <div className="min-h-screen  bg-black text-white p-6 md:p-12 lg:p-16">
      {/* Make the grid container take full height, adjusting for padding */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-12 lg:h-[calc(100vh-8rem)]">
        {/* Left Column - Bio Section (Stays fixed height based on content) */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">Prathamesh Bhandekar</h1>
            <p className="text-gray-400">
              Full stack engineer and AI enthusiast{" "}
              <p  className="underline hover:text-white">
                Computer Science @ MMIT, Pune.
              </p>
          
            </p>
            <p className="text-gray-400">
            Full-stack by day ☀️, AI explorer by night 🌓 —turning ideas into reality
            </p>
          </div>

          {/* Experience Section */}
          
          <Link href={"https://docs.google.com/document/d/1NeMfQZNBlU3XZY0BpBPZb-3asJHL8ukWSYfjFwD_pdM/edit?usp=sharing"} >
          <Button variant="link" className="text-gray-400 hover:text-white p-0 mt-4">
            Click here for resume →
          </Button>
          </Link>
          {/* Social Links */}
          <div className="flex gap-4">
            <SocialLink href="https://github.com/bprathamesh20" icon={<Github className="h-6 w-6" />} />
            <SocialLink href="https://www.linkedin.com/in/prathamesh-bhandekar/" icon={<Linkedin className="h-6 w-6" />} />
            <SocialLink href="https://x.com/impra20" icon={<Twitter className="h-6 w-6" />} />
            <SocialLink href="mailto:bprathamesh2003@gmail.com" icon={<Mail className="h-6 w-6" />} />
          </div>
        </div>

        {/* Right Column - Projects Grid (Scrollable with hidden scrollbar) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto scrollbar-hide h-full">
          <BlurFade delay={0.2} inView>
            <ProjectCard
              image="/gennotes.png"
              title="GenNotes"
              description="AI notes agent"
              subtitle="Generates notes with relevant diagrams by searching, researching, and compiling various sources on the web."
              link="https://gennotes-frontend.vercel.app/"
            />
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <ProjectCard
              image="/cafi-show.png"
              title="Cafi AI"
              description="AI interview agent"
              subtitle="An AI agent that can conduct interview autonomously"
              link="https://cafi-landing-page.vercel.app/"
            />
          </BlurFade>
          <BlurFade delay={0.6} inView>
            <ProjectCard
              image="/syllabus-ai.png"
              title="Syallabus AI"
              description="300+ active users"
              subtitle="AI generated notes and tests."
              link="https://syllabusai-frontend-pkxj-git-main-bprathamesh20s-projects.vercel.app/"
            />
          </BlurFade>
          <BlurFade delay={0.8} inView>
            <ProjectCard
              image="/medipal-ai.png"
              title="Medipal"
              description="COMSYS-hackathon runner up"
              subtitle="Medical report analyser"
              link="https://medipal-ai-frontend.vercel.app/"
            />
          </BlurFade>
          <BlurFade delay={1.0} inView>
            <ProjectCard
              image="/expertex.png"
              title="Expertex"
              description="Expertise Exchnage platform"
              link="https://expertex-7rdx.vercel.app/"
            />
          </BlurFade>
        </div>
      </div>
    </div>
  )
}

// function ExperienceItem({ icon, company, role }: { icon: string; company: string; role: string }) {
//   return (
//     <div className="flex items-center gap-4">
//       <Image src={icon || "/placeholder.svg"} alt={company} width={40} height={40} className="rounded-lg" />
//       <div>
//         <h3 className="font-medium">{company}</h3>
//         <p className="text-sm text-gray-400">{role}</p>
//       </div>
//     </div>
//   )
// }

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
  link,
}: {
  image: string
  title: string
  description: string
  subtitle?: string
  link:string
}) {
  return (
    <Link href={link}>
    <div className="space-y-3">
      <div className="group relative aspect-video overflow-hidden rounded-lg bg-gray-900">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="space-y-0.5">
        <h3 className="font-medium text-lg">{title}</h3>
        {description && <p className="text-sm text-gray-300">{description}</p>}
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
    </div>
    </Link>
  )
}

