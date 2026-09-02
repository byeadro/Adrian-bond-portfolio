import { getAnnouncements } from "@/lib/data"

export const revalidate = 60

export async function GET() {
  return Response.json(await getAnnouncements())
}
