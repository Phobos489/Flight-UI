import { Airport } from '@/types';

interface AirportCardProps {
  airport: Airport;
}

export default function AirportCard({ airport }: AirportCardProps) {
  // Convert latitude and longitude to numbers for display
  const lat = airport.latitude ? Number(airport.latitude) : null;
  const lng = airport.longitude ? Number(airport.longitude) : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative p-6 z-10">
        <div className="flex items-start gap-4">
          {/* Airport code badge */}
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl shadow-purple-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-3xl font-black text-white drop-shadow-lg">
                {airport.code}
              </span>
            </div>
            {/* Pulse animation ring */}
            <div className="absolute inset-0 rounded-2xl bg-purple-400 animate-ping opacity-20" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {airport.name}
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              📍 {airport.city}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              {airport.country}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Timezone badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700 border border-gray-200 dark:border-zinc-700">
                <span className="text-xs">🕐</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {airport.timezone}
                </span>
              </div>
              
              {/* Status badge */}
              {airport.is_active ? (
                <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold text-white">Active</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-500">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-xs font-bold text-white">Inactive</span>
                </div>
              )}
            </div>

            {/* Coordinates */}
            {(lat !== null && lng !== null && !isNaN(lat) && !isNaN(lng)) && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-200 mb-1">
                  📍 Koordinat GPS
                </p>
                <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300">
                  {lat.toFixed(4)}°, {lng.toFixed(4)}°
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
      </div>
    </div>
  );
}