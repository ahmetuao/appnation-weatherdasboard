"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import
  {
    convertTemperature,
    getTemperatureUnit,
    getWeatherIcon,
  } from "@/lib/utils";
import { useWeatherStore } from "@/store/weatherStore";
import Image from "next/image";

export function ForecastCard() {
  const { forecast, temperatureUnit } = useWeatherStore();

  if (forecast.length === 0) {
    return null;
  }

  const unit = getTemperatureUnit(temperatureUnit);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="font-medium text-sm mb-2">{day.date}</div>
              <Image
                src={getWeatherIcon(day.icon) || "/placeholder.svg"}
                alt={day.description}
                width={50}
                height={50}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-xs text-gray-600 capitalize mb-2">
                {day.description}
              </div>
              <div className="space-y-1">
                <div className="font-semibold">
                  {convertTemperature(day.maxTemp, temperatureUnit)}
                  {unit}
                </div>
                <div className="text-sm text-gray-500">
                  {convertTemperature(day.minTemp, temperatureUnit)}
                  {unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
