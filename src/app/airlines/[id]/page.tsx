// src/app/airlines/[id]/page.tsx
import { getAirline } from '@/lib/api';


export default async function AirlineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const airline = await getAirline(id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/airlines"
        className="text-blue-600 hover:text-blue-800 mb-6 inline-flex items-center"
      >
        ← Kembali ke Daftar Maskapai
      </Link>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-5xl">
            ✈️
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {airline.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">
              Kode: {airline.code}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Negara
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {airline.country}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Status
            </div>
            <div className="text-lg font-semibold">
              {airline.is_active ? (
                <span className="text-green-600">Aktif Beroperasi</span>
              ) : (
                <span className="text-red-600">Tidak Aktif</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}