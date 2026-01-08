import { getAirlines } from '@/lib/api';
import AirlineCard from '@/components/AirlineCard';

export default async function AirlinesPage() {
  let airlines = [];
  let error = null;

  try {
    airlines = await getAirlines();
  } catch (e) {
    error = 'Gagal memuat data maskapai. Pastikan API Laravel sudah berjalan di http://localhost:8000';
    console.error(e);
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Daftar Maskapai
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Maskapai penerbangan yang tersedia
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
      ) : airlines.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-6xl">✈️</span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
            Tidak ada maskapai
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Belum ada data maskapai tersedia
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {airlines.map((airline) => (
            <AirlineCard key={airline.id} airline={airline} />
          ))}
        </div>
      )}
    </main>
  );
}