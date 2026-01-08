import { getFlights } from '@/lib/api';
import FlightCard from '@/components/FlightCard';
import { Flight } from '@/types';

export default async function Home() {
  let flights: Flight[] = [];
  let error: string | null = null;

  try {
    flights = await getFlights();
  } catch (e) {
    error = 'Gagal memuat data penerbangan. Pastikan API Laravel sudah berjalan di http://localhost:8000';
    console.error(e);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Informasi Penerbangan
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Jadwal penerbangan hari ini
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-900/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">
                Koneksi API Gagal
              </h3>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Jalankan Laravel API dengan: <code className="rounded bg-red-100 px-2 py-1 dark:bg-red-900">php artisan serve</code>
              </p>
            </div>
          </div>
        </div>
      ) : flights.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-6xl">✈️</span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Tidak ada penerbangan
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Belum ada data penerbangan tersedia
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </main>
  );
}