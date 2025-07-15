"use client";

import { Card, CardContent } from "@/components/ui/card";
import
  {
    convertTemperature,
    formatWindSpeed,
    getTemperatureUnit,
    getWeatherIcon,
  } from "@/lib/utils";
import { useWeatherStore } from "@/store/weatherStore";
import { Droplets, MapPin, Wind } from "lucide-react";
import Image from "next/image";

export function WeatherCard() {
  const { currentWeather, temperatureUnit } = useWeatherStore();

  if (!currentWeather) {
    return null;
  }

  const temperature = convertTemperature(
    currentWeather.temperature,
    temperatureUnit
  );
  const unit = getTemperatureUnit(temperatureUnit);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <h2 className="text-xl font-semibold">
              {currentWeather.name}, {currentWeather.country}
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <Image
              src={getWeatherIcon(currentWeather.icon) || "/placeholder.svg"}
              alt={currentWeather.description}
              width={80}
              height={80}
              className="w-20 h-20"
            />
            <div>
              <div className="text-4xl font-bold">
                {temperature}
                {unit}
              </div>
              <div className="text-gray-600 capitalize">
                {currentWeather.description}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="font-semibold">{currentWeather.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <Wind className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="font-semibold">
                {formatWindSpeed(currentWeather.windSpeed, temperatureUnit)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
