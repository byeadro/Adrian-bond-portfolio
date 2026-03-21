"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useProjects } from "@/lib/use-notion-data"

export function Works() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const projects = useProjects()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 md:px-12 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-24"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 — SELECTED WORKS</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light italic">Things I&apos;ve Built</h2>
      </motion.div>

      {/* Projects List */}
      <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative border-t border-white/10 py-8 md:py-12"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link
              href={`/projects/${project.slug}`}
              data-cursor-hover
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Year */}
              <span className="font-mono text-xs text-muted-foreground tracking-widest order-1 md:order-none">
                {project.year}
              </span>

              {/* Title */}
              <motion.h3
                className="font-sans text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:text-white/70 transition-colors duration-300 flex-1"
                animate={{
                  x: hoveredIndex === index ? 20 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.title}
              </motion.h3>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap order-2 md:order-none items-center">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
                <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View All Projects Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 flex justify-center"
      >
        <Link
          href="/projects"
          data-cursor-hover
          className="group font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2"
        >
          VIEW ALL PROJECTS
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </motion.div>

      {/* Bottom Border */}
      <div className="border-t border-white/10 mt-8" />
    </section>
  )
}
