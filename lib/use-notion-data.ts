"use client"

import { useState, useEffect } from "react"
import { projects as fallbackProjects, blogPosts as fallbackBlogPosts } from "./data"
import type { Project, BlogPost } from "./data"

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
