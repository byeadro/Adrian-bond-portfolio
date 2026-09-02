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

// Static fallback data — used when Notion API key is not configured
const fallbackProjects: Project[] = [
  {
    slug: "embra",
    title: "Embra",
    description: "A B2B SaaS platform built for law schools — giving students an AI-powered mentor and study companion that actually understands the pressure of legal education.",
    longDescription: "Embra is a B2B SaaS platform built specifically for law schools, giving students an AI-powered mentor and study companion that actually understands the pressure of legal education. Born from watching my wife grind through law school and surveying 100+ law students about what was missing, we're building the future of legal education — one law school at a time.",
    tags: ["TypeScript", "Python", "AI/ML", "Supabase"],
    year: "2025",
    url: "https://app.joinembra.com",
    featured: true,
  },
  {
    slug: "whos-right",
    title: "Who's Right",
    description: "A debate app that transforms arguments into constructive exchanges. AI analyzes and scores logic, provides live fact-checking, and features an ELO ranking system.",
    longDescription: "Who's Right reimagines how we debate in the digital age. Using advanced AI to analyze arguments in real-time, it scores logic quality, fact-checks claims, and maintains an ELO ranking system for users. The platform encourages substantive discourse by rewarding clear thinking and evidence-based reasoning, creating a healthier environment for productive disagreement.",
    tags: ["Swift", "TypeScript", "AI", "SpacetimeDB"],
    year: "2025",
    url: "https://www.whosright.live",
    featured: true,
  },
  {
    slug: "voltly-ai",
    title: "Voltly AI",
    description: "An AI-powered utility bill intelligence platform — automate data extraction, visualize energy trends, and forecast costs. No spreadsheets required.",
    longDescription: "Voltly AI transforms how businesses handle utility bills. Upload any utility PDF and the AI extracts every data point instantly, replacing hours of manual entry with seconds of automated intelligence. Features include automated variance alerts, spend forecasting, pitch-deck-ready reports, and Excel exports — all wrapped in enterprise-grade security with GDPR & SOC2 compliance. Built to take businesses from billing chaos to clarity.",
    tags: ["TypeScript", "AI/ML", "Next.js", "SaaS"],
    year: "2025",
    url: "https://www.voltly.ai",
    featured: true,
  },
  {
    slug: "drawsort",
    title: "DrawSort",
    description: "An interactive sorting and organization tool that makes visual categorization intuitive and fun. Draw to sort, organize, and classify.",
    longDescription: "DrawSort brings a playful approach to organizing information. Instead of clicking and dragging traditional interfaces, you draw to categorize. It's a exploration in making mundane organizational tasks feel more intuitive and engaging, leveraging Canvas API for smooth, responsive interactions.",
    tags: ["JavaScript", "HTML/CSS", "Canvas API"],
    year: "2026",
    url: "https://drawsort.com",
    featured: false,
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
    title: "A Senior Dev Said My App Would Cost $200K — I Rebuilt It in 3 Days",
    excerpt: "Here are my 7 tools that let me ship what a team of engineers quoted six figures for, in a fraction of the time.",
    date: "2025-02-20",
    readTime: "9 min read",
    tags: ["Startup", "Tools"],
    url: "https://medium.com/ai-in-plain-english/a-senior-dev-said-my-app-would-cost-200k-i-rebuilt-it-in-3-days-here-are-my-7-tools-f77375114ec3",
  },
  {
    slug: "dont-know-how-to-code-building-tech-company",
    title: "I Don't Know How to Code. I'm Building a Tech Company Anyway.",
    excerpt: "The honest story of how I went from zero coding experience to building AI products — by learning to ask the right questions.",
    date: "2025-01-15",
    readTime: "6 min read",
    tags: ["Startup", "Philosophy"],
    url: "https://medium.com/@adrianmbond/i-dont-know-how-to-code-i-m-building-a-tech-company-anyway-86c132025fe8",
  }
]

/**
 * Get projects — fetches from Notion if configured, otherwise uses static fallback.
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
 * Get blog posts — fetches from Notion if configured, otherwise uses static fallback.
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
