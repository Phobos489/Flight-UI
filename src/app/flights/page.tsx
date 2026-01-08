// src/app/flights/page.tsx
import { getFlights } from '@/lib/api';
import FlightBoard from '@/components/FlightBoard';


export const metadata = {
  title: 'Semua Penerbangan - FlightInfo',
  description: 'Daftar semua penerbangan',
};

export default async function FlightsPage() {
  const flights = await getFlights();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Semua Penerbangan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Daftar lengkap semua penerbangan hari ini
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                <th className="px-6 py-4">PENERBANGAN</th>
                <th className="px-6 py-4">MASKAPAI</th>
                <th className="px-6 py-4">ASAL</th>
                <th className="px-6 py-4">TUJUAN</th>
                <th className="px-6 py-4">KEBERANGKATAN</th>
                <th className="px-6 py-4">KEDATANGAN</th>
                <th className="px-6 py-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {flights.map((flight) => (
                <tr
                  key={flight.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/flights/${flight.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      {flight.flight_number}
                    </Link>
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
                    <div className="font-medium text-gray-900 dark:text-white">
                      {flight.origin_airport?.code}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {flight.origin_airport?.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {flight.destination_airport?.code}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {flight.destination_airport?.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {new Date(flight.scheduled_departure).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {new Date(flight.scheduled_arrival).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        flight.status === 'SCHEDULED'
                          ? 'bg-blue-500'
                          : flight.status === 'BOARDING'
                          ? 'bg-yellow-500'
                          : flight.status === 'DEPARTED'
                          ? 'bg-green-500'
                          : flight.status === 'DELAYED'
                          ? 'bg-orange-500'
                          : flight.status === 'CANCELLED'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {flight.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}