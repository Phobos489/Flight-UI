// src/app/departures/page.tsx
import { getDepartures } from '@/lib/api';
import FlightBoard from '@/components/FlightBoard';

export const metadata = {
  title: 'Keberangkatan - FlightInfo',
  description: 'Informasi keberangkatan penerbangan real-time',
};

export default async function DeparturesPage() {
  const flights = await getDepartures('CGK');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Papan Keberangkatan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Bandara Internasional Soekarno-Hatta (CGK)
        </p>
      </div>

      {/* Current Time */}
      <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm opacity-90">Waktu Saat Ini</div>
            <div className="text-2xl font-bold">
              {new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
          </div>
          <div>
            <div className="text-sm opacity-90">Tanggal</div>
            <div className="text-lg font-semibold">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Flight Board */}
      <FlightBoard flights={flights} type="departure" />

      {/* Auto Refresh Notice */}
      <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Halaman akan otomatis refresh untuk menampilkan data terbaru</p>
      </div>
    </div>
  );
}