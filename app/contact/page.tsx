"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { useSiteSettings } from "@/lib/use-notion-data"

export default function Contact() {
  const settings = useSiteSettings()
  const email = settings.email || "adrianbond@myembra.com"
  const phone = settings.phone || "217-891-1364"
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, "")}`
  const availability = settings.availability || "Open to new projects"
  const socialLinks = [
    { label: "LinkedIn", href: settings.linkedin || "https://www.linkedin.com/in/adrian-bond-87994b20a/" },
    { label: "Instagram", href: settings.instagram || "https://www.instagram.com/byeadro" },
  ]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
  }

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
      <main className="pt-24">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-sans text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-light italic text-white mb-8">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
              Have a project in mind? Let&apos;s talk. I work with founders and small teams that need a technical partner who can move quickly.
            </p>
          </motion.div>
        </section>

        {/* Work With Me */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-5xl">
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">01 - WORK WITH ME</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">Ship AI-Native Products Faster</h2>
            <div className="max-w-3xl space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
              <p>Outside of Embra Law, I take on select freelance and contract projects, helping founders and small teams ship AI-native products fast.</p>
              <p>I work across the full stack, from product definition to shipped software, and I'm best suited to people who need a technical partner who can move without a large team behind them.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10 mt-12">
              <div>
                <h3 className="font-mono text-sm tracking-widest text-accent uppercase mb-5">What I help with</h3>
                <ul className="space-y-3 text-white/70">
                  <li>Full-stack web app development with React, Next.js, Node, Supabase, and Postgres</li>
                  <li>AI feature integration, prompt engineering, and LLM-powered workflows</li>
                  <li>iOS app development with Swift</li>
                  <li>MVP builds from idea to shipped product</li>
                  <li>Product design and system architecture for early-stage products</li>
                </ul>
              </div>
              <div>
                <h3 className="font-mono text-sm tracking-widest text-accent uppercase mb-5">A good fit if you&apos;re</h3>
                <ul className="space-y-3 text-white/70">
                  <li>An early-stage founder who needs a builder, not just a contractor</li>
                  <li>A team adding AI-native features to an existing product</li>
                  <li>Working on something where speed and iteration matter more than a large team</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-24">
            {/* Left Column - Email & Status */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              {/* Email Section */}
              <div className="space-y-6">
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">02 - EMAIL</p>
                <motion.a
                  href={`mailto:${email}`}
                  whileHover={{ scale: 1.05 }}
                  className="block group"
                >
                  <p className="font-sans text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors duration-300 break-all sm:break-normal">
                    {email}
                  </p>
                </motion.a>
              </div>

              {/* Phone */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">03 - PHONE</p>
                <motion.a
                  href={phoneHref}
                  whileHover={{ scale: 1.05 }}
                  className="block group"
                >
                  <p className="font-sans text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-accent transition-colors duration-300 break-all sm:break-normal">
                    {phone}
                  </p>
                </motion.a>
              </div>

              {/* Status */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">04 - STATUS</p>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                  </span>
                  <span className="font-mono text-sm tracking-wider text-white">{availability.toUpperCase()}</span>
                </div>
                <p className="font-mono text-xs tracking-wider text-muted-foreground">LITTLE ROCK, ARKANSAS</p>
              </div>

              {/* Social Links */}
              <div className="space-y-6 pt-8 border-t border-white/10">
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">05 - SOCIAL</p>
                <div className="flex flex-col gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <span className="w-px h-4 bg-white/20 group-hover:bg-accent transition-colors duration-300" />
                      <span className="font-mono text-sm tracking-wide">{link.label}</span>
                      <span className="text-accent group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="name" className="font-mono text-xs tracking-widest text-muted-foreground uppercase block">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors duration-300 font-mono text-sm"
                    placeholder="Your name"
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="email" className="font-mono text-xs tracking-widest text-muted-foreground uppercase block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors duration-300 font-mono text-sm"
                    placeholder="your@email.com"
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label htmlFor="message" className="font-mono text-xs tracking-widest text-muted-foreground uppercase block">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-lg text-white placeholder:text-white/30 focus:border-white/40 focus:outline-none transition-colors duration-300 font-mono text-sm resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3 mt-8 border border-white/20 text-white font-mono text-sm tracking-wider hover:border-white/40 hover:bg-white/5 transition-all duration-300 rounded-lg"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="px-4 sm:px-6 md:px-12 py-20 md:py-32 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-6">06 - OPEN TO CONVERSATIONS</p>
            <h2 className="font-sans text-3xl md:text-5xl font-light italic mb-8">Let&apos;s Talk</h2>
            <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed">
              <ul className="space-y-3">
                <li>Law schools exploring structured mentorship programs</li>
                <li>Lawyers interested in mentoring students</li>
                <li>Law firms supporting early legal talent</li>
                <li>Investors backing education, legal technology, and professional networks</li>
                <li>Founders and teams looking for freelance or contract development help</li>
                <li>Podcast, panel, workshop, and speaking opportunities</li>
              </ul>
              <p>
                I typically respond to emails within 24 hours. For urgent matters, feel free to reach out on social media as well.
              </p>
              <p>Whether you want to collaborate on a project, discuss AI, or just say hello, I'd love to hear from you.</p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  )
}
