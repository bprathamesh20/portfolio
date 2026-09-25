export const site = {
  name: "Prathamesh Bhandekar",
  role: "Full-stack engineer · AI agents",
  location: "Pune, IN",
  timeZone: "Asia/Kolkata",
  email: "bprathamesh2003@gmail.com",
  resume:
    "https://docs.google.com/document/d/1NeMfQZNBlU3XZY0BpBPZb-3asJHL8ukWSYfjFwD_pdM/edit?usp=sharing",
  socials: {
    github: "https://github.com/bprathamesh20",
    linkedin: "https://www.linkedin.com/in/prathamesh-bhandekar/",
    x: "https://x.com/impra20",
  },
}

export type Project = {
  title: string
  tag: string
  summary: string
  image: string
  link: string
}

export const projects: Project[] = [
  {
    title: "GenNotes",
    tag: "AI notes agent",
    summary:
      "Generates notes with relevant diagrams by searching, researching, and compiling sources across the web.",
    image: "/gennotes.png",
    link: "https://gennotes-frontend.vercel.app/",
  },
  {
    title: "Cafi AI",
    tag: "AI interview agent",
    summary: "An AI agent that conducts interviews autonomously.",
    image: "/cafi-show.png",
    link: "https://cafi-landing-page.vercel.app/",
  },
  {
    title: "Syllabus AI",
    tag: "300+ active users",
    summary: "AI-generated notes and tests.",
    image: "/syllabus-ai.png",
    link: "https://syllabusai-frontend-pkxj-git-main-bprathamesh20s-projects.vercel.app/",
  },
  {
    title: "Medipal",
    tag: "COMSYS hackathon runner-up",
    summary: "Medical report analyser.",
    image: "/medipal-ai.png",
    link: "https://medipal-ai-frontend.vercel.app/",
  },
  {
    title: "Expertex",
    tag: "Web platform",
    summary: "An expertise-exchange platform.",
    image: "/expertex.png",
    link: "https://expertex-7rdx.vercel.app/",
  },
]
