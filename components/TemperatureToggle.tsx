"use client";

import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/store/weatherStore";

export function TemperatureToggle() {
  const { temperatureUnit, toggleTemperatureUnit } = useWeatherStore();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Temperature:</span>
      <div className="flex rounded-md border">
        <Button
          variant={temperatureUnit === "celsius" ? "default" : "ghost"}
          size="sm"
          onClick={toggleTemperatureUnit}
          className="rounded-r-none"
        >
          °C
        </Button>
        <Button
          variant={temperatureUnit === "fahrenheit" ? "default" : "ghost"}
          size="sm"
          onClick={toggleTemperatureUnit}
          className="rounded-l-none"
        >
          °F
        </Button>
      </div>
    </div>
  );
}
