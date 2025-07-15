"use client";

import { ForecastCard } from "@/components/ForecastCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SearchBar } from "@/components/SearchBar";
import { SearchHistory } from "@/components/SearchHistory";
import { TemperatureToggle } from "@/components/TemperatureToggle";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherStore } from "@/store/weatherStore";
import { useState } from "react";

export default function HomePage() {
  const [searchCity, setSearchCity] = useState<string | null>(null);
  const { addToSearchHistory, isLoading, currentWeather } = useWeatherStore();

  useWeatherData(searchCity);

  const handleSearch = (city: string) => {
    setSearchCity(city);
    addToSearchHistory(city);
  };

  const handleHistorySelect = (city: string) => {
    setSearchCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Weather Dashboard
          </h1>
          <p className="text-gray-600">
            Get real-time weather information for any city
          </p>
        </header>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <TemperatureToggle />
          </div>

          <SearchHistory onCitySelect={handleHistorySelect} />

          {isLoading && <LoadingSpinner />}

          {currentWeather && !isLoading && (
            <div className="space-y-6">
              <WeatherCard />
              <ForecastCard />
            </div>
          )}

          {!currentWeather && !isLoading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌤️</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Welcome to Weather Dashboard
              </h2>
              <p className="text-gray-600">
                Search for a city to get started with weather information
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
