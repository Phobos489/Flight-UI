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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <span className="text-4xl">✈️</span>
              </div>
              <div>
                <h1 className="text-4xl font-black text-white drop-shadow-lg">
                  Informasi Penerbangan
                </h1>
                <p className="text-lg text-white/90 mt-1">
                  Jadwal penerbangan hari ini - Real-time updates
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <span>📅</span>
                <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
                <span>✈️</span>
                <span>{flights.length} Penerbangan</span>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </div>

        {error ? (
          <div className="animate-fade-in rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-xl dark:border-red-800 dark:from-red-900/30 dark:to-red-800/30">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500 text-2xl shadow-lg">
                ⚠️
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-red-900 dark:text-red-100">
                  Koneksi API Gagal
                </h3>
                <p className="mt-2 text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
                <div className="mt-4 rounded-lg bg-red-900/10 dark:bg-red-100/10 p-4">
                  <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">
                    💡 Cara menjalankan API:
                  </p>
                  <code className="block rounded-lg bg-red-900/20 dark:bg-red-100/20 px-4 py-3 font-mono text-sm text-red-800 dark:text-red-200">
                    php artisan serve
                  </code>
                </div>
              </div>
            </div>
          </div>
        ) : flights.length === 0 ? (
          <div className="animate-fade-in rounded-3xl border-2 border-gray-200 bg-white p-16 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
              <span className="text-7xl">✈️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Tidak ada penerbangan
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Belum ada data penerbangan tersedia saat ini
            </p>
          </div>
        ) : (
          <div className="grid gap-6 animate-fade-in">
            {flights.map((flight, index) => (
              <div 
                key={flight.id}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
                className="animate-slide-in"
              >
                <FlightCard flight={flight} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}