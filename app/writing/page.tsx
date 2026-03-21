"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { useBlogPosts } from "@/lib/use-notion-data"
import { useState } from "react"

export default function WritingPage() {
  const blogPosts = useBlogPosts()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setTimeout(() => {
      setEmail("")
      setSubscribed(false)
    }, 3000)
  }

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
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">02 — WRITING</p>
            <h1 className="font-sans text-3xl md:text-5xl font-light italic mb-4">Thoughts & Essays</h1>
            <p className="text-muted-foreground max-w-2xl">Reflections on building products, coding across languages, and the future of AI. Unfiltered takes on the craft of software engineering.</p>
          </motion.div>
        </section>

        {/* Blog Posts */}
        <section className="relative px-4 sm:px-6 md:px-12 mb-32">
          <div className="max-w-3xl">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group border-b border-white/10 py-8 md:py-12 last:border-b-0"
              >
                {post.url ? (
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                    <div>
                      {/* Date and Read Time */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tracking-widest">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <motion.h2
                        className="font-sans text-2xl md:text-3xl font-light italic mb-3 group-hover:text-white/70 transition-colors duration-300 flex items-center gap-2"
                        animate={{ x: 0 }}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {post.title}
                        <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] tracking-wider px-3 py-1 border border-white/20 rounded-full text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link href={`/writing/${post.slug}`}>
                    <div className="cursor-pointer">
                      {/* Date and Read Time */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-widest">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground tracking-widest">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <motion.h2
                        className="font-sans text-2xl md:text-3xl font-light italic mb-3 group-hover:text-white/70 transition-colors duration-300"
                        animate={{ x: 0 }}
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        {post.title}
                      </motion.h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {post.tags.map((tag) => (
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
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="relative px-4 sm:px-6 md:px-12 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl border border-white/10 rounded-lg p-8 md:p-12 hover:border-white/20 hover:bg-white/[0.02] transition-colors duration-300"
          >
            <div className="mb-8">
              <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-2">NEWSLETTER</p>
              <h3 className="font-sans text-2xl md:text-3xl font-light italic mb-3">Stay in the loop</h3>
              <p className="text-muted-foreground">New essays and insights delivered to your inbox every few weeks. No spam, just thoughtful writing.</p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/30 transition-colors duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-white/20 rounded-lg font-mono text-sm tracking-wider text-muted-foreground hover:border-white/40 hover:text-white transition-colors duration-300 whitespace-nowrap"
                >
                  {subscribed ? "✓ Subscribed" : "Subscribe"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
