// src/app/airlines/page.tsx
import { getAirlines } from '@/lib/api';
import Link from 'next/link';

export const metadata = {
  title: 'Maskapai Penerbangan - FlightInfo',
  description: 'Daftar maskapai penerbangan',
};

export default async function AirlinesPage() {
  const airlines = await getAirlines();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Maskapai Penerbangan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Daftar semua maskapai penerbangan yang beroperasi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {airlines.map((airline) => (
          <Link
            key={airline.id}
            href={`/airlines/${airline.id}`}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-3xl">
                ✈️
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {airline.code}
                  </h3>
                  {airline.is_active && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Aktif
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {airline.name}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Negara:</span> {airline.country}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {airlines.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✈️</div>
          <p className="text-gray-600 dark:text-gray-400">
            Tidak ada data maskapai
          </p>
        </div>
      )}
    </div>
  );
}