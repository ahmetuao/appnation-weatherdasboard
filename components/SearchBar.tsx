"use client";

import { useCitySuggestions } from "@/hooks/useCitySuggestions";
import { CitySuggestion } from "@/lib/getCitySuggestions";
import { useWeatherStore } from "@/store/weatherStore";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: CitySuggestion) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { error, clearError } = useWeatherStore();

  const { results } = useCitySuggestions(query);

  const handleClear = () => {
    setQuery("");
    clearError();
    setShowSuggestions(false);
  };

  const handleSelect = (city: CitySuggestion) => {
    const label = `${city.name}${city.state ? ", " + city.state : ""}, ${
      city.country
    }`;
    setQuery(label);
    clearError();
    onSearch(city);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto relative">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-200 px-4 py-2 flex items-center gap-3 transition-all duration-200"
      >
        <Search className="text-gray-400 w-5 h-5" />

        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          disabled={isLoading}
          className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* <Button
          type="submit"
          disabled
          className="h-9 px-4 text-sm rounded-full bg-indigo-300 text-white cursor-not-allowed opacity-60"
        >
          Select from list
        </Button> */}
      </form>

      {/* Autocomplete Dropdown */}
      {showSuggestions && results.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg z-50 overflow-hidden">
          {results.map((city, i) => (
            <li
              key={i}
              onClick={() => handleSelect(city)}
              className={clsx(
                "px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm text-gray-800 border-b last:border-b-0"
              )}
            >
              {city.name}
              {city.state ? `, ${city.state}` : ""}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
