"use client";

import { useWeatherStore } from "@/store/weatherStore";
import type { SearchHistoryItem } from "@/types/weather";
import { Clock } from "lucide-react";

interface SearchHistoryProps {
  onCitySelect: (item: SearchHistoryItem) => void;
}

export function SearchHistory({ onCitySelect }: SearchHistoryProps) {
  const { searchHistory } = useWeatherStore();

  if (searchHistory.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-gray-500" />
        <span className="text-base font-medium text-gray-700 tracking-tight">
          Recent searches
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {searchHistory.map((item, index) => (
          <button
            key={`${item.city}-${index}`}
            onClick={() => onCitySelect(item)}
            className="px-3 py-1.5 text-sm rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-gray-700 hover:bg-white transition-all duration-150 border border-gray-200 hover:shadow-md"
          >
            {item.city}
          </button>
        ))}
      </div>
    </div>
  );
}
