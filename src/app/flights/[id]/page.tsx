// src/app/flights/[id]/page.tsx
import { getFlight, formatTime, formatDate } from '@/lib/api';
import StatusBadge from '@/components/StatusBadge';
import Link from 'next/link';

export default async function FlightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const flight = await getFlight(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/flights"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center"
      >
        ← Kembali ke Daftar Penerbangan
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 pb-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Penerbangan {flight.flight_number}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {flight.airline?.name} ({flight.airline?.code})
              </p>
            </div>
            <StatusBadge status={flight.status} />
          </div>
        </div>

        {/* Route */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {flight.origin_airport?.code}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {flight.origin_airport?.city}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {flight.origin_airport?.name}
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">✈️</div>
                <div className="h-1 w-32 bg-blue-600 rounded"></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">
                  {flight.destination_airport?.code}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {flight.destination_airport?.city}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {flight.destination_airport?.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Keberangkatan Terjadwal
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(flight.scheduled_departure)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formatDate(flight.scheduled_departure)}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Kedatangan Terjadwal
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatTime(flight.scheduled_arrival)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formatDate(flight.scheduled_arrival)}
            </div>
          </div>

          {flight.actual_departure && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">
                Keberangkatan Aktual
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {formatTime(flight.actual_departure)}
              </div>
            </div>
          )}

          {flight.actual_arrival && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="text-sm text-green-600 dark:text-green-400 mb-1">
                Kedatangan Aktual
              </div>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                {formatTime(flight.actual_arrival)}
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Gate
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {flight.gate || '-'}
            </div>
          </div>

          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Terminal
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {flight.terminal || '-'}
            </div>
          </div>

          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Keterlambatan
            </div>
            <div className="text-xl font-bold text-orange-600">
              {flight.delay_minutes > 0 ? `${flight.delay_minutes} menit` : '-'}
            </div>
          </div>

          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Status
            </div>
            <div className="flex justify-center mt-2">
              <StatusBadge status={flight.status} />
            </div>
          </div>
        </div>

        {/* Remarks */}
        {flight.remarks && (
          <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
              Catatan:
            </div>
            <div className="text-yellow-700 dark:text-yellow-400">
              {flight.remarks}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}