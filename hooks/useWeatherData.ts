"use client";

import { fetchWeatherData } from "@/lib/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { useEffect } from "react";
import useSWR from "swr";

export function useWeatherData(lat: number | null, lon: number | null) {
  const { setCurrentWeather, setForecast, setLoading, setError, clearError } =
    useWeatherStore();

  const { data, error, isLoading, mutate } = useSWR(
    lat && lon ? ["weather", lat, lon] : null,
    ([, latitude, longitude]) => fetchWeatherData(latitude, longitude),
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, 
      errorRetryCount: 2,
      errorRetryInterval: 1000,
    }
  );

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (error) {
      setError(
        error.message || "An error occurred while fetching weather data"
      );
    } else {
      clearError();
    }
  }, [error, setError, clearError]);

  useEffect(() => {
    if (data) {
      setCurrentWeather(data.current);
      setForecast(data.forecast);
    }
  }, [data, setCurrentWeather, setForecast]);

  return {
    data,
    error,
    isLoading,
    refetch: mutate,
  };
}
