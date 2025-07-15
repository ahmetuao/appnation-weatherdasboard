"use client";

import { Button } from "@/components/ui/button";
import { useWeatherStore } from "@/store/weatherStore";
import { Search, X } from "lucide-react";
import type React from "react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const { error, clearError } = useWeatherStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      clearError();
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    clearError();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/70 backdrop-blur-md rounded-full shadow-md border border-gray-200 px-4 py-2 flex items-center gap-3 transition-all duration-200"
      >
        {/* Search Icon */}
        <Search className="text-gray-400 w-5 h-5" />

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter city name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="flex-grow bg-transparent text-gray-800 placeholder-gray-400 focus:outline-none text-base"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-red-500 transition-colors duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="h-9 px-4 text-sm rounded-full bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>

      {/* Error */}
      {error && (
        <div className="mt-3 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 shadow-sm">
          {error}
        </div>
      )}
    </div>
  );
}
