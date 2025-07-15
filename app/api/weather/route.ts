import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function GET(req: NextRequest) {
  const lat = req.nextUrl.searchParams.get("lat");
  const lon = req.nextUrl.searchParams.get("lon");

  if (!API_KEY) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and Longitude are required" },
      { status: 400 }
    );
  }

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ),
      fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      ),
    ]);

    if (!currentRes.ok || !forecastRes.ok) {
      return NextResponse.json(
        { error: "City not found or request failed" },
        { status: 404 }
      );
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    return NextResponse.json({
      current: currentData,
      forecast: forecastData,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
