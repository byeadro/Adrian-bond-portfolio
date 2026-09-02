"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"

const experience = [
  { role: "Founder & CEO", company: "Embra Law", period: "Jul 2025 to Present", location: "Little Rock, AR", description: "Lead product strategy, company development, and partnerships for a legal mentorship platform connecting law students with practicing attorneys." },
  { role: "Software Developer", company: "Bernhard", period: "Feb 2023 to Present", description: "Build and maintain software products, internal tools, and production systems across web applications, iOS development, data workflows, automation, and AI-assisted development." },
  { role: "Creator & Writer", company: "Made Without Instructions", period: "Jan 2026 to Present", location: "Remote", description: "Document the real process of building software, companies, and brands as a non-traditional developer using AI: what works, what fails, and what founders can learn from shipping without waiting for perfect credentials, a large team, or permission." },
  { role: "Account Manager/Analyst", company: "LBMC", period: "Sep 2020 to Aug 2022", location: "Nashville Metro Area", description: "Managed client relationships, analyzed business performance, and contributed to a 20% increase in company revenue within the first three months. The experience now informs Embra's institutional partnership strategy." },
  { role: "Compliance Analyst", company: "Tennessee Secretary of State", period: "Nov 2017 to Sep 2019", location: "Nashville Metro Area", description: "Monitored regulatory compliance, analyzed operational risk, and worked with structured reporting requirements. This experience informs Embra's approach to trust, safety, privacy, and institutional accountability." },
]

const skillGroups = [
  { category: "Languages", items: ["TypeScript", "Python", "Swift", "JavaScript", "HTML", "CSS", "Shell"] },
  { category: "Frameworks & Platforms", items: ["Next.js", "React", "Node.js", "Vercel", "Tailwind CSS", "Supabase", "PostgreSQL", "Cloudflare", "SpacetimeDB"] },
  { category: "Product & AI", items: ["Prompt Engineering", "AI/LLMs", "OpenAI", "Product Design", "System Architecture", "Full-Stack Development", "SaaS", "Canvas API"] },
  { category: "Business", items: ["Product Strategy", "User Research", "Sales", "Account Management", "Finance", "Regulatory Compliance", "Risk Analysis", "Data Analysis", "Tableau", "Public Speaking", "Content Creation"] },
]

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } }

export default function About() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="pt-24">
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 min-h-[80vh] flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">ABOUT ADRIAN</p>
            <h1 className="font-sans text-4xl md:text-7xl lg:text-8xl font-light italic text-white mb-8">Founder. Developer. Builder.</h1>
            <p className="text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed">Founder & CEO of Embra Law. Software developer building AI-native products from Little Rock, Arkansas.</p>
          </motion.div>
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div {...reveal} className="max-w-4xl space-y-6">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">01 - EMBRA LAW</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic">Mentorship Built Around Real Relationships</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">I'm the founder and CEO of Embra Law, a legal mentorship platform helping law students build real relationships with practicing attorneys who have chosen to mentor.</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">Students are often told to network, but they're rarely told which lawyers are actually willing and available to help. Embra changes that.</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">Lawyers create verified profiles, choose how many mentees they can support, and review student requests before accepting. Students discover mentors by practice area, career path, location, and lived experience. No cold outreach. No follower counts. No guessing.</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">We're currently working with students, attorneys, law schools, and legal organizations to develop structured mentorship pilots that improve access, engagement, and career preparation.</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">The idea began with my co-founder, Brittney Bond, a Bowen Law graduate and practicing attorney, who saw firsthand how students with strong networks advanced while others were left to figure everything out alone.</p>
          </motion.div>
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div {...reveal} className="max-w-4xl space-y-6">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">02 - MY APPROACH</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic">Made Without Instructions</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">I also created Made Without Instructions, where I document what it takes to build software and companies as a non-traditional developer using AI. I've shipped iOS apps, web platforms, and self-hosted tools without a traditional computer-science background.</p>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">My background spans business, software development, data analysis, compliance, and sales. That combination shapes how I build: understand the problem first, then create the simplest product that produces a real outcome.</p>
          </motion.div>
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div {...reveal} className="mb-14"><p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">03 - EXPERIENCE</p><h2 className="font-sans text-3xl md:text-5xl font-light italic">Where I&apos;ve Worked</h2></motion.div>
          <div className="max-w-5xl">{experience.map((item, index) => (
            <motion.article key={`${item.company}-${item.role}`} {...reveal} transition={{ duration: 0.7, delay: index * 0.05 }} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 py-8 border-t border-white/10">
              <div><h3 className="text-xl text-white">{item.role}</h3><p className="text-accent mt-1">{item.company}</p><p className="font-mono text-xs text-muted-foreground mt-3">{item.period}</p>{item.location && <p className="font-mono text-xs text-muted-foreground mt-1">{item.location}</p>}</div>
              <p className="text-white/70 leading-relaxed">{item.description}</p>
            </motion.article>
          ))}</div>
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div {...reveal} className="mb-14"><p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">04 - SKILLS</p><h2 className="font-sans text-3xl md:text-5xl font-light italic">Technical & Business</h2></motion.div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">{skillGroups.map((group) => <motion.div key={group.category} {...reveal}><h3 className="font-mono text-sm tracking-widest text-accent uppercase mb-4">{group.category}</h3><div className="flex flex-wrap gap-2">{group.items.map((skill) => <span key={skill} className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm">{skill}</span>)}</div></motion.div>)}</div>
        </section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10"><motion.div {...reveal} className="max-w-4xl"><p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">05 - RECOGNITION</p><h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">NVIDIA Inception</h2><p className="text-base md:text-lg text-white/70 leading-relaxed">Embra is a member of the NVIDIA Inception program, which supports AI, data science, and HPC startups with technical resources, developer tools and training, preferred pricing on NVIDIA hardware and software, and access to a global network of AI companies and investors.</p></motion.div></section>

        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div {...reveal} className="mb-12"><p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">06 - PRESS</p><h2 className="font-sans text-3xl md:text-5xl font-light italic">Featured</h2></motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            <a href="https://armoneyandpolitics.com/embra-law-student-support/" target="_blank" rel="noopener noreferrer" className="group border border-white/10 rounded-lg p-7 hover:bg-white/5 hover:border-white/20 transition-all"><p className="font-mono text-xs tracking-widest text-accent mb-4">ARKANSAS MONEY & POLITICS</p><h3 className="text-xl text-white">Embra: Law Student Support</h3><p className="text-sm text-white/50 mt-5 group-hover:text-white/70">Read article &rarr;</p></a>
            <a href="https://www.arkansasbusiness.com/article/new-arkansas-startup-tackles-law-school-burnout-with-ai-tools/" target="_blank" rel="noopener noreferrer" className="group border border-white/10 rounded-lg p-7 hover:bg-white/5 hover:border-white/20 transition-all"><p className="font-mono text-xs tracking-widest text-accent mb-4">ARKANSAS BUSINESS</p><h3 className="text-xl text-white">New Arkansas Startup Tackles Law School Burnout with AI Tools</h3><p className="text-sm text-white/50 mt-5 group-hover:text-white/70">Read article &rarr;</p></a>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
