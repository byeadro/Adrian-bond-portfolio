"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"

const skills = [
  { category: "Languages", items: ["TypeScript", "Python", "Swift", "JavaScript", "HTML", "CSS", "Shell"] },
  { category: "Platforms", items: ["Next.js", "React", "Node.js", "Vercel", "Tailwind CSS"] },
  { category: "Databases", items: ["Supabase", "PostgreSQL", "Cloudflare", "SpacetimeDB"] },
  { category: "Tools & Concepts", items: ["Prompt Engineering", "AI/LLMs", "Product Design", "System Architecture"] },
]

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  }

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main ref={containerRef} className="pt-24">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-sans text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light italic text-white mb-8">
              About
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              I'm Adrian Bond, Founder & Prompt Engineer. Building AI-native products that think alongside humans.
            </p>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">01 - PHILOSOPHY</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">Self-Taught. Obsessed. Building Fast.</h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                I didn't go to a computer science school. I didn't follow a traditional path. What I did was pick up a terminal, open an AI chat, and decide that for the next two years, I'd talk to AI every single day. Not passively, but actively grinding, learning how to ask the right questions, building products that matter.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                The truth is, self-taught means something different now. It's not about books or tutorials anymore. It's about being in constant conversation with the best AI available, pushing it to explain concepts, generating boilerplate, debugging your half-formed ideas at 2am, and actually <span className="text-white font-medium">shipping</span>. I've put in the work. Two years of daily iteration, learning by doing, failing fast, and building better.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                I'm a "vibe coder": TypeScript, Python, Swift, JavaScript, CSS, Shell, or whatever the problem demands. When you're self-taught and hungry, you don't pick a lane. You learn what you need, when you need it. That flexibility is my edge. The traditional path teaches you one way. The self-taught path teaches you how to <span className="text-white font-medium">think</span>.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 mt-8">
                <p className="font-mono text-sm md:text-base italic text-accent">
                  "Two years of conversations with AI, a laptop, and the determination to ship. That's my degree."
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Approach Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">02 - APPROACH</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">Solo. Shipping. Learning in Public.</h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                I build products solo. No committees, no design-by-consensus, no waiting for stakeholder approval. Just me, the code, and the vision. That hustle is where the magic happens: one person can move fast, iterate, and ship without friction. Every line of code is mine. Every decision is intentional.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                Speed is the feature. In a space this fast-moving, the ability to go from idea to shipped product in days, not months, is your competitive advantage. I don't overthink. I build, I test, I learn, I iterate. <span className="text-white font-medium">Shipping beats perfection</span>.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                And I learn in public. Every product I build, every AI interaction I have, and every mistake I make is fuel for the next iteration. The self-taught path isn't a secret. It's about being transparent with the journey, sharing what works, and building alongside people who get it. That's how you grow faster.
              </p>
              <p className="text-base md:text-lg text-white/70 leading-relaxed">
                The goal is simple: <span className="text-white font-medium">build AI-native products that actually matter</span>. Products where humans and AI work together naturally. Where the interface is intuitive. Where the technology disappears and only the value remains.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Technical Skills Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">03 - TECHNICAL SKILLS</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic">Languages & Tools</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          >
            {skills.map((skillGroup, groupIndex) => (
              <motion.div key={skillGroup.category} variants={itemVariants} className="space-y-4">
                <h3 className="font-mono text-sm tracking-widest text-accent uppercase">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                      viewport={{ once: true }}
                      className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-sm hover:border-white/40 hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Press Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">05 - PRESS</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic">Featured</h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl"
          >
            <motion.a
              variants={itemVariants}
              href="https://armoneyandpolitics.com/embra-law-student-support/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-accent mb-4">ARKANSAS MONEY & POLITICS</p>
              <h3 className="font-sans text-lg md:text-xl font-light text-white mb-4 group-hover:text-white/80 transition-colors">
                Embra: Law Student Support
              </h3>
              <div className="flex items-center gap-2 text-white/50 group-hover:text-white/70 transition-colors">
                <span className="text-sm">Read Article</span>
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>

            <motion.a
              variants={itemVariants}
              href="https://www.arkansasbusiness.com/article/new-arkansas-startup-tackles-law-school-burnout-with-ai-tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 border border-white/10 rounded-lg p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-accent mb-4">ARKANSAS BUSINESS</p>
              <h3 className="font-sans text-lg md:text-xl font-light text-white mb-4 group-hover:text-white/80 transition-colors">
                New Arkansas Startup Tackles Law School Burnout with AI Tools
              </h3>
              <div className="flex items-center gap-2 text-white/50 group-hover:text-white/70 transition-colors">
                <span className="text-sm">Read Article</span>
                <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          </motion.div>
        </section>

        {/* Recognition Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">06 - RECOGNITION</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-12">Backed by Industry Leaders</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 md:p-10">
              {/* NVIDIA Inception Badge */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-lg p-6 md:p-8 inline-block">
                  <img
                    src="/nvidia-inception-badge.png"
                    alt="NVIDIA Inception Program Badge"
                    className="w-48 sm:w-64 md:w-80 h-auto"
                  />
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-4">
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  The <span className="text-white font-medium">NVIDIA Inception Program</span> is an exclusive program designed to help cutting-edge startups evolve faster through access to NVIDIA&apos;s technology stack, expert technical support, and a global co-marketing network of AI innovators.
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed">
                  Acceptance into Inception means NVIDIA recognizes Embra as an innovative AI startup pushing the boundaries of what&apos;s possible. This places our work alongside thousands of vetted AI companies worldwide, from early-stage builders to industry leaders shaping the future of artificial intelligence.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">07 - NEXT</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">Let's Build Something</h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8">
              If you're interested in AI-native products, prompt engineering, or just want to talk about the future of design and code, let's connect. I'm always excited to meet people who think deeply about these things.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 rounded-lg"
            >
              <span>Get in Touch</span>
              <span className="text-accent">→</span>
            </motion.a>
          </motion.div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
