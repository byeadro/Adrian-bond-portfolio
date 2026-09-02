import {
  fetchAnnouncements,
  fetchBlogPosts,
  fetchProjects,
  fetchSiteSettings,
  type NotionAnnouncement,
  type NotionSiteSettings,
} from "./notion"

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  year: string
  url: string
  featured: boolean
  role?: string
  client?: string
  problem?: string
  solution?: string
  results?: string
  coverImage?: string
  gallery?: string[]
  githubUrl?: string
  seoDescription?: string
  publishedAt?: string
  order?: number
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  url?: string
  featured?: boolean
  coverImage?: string
  seoDescription?: string
  canonicalUrl?: string
  content?: string[]
}

export type Announcement = NotionAnnouncement
export type SiteSettings = NotionSiteSettings

// Static fallback data used when the Notion API key is not configured
const fallbackProjects: Project[] = [
  {
    slug: "embra",
    title: "Embra Law",
    description: "A legal mentorship platform helping law students build real relationships with practicing attorneys who have chosen to mentor, matched by practice area, career path, location, and lived experience.",
    longDescription: "Embra Law helps law students build real relationships with practicing attorneys who have chosen to mentor. Lawyers create verified profiles, choose how many mentees they can support, and review student requests before accepting. Students discover mentors by practice area, career path, location, and lived experience. No cold outreach. No follower counts. No guessing.",
    tags: ["TypeScript", "Python", "AI/ML", "Supabase"],
    year: "2025",
    url: "https://app.joinembra.com",
    featured: true,
    role: "Founder & CEO, co-founded with Brittney Bond",
  },
  {
    slug: "whos-right",
    title: "Who's Right",
    description: "A debate app that transforms arguments into constructive exchanges through AI scoring, live fact-checking, and an ELO ranking system.",
    longDescription: "Who's Right transforms arguments into constructive exchanges. AI analyzes and scores logic, provides live fact-checking, and features an ELO ranking system, rewarding clear thinking and evidence-based reasoning over follower counts and volume.",
    tags: ["Swift", "TypeScript", "AI", "SpacetimeDB"],
    year: "2025",
    url: "https://www.whosright.live",
    featured: true,
    role: "Founder & Developer",
  },
  {
    slug: "voltly-ai",
    title: "Voltly AI",
    description: "An AI-powered utility-bill intelligence platform that extracts data from utility PDFs and turns hours of manual entry into seconds of automated intelligence.",
    longDescription: "Upload any utility PDF and Voltly AI extracts every data point instantly. The platform includes automated variance alerts, spend forecasting, pitch-deck-ready reports, and Excel exports.",
    tags: ["TypeScript", "AI/ML", "Next.js", "SaaS"],
    year: "2025",
    url: "https://www.voltly.ai",
    featured: true,
    role: "Founder & Developer",
  },
  {
    slug: "drawsort",
    title: "DrawSort",
    description: "An interactive sorting and organization tool that makes visual categorization intuitive. Instead of clicking and dragging, you draw to categorize.",
    longDescription: "DrawSort makes visual categorization intuitive. Instead of clicking and dragging, you draw to categorize, powered by the Canvas API for smooth, responsive interaction.",
    tags: ["JavaScript", "HTML/CSS", "Canvas API"],
    year: "2026",
    url: "https://drawsort.com",
    featured: false,
    role: "Founder & Developer",
  }
]

const fallbackBlogPosts: BlogPost[] = [
  {
    slug: "claude-code-obsidian-productivity",
    title: "Claude Code + Obsidian Is the Productivity System Nobody's Talking About",
    excerpt: "How combining Claude Code with Obsidian created the ultimate AI-powered productivity workflow that changed how I build products.",
    date: "2025-03-10",
    readTime: "7 min read",
    tags: ["AI", "Productivity"],
    url: "https://medium.com/ai-in-plain-english/claude-code-obsidian-is-the-productivity-system-nobodys-talking-about-9c20c668a73c",
  },
  {
    slug: "senior-dev-200k-rebuilt-3-days",
    title: "A Senior Dev Said My App Would Cost $200K. I Rebuilt It in 3 Days",
    excerpt: "Here are my 7 tools that let me ship what a team of engineers quoted six figures for, in a fraction of the time.",
    date: "2025-02-20",
    readTime: "9 min read",
    tags: ["Startup", "Tools"],
    url: "https://medium.com/ai-in-plain-english/a-senior-dev-said-my-app-would-cost-200k-i-rebuilt-it-in-3-days-here-are-my-7-tools-f77375114ec3",
  },
  {
    slug: "dont-know-how-to-code-building-tech-company",
    title: "I Don't Know How to Code. I'm Building a Tech Company Anyway.",
    excerpt: "The honest story of how I went from zero coding experience to building AI products by learning to ask the right questions.",
    date: "2025-01-15",
    readTime: "6 min read",
    tags: ["Startup", "Philosophy"],
    url: "https://medium.com/@adrianmbond/i-dont-know-how-to-code-i-m-building-a-tech-company-anyway-86c132025fe8",
  }
]

/**
 * Get projects from Notion if configured, otherwise use static fallback data.
 * Cached for 60 seconds during development, revalidated on deploy.
 */
export async function getProjects(): Promise<Project[]> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_PROJECTS_DATA_SOURCE_ID) {
    return fallbackProjects
  }
  const notionProjects = await fetchProjects()
  if (notionProjects.length === 0) return fallbackProjects
  return notionProjects
}

/**
 * Get blog posts from Notion if configured, otherwise use static fallback data.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_WRITING_DATA_SOURCE_ID) {
    return fallbackBlogPosts
  }
  const notionPosts = await fetchBlogPosts()
  return notionPosts.length > 0 ? notionPosts : fallbackBlogPosts
}

export async function getAnnouncements(): Promise<Announcement[]> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_ANNOUNCEMENTS_DATA_SOURCE_ID) return []
  return fetchAnnouncements()
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!process.env.NOTION_API_KEY || !process.env.NOTION_SITE_SETTINGS_DATA_SOURCE_ID) return {}
  return fetchSiteSettings()
}

// Keep static exports for backward compatibility during migration
export const projects = fallbackProjects
export const blogPosts = fallbackBlogPosts
