import { TemperatureUnit } from "@/types/weather"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertTemperature(celsius: number, unit: TemperatureUnit): number {
  if (unit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32)
  }
  return celsius
}

export function getTemperatureUnit(unit: TemperatureUnit): string {
  return unit === "celsius" ? "°C" : "°F"
}

export function getWeatherIcon(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

export function formatWindSpeed(speed: number, unit: TemperatureUnit): string {
  if (unit === "fahrenheit") {
    return `${Math.round(speed * 0.621371)} mph`
  }
  return `${speed} km/h`
}