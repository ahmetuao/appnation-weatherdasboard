import { CitySuggestion } from "@/types/weather";

export async function getCitySuggestions(
  query: string
): Promise<CitySuggestion[]> {
  const res = await fetch(`/api/suggestions?q=${query}`);

  if (!res.ok) {
    console.error("Failed to fetch city suggestions");
    return [];
  }

  const data = await res.json();

  if (data?.length) {
    return data?.map((item: any) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } else {
    return [];
  }
}
