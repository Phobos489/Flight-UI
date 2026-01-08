// src/components/FlightBoard.tsx
import { Flight } from '@/lib/types';
import { formatTime } from '@/lib/api';
import StatusBadge from './StatusBadge';
import Link from 'next/link';

interface FlightBoardProps {
  flights: Flight[];
  type: 'departure' | 'arrival';
}

export default function FlightBoard({ flights, type }: FlightBoardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-6 py-4">
        <h2 className="text-2xl font-bold">
          {type === 'departure' ? 'KEBERANGKATAN' : 'KEDATANGAN'}
        </h2>
        <p className="text-sm mt-1 opacity-90">
          Informasi Real-time Penerbangan
        </p>
      </div>

      {/* Board Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
              <th className="px-6 py-4">WAKTU</th>
              <th className="px-6 py-4">PENERBANGAN</th>
              <th className="px-6 py-4">{type === 'departure' ? 'TUJUAN' : 'ASAL'}</th>
              <th className="px-6 py-4">MASKAPAI</th>
              <th className="px-6 py-4">GATE</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">KETERANGAN</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {flights.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Tidak ada penerbangan saat ini
                </td>
              </tr>
            ) : (
              flights.map((flight) => {
                const airport = type === 'departure' 
                  ? flight.destination_airport 
                  : flight.origin_airport;
                
                const time = type === 'departure'
                  ? formatTime(flight.scheduled_departure)
                  : formatTime(flight.scheduled_arrival);

                return (
                  <tr
                    key={flight.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {time}
                      </div>
                      {flight.delay_minutes > 0 && (
                        <div className="text-xs text-orange-600 font-medium mt-1">
                          +{flight.delay_minutes} menit
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/flights/${flight.id}`}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
                      >
                        {flight.flight_number}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {airport?.city}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {airport?.code} - {airport?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {flight.airline?.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {flight.airline?.code}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-center">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          {flight.gate || '-'}
                        </div>
                        {flight.terminal && (
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            Terminal {flight.terminal}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={flight.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {flight.remarks || '-'}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 text-sm text-gray-600 dark:text-gray-400">
        Total: {flights.length} penerbangan
      </div>
    </div>
  );
}