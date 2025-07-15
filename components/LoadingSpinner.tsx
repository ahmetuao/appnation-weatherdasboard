import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
        <p className="text-gray-600">Loading weather data...</p>
      </div>
    </div>
  );
}
