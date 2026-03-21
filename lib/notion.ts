const NOTION_API_KEY = process.env.NOTION_API_KEY!
const PROJECTS_DB_ID = process.env.NOTION_PROJECTS_DB_ID!
const WRITING_DB_ID = process.env.NOTION_WRITING_DB_ID!

// Use the Notion REST API directly (SDK v5 dataSources.query doesn't work with database IDs)
async function queryDatabase(databaseId: string, sorts: any[] = []): Promise<any> {
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sorts }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Notion API error: ${error.code} - ${error.message}`)
  }

  return response.json()
}

// Helper to safely extract text from Notion rich text
function getRichText(prop: any): string {
  if (!prop || prop.type !== "rich_text") return ""
  return prop.rich_text.map((t: any) => t.plain_text).join("")
}

function getTitle(prop: any): string {
  if (!prop || prop.type !== "title") return ""
  return prop.title.map((t: any) => t.plain_text).join("")
}

function getSelect(prop: any): string {
  if (!prop || prop.type !== "select" || !prop.select) return ""
  return prop.select.name
}

function getMultiSelect(prop: any): string[] {
  if (!prop || prop.type !== "multi_select") return []
  return prop.multi_select.map((s: any) => s.name)
}

function getCheckbox(prop: any): boolean {
  if (!prop || prop.type !== "checkbox") return false
  return prop.checkbox
}

function getUrl(prop: any): string {
  if (!prop || prop.type !== "url") return ""
  return prop.url || ""
}

function getDate(prop: any): string {
  if (!prop || prop.type !== "date" || !prop.date) return ""
  return prop.date.start || ""
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
}

export interface NotionBlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  url?: string
}

export async function fetchProjects(): Promise<NotionProject[]> {
  try {
    const response = await queryDatabase(PROJECTS_DB_ID, [
      { property: "Year", direction: "descending" },
    ])

    return response.results.map((page: any) => {
      const props = page.properties
      return {
        slug: getRichText(props["Slug"]),
        title: getTitle(props["Name"]),
        description: getRichText(props["Description"]),
        longDescription: getRichText(props["Long Description"]),
        tags: getMultiSelect(props["Tags"]),
        year: getSelect(props["Year"]),
        url: getUrl(props["URL"]),
        featured: getCheckbox(props["Featured"]),
      }
    })
  } catch (error) {
    console.error("Failed to fetch projects from Notion:", error)
    return []
  }
}

export async function fetchBlogPosts(): Promise<NotionBlogPost[]> {
  try {
    const response = await queryDatabase(WRITING_DB_ID, [
      { property: "Date", direction: "descending" },
    ])

    return response.results.map((page: any) => {
      const props = page.properties
      const url = getUrl(props["URL"])
      return {
        slug: getRichText(props["Slug"]),
        title: getTitle(props["Title"]),
        excerpt: getRichText(props["Excerpt"]),
        date: getDate(props["Date"]),
        readTime: getRichText(props["Read Time"]),
        tags: getMultiSelect(props["Tags"]),
        ...(url ? { url } : {}),
      }
    })
  } catch (error) {
    console.error("Failed to fetch blog posts from Notion:", error)
    return []
  }
}
