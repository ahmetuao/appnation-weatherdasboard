"use client";

import { useWeatherStore } from "@/store/weatherStore";
import clsx from "clsx";
import { LucideThermometerSnowflake, LucideThermometerSun } from "lucide-react";

export function TemperatureToggle() {
  const { temperatureUnit, toggleTemperatureUnit } = useWeatherStore();

  const isCelsius = temperatureUnit === "celsius";

  return (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-3 py-2 rounded-full shadow border border-gray-200">
      <span className="text-sm font-medium text-gray-700">Temp</span>

      <div
        onClick={toggleTemperatureUnit}
        className="relative w-20 h-9 bg-gray-200 rounded-full cursor-pointer transition-colors duration-300"
      >
        <div
          className={clsx(
            "absolute top-1 left-1 w-7 h-7 rounded-full shadow-md bg-white flex items-center justify-center transition-all duration-300",
            !isCelsius && "translate-x-11"
          )}
        >
          {isCelsius ? (
            <LucideThermometerSnowflake className="w-4 h-4 text-sky-500" />
          ) : (
            <LucideThermometerSun className="w-4 h-4 text-orange-400" />
          )}
        </div>

        {isCelsius ? (
          <div className="absolute top-1 right-1 w-7 h-7 text-[12px] text-center pt-1 text-gray-600 select-none">
            °F
          </div>
        ) : (
          <div className="absolute top-1 left-1 w-7 h-7 text-[12px] text-center pt-1 text-gray-600 select-none">
            °C
          </div>
        )}
      </div>
    </div>
  );
}
