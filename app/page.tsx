"use client"

import { useWeatherData } from "@/hooks/useWeatherData"
import { useState } from "react"

export default function Home() {
  const [inputValue, setInputValue] = useState("")
  const [city, setCity] = useState<string | null>(null)

  const { currentWeather, forecast, error, isLoading } = useWeatherData(city)

  const handleSearch = () => {
    if (inputValue.trim() !== "") {
      setCity(inputValue.trim())
    }
  }

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-100">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Weather Dashboard</h1>

        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 px-4 py-2 border rounded"
            type="text"
            placeholder="Enter city name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {currentWeather && (
          <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="text-xl font-semibold mb-2">
              {currentWeather.name}, {currentWeather.country}
            </h2>
            <p>🌡️ Temp: {currentWeather.temperature}°C</p>
            <p>💧 Humidity: {currentWeather.humidity}%</p>
            <p>🌬️ Wind: {currentWeather.windSpeed} km/h</p>
            <p>☁️ Condition: {currentWeather.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
