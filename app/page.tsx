"use client";

import { SearchBar } from "@/components/SearchBar";
import { TemperatureToggle } from "@/components/TemperatureToggle";
import { WeatherCard } from "@/components/WeatherCard";
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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          <TemperatureToggle />
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {currentWeather && !isLoading && (
          <div className="space-y-6">
            <WeatherCard />
          </div>
        )}
      </div>
    </div>
  );
}
