import { Flight } from '@/types';
import StatusBadge from './StatusBadge';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white font-bold shadow-lg">
                ✈️
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {flight.flight_number}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">{flight.airline?.name}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>{flight.airline?.code}</span>
                </div>
              </div>
            </div>
            <StatusBadge status={flight.status} />
          </div>
        </div>

        {/* Flight route */}
        <div className="relative grid gap-6 md:grid-cols-2 mb-6">
          {/* Departure */}
          <div className="relative">
            <div className="absolute -left-2 top-6 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900" />
            <div className="pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Keberangkatan
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent dark:from-blue-400 dark:to-blue-500">
                {formatTime(flight.scheduled_departure)}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                {flight.origin_airport?.code}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {flight.origin_airport?.city}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                📅 {formatDate(flight.scheduled_departure)}
              </p>
            </div>
          </div>

          {/* Arrival */}
          <div className="relative">
            <div className="absolute -left-2 top-6 w-4 h-4 rounded-full bg-purple-500 ring-4 ring-purple-100 dark:ring-purple-900" />
            <div className="pl-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Kedatangan
              </p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-500">
                {formatTime(flight.scheduled_arrival)}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-1">
                {flight.destination_airport?.code}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {flight.destination_airport?.city}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                📅 {formatDate(flight.scheduled_arrival)}
              </p>
            </div>
          </div>

          {/* Connecting line */}
          <div className="hidden md:block absolute left-0 top-8 w-full h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-purple-500 opacity-20" />
        </div>

        {/* Flight details */}
        {(flight.gate || flight.terminal) && (
          <div className="flex gap-3 mb-4">
            {flight.terminal && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700">
                <span className="text-lg">🏢</span>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Terminal</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{flight.terminal}</span>
                </div>
              </div>
            )}
            {flight.gate && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700">
                <span className="text-lg">🚪</span>
                <div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">Gate</span>
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{flight.gate}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alerts */}
        {flight.delay_minutes > 0 && (
          <div className="mb-4 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-4 border-l-4 border-orange-500">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-200">
                  Penerbangan Tertunda
                </p>
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  Keterlambatan {flight.delay_minutes} menit
                </p>
              </div>
            </div>
          </div>
        )}

        {flight.remarks && (
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border-l-4 border-blue-500">
            <div className="flex items-start gap-3">
              <span className="text-xl">💬</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-900 dark:text-blue-200 mb-1">
                  Catatan
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300">{flight.remarks}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}