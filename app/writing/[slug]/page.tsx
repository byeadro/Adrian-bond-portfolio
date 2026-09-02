"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CustomCursor } from "@/components/custom-cursor"
import { SmoothScroll } from "@/components/smooth-scroll"
import { useBlogPosts } from "@/lib/use-notion-data"
import { useParams } from "next/navigation"

const getPostContent = (slug: string): string => {
  const contentMap: Record<string, string> = {
    "vibe-coding-manifesto": `I've been a polyglot programmer for most of my career, and I used to think that was a liability. Everyone kept telling me to "pick a lane"—master one language, one framework, one ecosystem. Become a React expert. Become a Rust wizard. Become the Python guy. But that advice never sat right with me, and I think it's fundamentally misguided.

The real skill in software engineering isn't memorizing APIs or becoming a domain expert in one particular tool. It's understanding the principles that transcend syntax. It's knowing when to reach for a tool, how to think about problems, and the ability to reason about trade-offs. Every language I've learned has made me a better engineer in every other language.

When I built Embra in TypeScript, I borrowed patterns from Python. When I wrote parts of Who's Right in Swift, I thought about concurrency in ways that came from studying Rust. The vibe of coding—the meta-skill of building things—it's universal. It's not about the tool. It's about the craft, the philosophy, the willingness to experiment and learn. That's what I call vibe coding.`,

    "building-ai-products": `Building AI products is fundamentally different from building traditional software, and most people still get it wrong. They treat AI as a feature that you bolt onto an existing product architecture, when really, the entire product should be designed around what AI can do uniquely.

When I shipped Embra, the product wasn't built around OpenAI's API. The entire experience—from how meetings are captured, to how insights are surfaced, to how agents augment workflows—is designed from first principles around what AI is actually good at: pattern matching, synthesis, and augmentation. Same with Who's Right. The product only works because the core loop is designed for AI to shine.

The graveyard of failed AI products is full of features that tried to use AI as window dressing. A chatbot on top of your existing app. A "powered by AI" badge. That's not a product. That's a feature. Real AI products rethink the entire user experience around what intelligence can enable. Rethink your workflows. Rethink your interfaces. Rethink what your users actually need.`,

    "prompt-engineering-beyond-chatgpt": `When people say "prompt engineering," they usually mean typing better questions into ChatGPT. That's not prompt engineering. That's using ChatGPT better. Real prompt engineering is what happens when you're building products.

When you're building a product with AI, you're not crafting one-off prompts for one-off tasks. You're designing systems. You're thinking about how to structure information so that the model can make good decisions. You're thinking about how to parse outputs reliably. You're thinking about failure modes and how to recover gracefully. You're thinking about latency, cost, and accuracy in concert.

Every prompt in a product is a mini-API contract. It takes structured input, processes it, and produces output that other parts of the system depend on. You're not trying to get a clever response. You're trying to build a reliable system. That's the real craft. That's what separates products from toys.`,
  }

  return contentMap[slug] || ""
}

export default function BlogPostPage() {
  const blogPosts = useBlogPosts()
  const params = useParams()
  const slug = params.slug as string

  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
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
            <h1 className="font-sans text-3xl md:text-5xl font-light italic mb-4">Essay not found</h1>
            <p className="text-muted-foreground mb-8">The essay you're looking for doesn't exist.</p>
            <Link href="/writing">
              <motion.button
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-white/70 hover:text-white transition-colors duration-300 font-mono text-sm tracking-widest"
              >
                ← Back to Writing
              </motion.button>
            </Link>
          </motion.div>
        </main>
        <Footer />
      </SmoothScroll>
    )
  }

  const fallbackContent = getPostContent(slug)
  const paragraphs = post.content?.length ? post.content : fallbackContent.split("\n\n").filter(Boolean)

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
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground tracking-widest">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="font-mono text-xs text-muted-foreground tracking-widest">{post.readTime}</span>
            </div>

            <h1 className="font-sans text-4xl md:text-5xl font-light italic mb-6">{post.title}</h1>

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
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="relative px-8 md:px-12 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8 last:mb-0"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>
        </section>

        {/* Back Link */}
        <section className="relative px-8 md:px-12 py-12 border-t border-white/10">
          <Link href="/writing">
            <motion.button
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-white/70 hover:text-white transition-colors duration-300 font-mono text-sm tracking-widest inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 13.6L3 21M3 21H10.6M3 21v-7.6" />
              </svg>
              Back to Writing
            </motion.button>
          </Link>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  )
}
