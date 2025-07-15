export interface WeatherData {
  name: string
  country: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  description: string
}

export interface ForecastDay {
  date: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  description: string
}

export interface WeatherResponse {
  current: WeatherData
  forecast: ForecastDay[]
}

export interface SearchHistoryItem {
  city: string
  timestamp: number
}

export type TemperatureUnit = "celsius" | "fahrenheit"
