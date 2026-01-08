// src/app/page.tsx
import Link from 'next/link';
import { getDepartures, getArrivals } from '@/lib/api';
import FlightBoard from '@/components/FlightBoard';

export default async function Home() {
  // Fetch data dari API
  const departures = await getDepartures('CGK');
  const arrivals = await getArrivals('CGK');

  // Ambil 5 penerbangan terbaru untuk preview
  const recentDepartures = departures.slice(0, 5);
  const recentArrivals = arrivals.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Selamat Datang di FlightInfo
            </h1>
            <p className="text-xl opacity-90">
              Informasi Penerbangan Real-time Bandara Soekarno-Hatta (CGK)
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                href="/departures"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Lihat Keberangkatan
              </Link>
              <Link
                href="/arrivals"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Lihat Kedatangan
              </Link>
            </div>
          </div>
          <div className="text-8xl hidden lg:block">
            ✈️
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="text-3xl mb-2">🛫</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {departures.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Keberangkatan Hari Ini
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="text-3xl mb-2">🛬</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {arrivals.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Kedatangan Hari Ini
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">
            {departures.filter(f => f.status === 'DEPARTED').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sudah Berangkat
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <div className="text-3xl mb-2">⏰</div>
          <div className="text-2xl font-bold text-orange-600">
            {departures.filter(f => f.status === 'DELAYED').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Tertunda
          </div>
        </div>
      </div>

      {/* Recent Departures Preview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Keberangkatan Terbaru
          </h2>
          <Link
            href="/departures"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        <FlightBoard flights={recentDepartures} type="departure" />
      </div>

      {/* Recent Arrivals Preview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Kedatangan Terbaru
          </h2>
          <Link
            href="/arrivals"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Lihat Semua →
          </Link>
        </div>
        <FlightBoard flights={recentArrivals} type="arrival" />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/flights"
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-3">✈️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Semua Penerbangan
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Lihat daftar lengkap semua penerbangan
          </p>
        </Link>

        <Link
          href="/airlines"
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-3">🏢</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Maskapai Penerbangan
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Informasi lengkap maskapai penerbangan
          </p>
        </Link>

        <Link
          href="/airports"
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-3">🏛️</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Bandara
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Daftar bandara dan informasinya
          </p>
        </Link>
      </div>
    </div>
  );
}