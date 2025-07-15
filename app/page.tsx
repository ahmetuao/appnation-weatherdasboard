"use client";

import { SearchBar } from "@/components/SearchBar";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherStore } from "@/store/weatherStore";
import { useState } from "react";

export default function Home() {
  const [searchCity, setSearchCity] = useState<string | null>(null);

  const { addToSearchHistory, error, isLoading, currentWeather } =
    useWeatherStore();

  useWeatherData(searchCity);

  const handleSearch = (city: string) => {
    setSearchCity(city);
    addToSearchHistory(city);
  };

  return (
    <div className="min-h-screen py-10 px-6 bg-gray-100">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Weather Dashboard
        </h1>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

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
  );
}
