import type { ForecastDay, WeatherData, WeatherResponse } from "@/types/weather"

export async function fetchWeatherData(city: string): Promise<WeatherResponse> {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.")
      }
      throw new Error("Failed to fetch weather data")
    }

    const data = await response.json()

    const current: WeatherData = {
      name: data.current.name,
      country: data.current.sys.country,
      temperature: Math.round(data.current.main.temp),
      condition: data.current.weather[0].main,
      humidity: data.current.main.humidity,
      windSpeed: Math.round(data.current.wind.speed * 3.6),
      icon: data.current.weather[0].icon,
      description: data.current.weather[0].description,
    }

    const forecast: ForecastDay[] = []
    const processedDates = new Set<string>()

    for (const item of data.forecast.list) {
      const date = new Date(item.dt * 1000).toDateString()

      if (!processedDates.has(date) && forecast.length < 5) {
        forecast.push({
          date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          maxTemp: Math.round(item.main.temp_max),
          minTemp: Math.round(item.main.temp_min),
          condition: item.weather[0].main,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        })
        processedDates.add(date)
      }
    }

    return { current, forecast }
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong while fetching weather data.")
  }
}
