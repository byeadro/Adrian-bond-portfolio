const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_VERSION = "2025-09-03"

const DATA_SOURCES = {
  projects: process.env.NOTION_PROJECTS_DATA_SOURCE_ID,
  writing: process.env.NOTION_WRITING_DATA_SOURCE_ID,
  announcements: process.env.NOTION_ANNOUNCEMENTS_DATA_SOURCE_ID,
  siteSettings: process.env.NOTION_SITE_SETTINGS_DATA_SOURCE_ID,
}

type NotionProperty = {
  type?: string
  title?: Array<{ plain_text?: string }>
  rich_text?: Array<{ plain_text?: string }>
  select?: { name?: string } | null
  multi_select?: Array<{ name?: string }>
  checkbox?: boolean
  url?: string | null
  date?: { start?: string; end?: string | null } | null
  number?: number | null
  files?: Array<{
    type?: "file" | "external"
    file?: { url?: string }
    external?: { url?: string }
  }>
}

type NotionPage = {
  id: string
  properties: Record<string, NotionProperty>
}

type QueryResponse = {
  results: NotionPage[]
  has_more: boolean
  next_cursor?: string | null
}

export interface NotionProject {
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

export interface NotionBlogPost {
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

export interface NotionAnnouncement {
  id: string
  title: string
  message: string
  link?: string
  linkLabel?: string
  type: string
  priority: number
  placements: string[]
  startDate?: string
  endDate?: string
}

export type NotionSiteSettings = Record<string, string>

function text(prop?: NotionProperty): string {
  const values = prop?.type === "title" ? prop.title : prop?.rich_text
  return values?.map((item) => item.plain_text ?? "").join("") ?? ""
}

function select(prop?: NotionProperty): string {
  return prop?.select?.name ?? ""
}

function multiSelect(prop?: NotionProperty): string[] {
  return prop?.multi_select?.flatMap((item) => (item.name ? [item.name] : [])) ?? []
}

function files(prop?: NotionProperty): string[] {
  return prop?.files?.flatMap((item) => {
    const url = item.type === "external" ? item.external?.url : item.file?.url
    return url ? [url] : []
  }) ?? []
}

function isVisibleStatus(prop?: NotionProperty): boolean {
  const status = select(prop).toLowerCase()
  return status !== "draft" && status !== "archived"
}

async function notionRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!NOTION_API_KEY) throw new Error("NOTION_API_KEY is not configured")

  const response = await fetch(`https://api.notion.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Notion API ${response.status}: ${error}`)
  }

  return response.json() as Promise<T>
}

async function queryDataSource(dataSourceId?: string, sorts: unknown[] = []): Promise<NotionPage[]> {
  if (!dataSourceId) return []

  const pages: NotionPage[] = []
  let cursor: string | undefined

  do {
    const response = await notionRequest<QueryResponse>(`/data_sources/${dataSourceId}/query`, {
      method: "POST",
      body: JSON.stringify({ page_size: 100, sorts, ...(cursor ? { start_cursor: cursor } : {}) }),
    })
    pages.push(...response.results)
    cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined
  } while (cursor)

  return pages
}

async function fetchPageContent(pageId: string): Promise<string[]> {
  type Block = {
    type: string
    paragraph?: { rich_text?: Array<{ plain_text?: string }> }
    heading_1?: { rich_text?: Array<{ plain_text?: string }> }
    heading_2?: { rich_text?: Array<{ plain_text?: string }> }
    heading_3?: { rich_text?: Array<{ plain_text?: string }> }
    bulleted_list_item?: { rich_text?: Array<{ plain_text?: string }> }
    numbered_list_item?: { rich_text?: Array<{ plain_text?: string }> }
    quote?: { rich_text?: Array<{ plain_text?: string }> }
  }
  type BlockResponse = { results: Block[] }

  const response = await notionRequest<BlockResponse>(`/blocks/${pageId}/children?page_size=100`)
  return response.results.flatMap((block) => {
    const value = block[block.type as keyof Block]
    if (!value || typeof value !== "object" || !("rich_text" in value)) return []
    const line = value.rich_text?.map((item) => item.plain_text ?? "").join("").trim()
    return line ? [line] : []
  })
}

export async function fetchProjects(): Promise<NotionProject[]> {
  try {
    const pages = await queryDataSource(DATA_SOURCES.projects, [
      { property: "Order", direction: "ascending" },
      { property: "Date Published", direction: "descending" },
    ])

    return pages
      .filter((page) => isVisibleStatus(page.properties.Status))
      .map((page) => {
        const props = page.properties
        return {
          slug: text(props.Slug),
          title: text(props.Name),
          description: text(props.Description),
          longDescription: text(props["Long Description"]),
          tags: multiSelect(props.Tags),
          year: select(props.Year),
          url: props.URL?.url ?? "",
          featured: props.Featured?.checkbox ?? false,
          role: text(props.Role),
          client: text(props.Client),
          problem: text(props.Problem),
          solution: text(props.Solution),
          results: text(props.Results),
          coverImage: files(props["Cover Image"])[0],
          gallery: files(props.Gallery),
          githubUrl: props["Github URL"]?.url ?? undefined,
          seoDescription: text(props["SEO Description"]),
          publishedAt: props["Date Published"]?.date?.start,
          order: props.Order?.number ?? undefined,
        }
      })
      .filter((project) => project.slug && project.title)
  } catch (error) {
    console.error("Failed to fetch projects from Notion:", error)
    return []
  }
}

export async function fetchBlogPosts(): Promise<NotionBlogPost[]> {
  try {
    const pages = await queryDataSource(DATA_SOURCES.writing, [
      { property: "Date", direction: "descending" },
    ])

    return Promise.all(
      pages
        .filter((page) => isVisibleStatus(page.properties.Status))
        .map(async (page) => {
          const props = page.properties
          const url = props.URL?.url ?? undefined
          return {
            slug: text(props.Slug),
            title: text(props.Title),
            excerpt: text(props.Excerpt),
            date: props.Date?.date?.start ?? "",
            readTime: text(props["Read Time"]),
            tags: multiSelect(props.Tags),
            url,
            featured: props.Featured?.checkbox ?? false,
            coverImage: files(props["Cover Image"])[0],
            seoDescription: text(props["SEO Description"]),
            canonicalUrl: props["Canonical URL"]?.url ?? undefined,
            content: url ? undefined : await fetchPageContent(page.id),
          }
        }),
    )
  } catch (error) {
    console.error("Failed to fetch writing from Notion:", error)
    return []
  }
}

export async function fetchAnnouncements(): Promise<NotionAnnouncement[]> {
  try {
    const now = new Date()
    const pages = await queryDataSource(DATA_SOURCES.announcements, [
      { property: "Priority", direction: "descending" },
      { property: "Start Date", direction: "descending" },
    ])

    return pages
      .filter((page) => {
        const props = page.properties
        if (!props.Active?.checkbox) return false
        const start = props["Start Date"]?.date?.start
        const end = props["End Date"]?.date?.start
        return (!start || new Date(start) <= now) && (!end || new Date(end) >= now)
      })
      .map((page) => {
        const props = page.properties
        return {
          id: page.id,
          title: text(props.Title),
          message: text(props.Message),
          link: props.Link?.url ?? undefined,
          linkLabel: text(props["Link Label"]) || undefined,
          type: select(props.Type),
          priority: props.Priority?.number ?? 0,
          placements: multiSelect(props.Placement).map((placement) => placement.toLowerCase()),
          startDate: props["Start Date"]?.date?.start,
          endDate: props["End Date"]?.date?.start,
        }
      })
      .filter((announcement) => announcement.title || announcement.message)
  } catch (error) {
    console.error("Failed to fetch announcements from Notion:", error)
    return []
  }
}

export async function fetchSiteSettings(): Promise<NotionSiteSettings> {
  try {
    const pages = await queryDataSource(DATA_SOURCES.siteSettings)
    return Object.fromEntries(
      pages.flatMap((page) => {
        const props = page.properties
        if (!props.Enabled?.checkbox) return []
        const key = text(props.Setting).trim().toLowerCase()
        const value = props.URL?.url || text(props.Value)
        return key && value ? [[key, value]] : []
      }),
    )
  } catch (error) {
    console.error("Failed to fetch site settings from Notion:", error)
    return {}
  }
}
