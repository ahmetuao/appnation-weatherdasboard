import { CitySuggestion, getCitySuggestions } from "@/lib/getCitySuggestions"
import { useEffect, useState } from "react"

export function useCitySuggestions(query: string) {
  const [results, setResults] = useState<CitySuggestion[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setLoading(true)
      getCitySuggestions(query)
        .then(setResults)
        .finally(() => setLoading(false))
    }, 400)

    return () => clearTimeout(delayDebounce)
  }, [query])

  return { results, loading }
}
