// app/api/weather/route.ts

import { NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get("city")

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 })
  }

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 })
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`),
      fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`),
    ])

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json({ error: "City not found or request failed" }, { status: 404 })
    }

    const currentData = await currentRes.json()
    const forecastData = await forecastRes.json()

    return NextResponse.json({
      current: currentData,
      forecast: forecastData,
    })
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
