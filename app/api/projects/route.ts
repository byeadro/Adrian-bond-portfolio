import { NextResponse } from "next/server"
import { getProjects } from "@/lib/data"

export const revalidate = 60 // revalidate every 60 seconds

export async function GET() {
  const projects = await getProjects()
  return NextResponse.json(projects)
}
