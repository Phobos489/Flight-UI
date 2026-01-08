import { Airport } from '@/types';

interface AirportCardProps {
  airport: Airport;
}

export default function AirportCard({ airport }: AirportCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
          <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {airport.code}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {airport.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {airport.city}, {airport.country}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              🕐 {airport.timezone}
            </span>
            {airport.is_active ? (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                Inactive
              </span>
            )}
          </div>
          {(airport.latitude && airport.longitude) && (
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
              📍 {airport.latitude.toFixed(4)}, {airport.longitude.toFixed(4)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}