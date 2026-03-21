"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { useProjects } from "@/lib/use-notion-data"
import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const projects = useProjects()
  const params = useParams()
  const slug = params.slug as string

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main className="pt-32 px-8 md:px-12 min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-sans text-3xl md:text-5xl font-light italic mb-4">Project not found</h1>
            <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist.</p>
            <Link href="/projects">
              <motion.button
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-white/70 hover:text-white transition-colors duration-300 font-mono text-sm tracking-widest"
              >
                ← Back to Projects
              </motion.button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </SmoothScroll>
    )
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative px-8 md:px-12 py-12 md:py-20 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-muted-foreground tracking-widest">{project.year}</span>
              <div className="w-8 h-px bg-white/10" />
            </div>

            <h1 className="font-sans text-4xl md:text-6xl font-light italic mb-8">{project.title}</h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">{project.description}</p>

            {/* Link to Live Site */}
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-2 font-mono text-sm tracking-widest text-white/70 hover:text-white transition-colors duration-300"
            >
              Visit Live Site
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.6 10.4L21 3M21 3v7.6M21 3H13.4" />
              </svg>
            </motion.a>
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="relative px-8 md:px-12 py-16 md:py-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-16">
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">ABOUT THIS PROJECT</p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{project.longDescription}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">TECH STACK</p>
              <div className="flex gap-3 flex-wrap">
                {project.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="font-mono text-sm tracking-wider px-4 py-2 border border-white/20 rounded-full text-muted-foreground hover:border-white/40 hover:text-white transition-colors duration-300 cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Back Link */}
        <section className="relative px-8 md:px-12 py-8 border-t border-white/10">
          <Link href="/projects">
            <motion.button
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-white/70 hover:text-white transition-colors duration-300 font-mono text-sm tracking-widest inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 13.6L3 21M3 21H10.6M3 21v-7.6" />
              </svg>
              Back to Projects
            </motion.button>
          </Link>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
