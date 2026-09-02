"use client"

import { ArrowUpRight, Megaphone } from "lucide-react"
import { useAnnouncements } from "@/lib/use-notion-data"

export function AnnouncementBanner() {
  const announcements = useAnnouncements()
  const announcement = announcements.find(
    (item) =>
      item.placements.length === 0 ||
      item.placements.includes("banner") ||
      item.placements.includes("homepage"),
  )

  if (!announcement) return null

  const content = (
    <div className="flex items-center justify-center gap-3 px-4 py-2.5 text-center font-mono text-[11px] tracking-wide sm:text-xs">
      <Megaphone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span>
        {announcement.title && <strong className="font-medium text-white">{announcement.title}: </strong>}
        <span className="text-white/75">{announcement.message}</span>
      </span>
      {announcement.link && (
        <span className="inline-flex items-center gap-1 text-white">
          {announcement.linkLabel || "Learn more"}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </div>
  )

  return (
    <aside
      className="fixed inset-x-0 top-[64px] z-40 border-y border-white/10 bg-blue-600/95 backdrop-blur md:top-[72px]"
      aria-label="Announcement"
    >
      {announcement.link ? (
        <a href={announcement.link} target="_blank" rel="noopener noreferrer" className="block hover:bg-white/5">
          {content}
        </a>
      ) : (
        content
      )}
    </aside>
  )
}
