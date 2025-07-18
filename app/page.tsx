"use client";

import { ForecastCard } from "@/components/ForecastCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SearchBar } from "@/components/SearchBar";
import { SearchHistory } from "@/components/SearchHistory";
import { TemperatureToggle } from "@/components/TemperatureToggle";
import { WeatherCard } from "@/components/WeatherCard";
import { useWeatherData } from "@/hooks/useWeatherData";
import { useWeatherStore } from "@/store/weatherStore";
import { CitySuggestion, SearchHistoryItem } from "@/types/weather";
import { useState } from "react";

export default function HomePage() {
  const [searchCity, setSearchCity] = useState<CitySuggestion | null>(null);
  const { addToSearchHistory, isLoading, currentWeather } = useWeatherStore();

  useWeatherData(searchCity?.lat || null, searchCity?.lon || null);

  const handleSearch = (city: CitySuggestion) => {
    setSearchCity(city);

    const label = `${city.name}${city.state ? ", " + city.state : ""}, ${
      city.country
    }`;
    addToSearchHistory(city);
  };

  const handleHistorySelect = (item: SearchHistoryItem) => {
    console.log(item, "aa");
    setSearchCity({
      name: item.city,
      lat: item.lat,
      lon: item.lon,
      state: "",
      country: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 to-indigo-300 backdrop-blur-lg relative">
      <div className="container mx-auto px-4 lg:py-12 py-6">
        <div className="flex lg:justify-end justify-center sticky top-3 right-3 mb-6 lg:mb-0 z-50">
          <TemperatureToggle />
        </div>

        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-3 tracking-tight">
            🌦️ Weather Dashboard
          </h1>
          <p className="text-lg text-white/80">
            Explore real-time weather & forecast with a modern UI
          </p>
        </header>

        <div className="space-y-8">
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          <div className="flex justify-center">
            <SearchHistory onCitySelect={handleHistorySelect} />
          </div>

          {isLoading && (
            <div className="flex justify-center mt-8">
              <LoadingSpinner />
            </div>
          )}

          {currentWeather && !isLoading && (
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/80 rounded-2xl shadow-xl p-6 backdrop-blur-md transition hover:scale-[1.01]">
                <WeatherCard />
              </div>
              <div className="bg-white/80 rounded-2xl shadow-xl p-6 backdrop-blur-md transition hover:scale-[1.01]">
                <ForecastCard />
              </div>
            </div>
          )}

          {!currentWeather && !isLoading && (
            <div className="text-center mt-16 opacity-90">
              <div className="text-[5rem] mb-4">🌤️</div>
              <h2 className="text-3xl font-semibold text-white drop-shadow-md mb-2">
                Welcome to Weather Dashboard
              </h2>
              <p className="text-white/80">
                Search for a city to get started and see the forecast
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
