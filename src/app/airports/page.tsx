// src/app/airports/page.tsx
import { getAirports } from '@/lib/api';
import Link from 'next/link';

export const metadata = {
  title: 'Bandara - FlightInfo',
  description: 'Daftar bandara',
};

export default async function AirportsPage() {
  const airports = await getAirports();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Bandara
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Daftar semua bandara yang terdaftar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airports.map((airport) => (
          <Link
            key={airport.id}
            href={`/airports/${airport.id}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">
                  {airport.code}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {airport.city}, {airport.country}
                </p>
              </div>
              {airport.is_active && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Aktif
                </span>
              )}
            </div>
            
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              {airport.name}
            </h4>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>📍 Timezone: {airport.timezone}</div>
              {airport.latitude && airport.longitude && (
                <div className="mt-1">
                  🗺️ {airport.latitude}, {airport.longitude}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}