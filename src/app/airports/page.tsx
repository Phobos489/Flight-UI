import { getAirports } from '@/lib/api';
import AirportCard from '@/components/AirportCard';
import { Airport } from '@/types';

export default async function AirportsPage() {
  let airports: Airport[] = [];
  let error: string | null = null;

  try {
    airports = await getAirports();
  } catch (e) {
    error = 'Gagal memuat data bandara. Pastikan API Laravel sudah berjalan di http://localhost:8000';
    console.error(e);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daftar Bandara
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Bandara yang melayani penerbangan
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
            </div>
          </div>
        </div>
      ) : airports.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-6xl">🛫</span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Tidak ada bandara
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Belum ada data bandara tersedia
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {airports.map((airport) => (
            <AirportCard key={airport.id} airport={airport} />
          ))}
        </div>
      )}
    </main>
  );
}