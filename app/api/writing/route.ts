import { NextResponse } from "next/server"
import { getBlogPosts } from "@/lib/data"

export const revalidate = 60 // revalidate every 60 seconds

export async function GET() {
  const posts = await getBlogPosts()
  return NextResponse.json(posts)
}
