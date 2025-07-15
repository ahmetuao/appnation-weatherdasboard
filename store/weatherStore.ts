import type { ForecastDay, SearchHistoryItem, TemperatureUnit, WeatherData } from "@/types/weather"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WeatherStore {
  currentWeather: WeatherData | null
  forecast: ForecastDay[]
  searchHistory: SearchHistoryItem[]
  temperatureUnit: TemperatureUnit
  isLoading: boolean
  error: string | null

  setCurrentWeather: (weather: WeatherData) => void
  setForecast: (forecast: ForecastDay[]) => void
  addToSearchHistory: (city: string) => void
  toggleTemperatureUnit: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      currentWeather: null,
      forecast: [],
      searchHistory: [],
      temperatureUnit: "celsius",
      isLoading: false,
      error: null,

      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setForecast: (forecast) => set({ forecast }),

      addToSearchHistory: (city) => {
        const history = get().searchHistory
        const newItem: SearchHistoryItem = {
          city,
          timestamp: Date.now(),
        }

        const filteredHistory = history.filter((item) => item.city.toLowerCase() !== city.toLowerCase())

        const updatedHistory = [newItem, ...filteredHistory].slice(0, 5)
        set({ searchHistory: updatedHistory })
      },

      toggleTemperatureUnit: () => {
        const currentUnit = get().temperatureUnit
        set({ temperatureUnit: currentUnit === "celsius" ? "fahrenheit" : "celsius" })
      },

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        searchHistory: state.searchHistory,
        temperatureUnit: state.temperatureUnit,
      }),
    },
  ),
)
