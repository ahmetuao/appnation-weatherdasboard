import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json([], { status: 400 })
  }

  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${process.env.OPENWEATHER_API_KEY}`
  )
  const data = await res.json()

  return NextResponse.json(data)
}
