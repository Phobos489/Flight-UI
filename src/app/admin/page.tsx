// src/app/admin/page.tsx
import Link from 'next/link';
import { getFlights, getAirlines, getAirports } from '@/lib/api';

export default async function AdminDashboard() {
  let stats = {
    flights: 0,
    airlines: 0,
    airports: 0,
  };

  try {
    const [flights, airlines, airports] = await Promise.all([
      getFlights(),
      getAirlines(),
      getAirports(),
    ]);
    stats = {
      flights: flights.length,
      airlines: airlines.length,
      airports: airports.length,
    };
  } catch (error) {
    console.error('Error loading stats:', error);
  }

  const adminCards = [
    {
      title: 'Kelola Maskapai',
      description: 'Tambah, edit, atau hapus data maskapai penerbangan',
      icon: '🏢',
      href: '/admin/airlines',
      color: 'from-blue-500 to-cyan-600',
      count: stats.airlines,
    },
    {
      title: 'Kelola Bandara',
      description: 'Tambah, edit, atau hapus data bandara',
      icon: '🛫',
      href: '/admin/airports',
      color: 'from-purple-500 to-pink-600',
      count: stats.airports,
    },
    {
      title: 'Kelola Penerbangan',
      description: 'Tambah, edit, atau hapus jadwal penerbangan',
      icon: '✈️',
      href: '/admin/flights',
      color: 'from-green-500 to-emerald-600',
      count: stats.flights,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <span className="text-5xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-5xl font-black text-white drop-shadow-lg">
                  Admin Dashboard
                </h1>
                <p className="text-lg text-white/90 mt-2">
                  Kelola semua data sistem penerbangan
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-lg dark:border-blue-900 dark:from-blue-900/30 dark:to-cyan-900/30 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-3xl shadow-lg">
                🏢
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
                  Total Maskapai
                </p>
                <p className="text-4xl font-black text-blue-700 dark:text-blue-400">
                  {stats.airlines}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:border-purple-900 dark:from-purple-900/30 dark:to-pink-900/30 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-3xl shadow-lg">
                🛫
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-900 dark:text-purple-200">
                  Total Bandara
                </p>
                <p className="text-4xl font-black text-purple-700 dark:text-purple-400">
                  {stats.airports}
                </p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg dark:border-green-900 dark:from-green-900/30 dark:to-emerald-900/30 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-3xl shadow-lg">
                ✈️
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-900 dark:text-green-200">
                  Total Penerbangan
                </p>
                <p className="text-4xl font-black text-green-700 dark:text-green-400">
                  {stats.flights}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid gap-6 md:grid-cols-3 animate-fade-in">
          {adminCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-zinc-800 dark:bg-zinc-900 animate-slide-in"
            >
              {/* Decorative gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl -z-0 group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <span className="text-4xl">{card.icon}</span>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-zinc-800 text-xl font-bold text-gray-700 dark:text-gray-300">
                    {card.count}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {card.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:gap-4 transition-all">
                  <span>Kelola Sekarang</span>
                  <span className="text-xl transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-800 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-2xl">
              ℹ️
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Panduan Admin
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Gunakan tombol <strong>Tambah</strong> untuk menambah data baru</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Klik tombol <strong>Edit</strong> untuk mengubah data yang sudah ada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Klik tombol <strong>Hapus</strong> untuk menghapus data (akan ada konfirmasi)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Pastikan API Laravel sudah berjalan di <code className="px-2 py-0.5 rounded bg-gray-200 dark:bg-zinc-700 font-mono text-xs">http://localhost:8000</code></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}