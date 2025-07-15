"use client"

import { Button } from "@/components/ui/button"
import { useWeatherStore } from "@/store/weatherStore"
import { Clock } from "lucide-react"

interface SearchHistoryProps {
  onCitySelect: (city: string) => void
}

export function SearchHistory({ onCitySelect }: SearchHistoryProps) {
  const { searchHistory } = useWeatherStore()

  if (searchHistory.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-600">Recent searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchHistory.map((item, index) => (
          <Button
            key={`${item.city}-${index}`}
            variant="outline"
            size="sm"
            onClick={() => onCitySelect(item.city)}
            className="text-xs"
          >
            {item.city}
          </Button>
        ))}
      </div>
    </div>
  )
}
