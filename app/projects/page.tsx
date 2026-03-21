"use client"

import type React from "react"
import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { useProjects } from "@/lib/use-notion-data"

export default function ProjectsPage() {
  const projects = useProjects()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main className="pt-32">
        {/* Page Header */}
        <section className="relative px-4 sm:px-6 md:px-12 py-12 md:py-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">01 — PROJECTS</p>
            <h1 className="font-sans text-3xl md:text-5xl font-light italic mb-4">Things I've Built</h1>
            <p className="text-muted-foreground max-w-2xl">Shipped and proud of. Each project represents a blend of thoughtful design, technical depth, and a commitment to solving real problems.</p>
          </motion.div>
        </section>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section ref={containerRef} onMouseMove={handleMouseMove} className="relative px-4 sm:px-6 md:px-12 mb-32">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">FEATURED</p>
            </div>

            <div className="grid gap-8 md:gap-12">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative border border-white/10 rounded-lg p-8 md:p-12 hover:border-white/20 transition-colors duration-300 hover:bg-white/[0.02] cursor-pointer">
                      {/* Project Year */}
                      <div className="flex items-start justify-between mb-6">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest">{project.year}</span>
                        <motion.div
                          animate={{ x: hoveredIndex === index ? 6 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16V4m0 0L1 10m0 0l6 6m10-6v12m0 0l6-6m0 0l-6-6" />
                          </svg>
                        </motion.div>
                      </div>

                      {/* Title */}
                      <motion.h3
                        className="font-sans text-3xl md:text-4xl font-light italic mb-4 group-hover:text-white/70 transition-colors duration-300"
                        animate={{
                          x: hoveredIndex === index ? 12 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {project.title}
                      </motion.h3>

                      {/* Description */}
                      <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">{project.description}</p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section className="relative px-4 sm:px-6 md:px-12 mb-32">
            <div className="mb-12">
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">ALSO BUILT</p>
            </div>

            <div className="grid gap-6 md:gap-8">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative border border-white/10 rounded-lg p-6 md:p-8 hover:border-white/20 transition-colors duration-300 hover:bg-white/[0.02] cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-sans text-xl md:text-2xl font-light italic mb-2 group-hover:text-white/70 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">{project.description}</p>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground tracking-widest ml-4 whitespace-nowrap">{project.year}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-wider px-2 py-1 border border-white/20 rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <section className="relative px-4 sm:px-6 md:px-12 py-24 text-center">
            <p className="text-muted-foreground">No projects yet.</p>
          </section>
        )}

        <Footer />
      </main>
    </SmoothScroll>
  )
}
