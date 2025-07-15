"use client";

import { fetchWeatherData } from "@/lib/weatherApi";
import type {
  ForecastDay,
  WeatherData,
  WeatherResponse,
} from "@/types/weather";
import { useEffect, useState } from "react";
import useSWR from "swr";

export function useWeatherData(city: string | null) {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR<WeatherResponse>(
    city ? ["weather", city] : null,
    (key: [string, string]) => fetchWeatherData(key[1]),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
      errorRetryCount: 2,
      errorRetryInterval: 1000,
    }
  );

  useEffect(() => {
    if (data) {
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error.message || "An error occurred while fetching weather data"
      );
    } else {
      setErrorMessage(null);
    }
  }, [error]);

  return {
    currentWeather,
    forecast,
    error: errorMessage,
    isLoading,
    refetch: mutate,
  };
}
