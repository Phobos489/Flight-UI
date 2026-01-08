// src/app/airports/[id]/page.tsx
import { getAirport } from '@/lib/api';
import Link from 'next/link';

export default async function AirportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const airport = await getAirport(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/airports"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center"
      >
        ← Kembali ke Daftar Bandara
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold text-blue-600">
              {airport.code}
            </h1>
            {airport.is_active && (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                Aktif Beroperasi
              </span>
            )}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {airport.name}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
            {airport.city}, {airport.country}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Kota
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airport.city}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Negara
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airport.country}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Zona Waktu
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airport.timezone}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Koordinat
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airport.latitude && airport.longitude
                ? `${airport.latitude}, ${airport.longitude}`
                : 'Tidak tersedia'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}