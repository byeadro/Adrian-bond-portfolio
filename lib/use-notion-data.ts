"use client"

import { useState, useEffect } from "react"
import { projects as fallbackProjects, blogPosts as fallbackBlogPosts } from "./data"
import type { Project, BlogPost } from "./data"
import type { Announcement, SiteSettings } from "./data"

/**
 * Hook that returns projects — shows static data instantly, then swaps in
 * live Notion data once it loads. If the API fails, keeps the static data.
 */
export function useProjects(): Project[] {
  const [data, setData] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((notionData) => {
        if (notionData && notionData.length > 0) {
          // Merge: use Notion data as base, then add any fallback projects
          // that aren't already in Notion (e.g. Voltly added via code)
          const notionSlugs = new Set(notionData.map((p: Project) => p.slug))
          const extras = fallbackProjects.filter((p) => !notionSlugs.has(p.slug))
          setData([...notionData, ...extras])
        }
      })
      .catch(() => {
        // Keep fallback data on error
      })
  }, [])

  return data
}

/**
 * Hook that returns blog posts — shows static data instantly, then swaps in
 * live Notion data once it loads. If the API fails, keeps the static data.
 */
export function useBlogPosts(): BlogPost[] {
  const [data, setData] = useState<BlogPost[]>(fallbackBlogPosts)

  useEffect(() => {
    fetch("/api/writing")
      .then((res) => res.json())
      .then((notionData) => {
        if (notionData && notionData.length > 0) {
          setData(notionData)
        }
      })
      .catch(() => {
        // Keep fallback data on error
      })
  }, [])

  return data
}

function useRemoteData<T>(url: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback)

  useEffect(() => {
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json() as Promise<T>
      })
      .then(setData)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error(`Failed to load ${url}:`, error)
        }
      })
    return () => controller.abort()
  }, [url])

  return data
}

export function useAnnouncements(): Announcement[] {
  return useRemoteData<Announcement[]>("/api/announcements", [])
}

export function useSiteSettings(): SiteSettings {
  return useRemoteData<SiteSettings>("/api/site-settings", {})
}
