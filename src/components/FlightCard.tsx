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
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-3 flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {flight.flight_number}
            </h3>
            <StatusBadge status={flight.status} />
          </div>
          
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium">{flight.airline?.name}</span>
            <span>•</span>
            <span>{flight.airline?.code}</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Keberangkatan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(flight.scheduled_departure)}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {flight.origin_airport?.code} - {flight.origin_airport?.city}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatDate(flight.scheduled_departure)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Kedatangan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatTime(flight.scheduled_arrival)}
              </p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {flight.destination_airport?.code} - {flight.destination_airport?.city}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {formatDate(flight.scheduled_arrival)}
              </p>
            </div>
          </div>

          {(flight.gate || flight.terminal) && (
            <div className="mt-4 flex gap-4 text-sm">
              {flight.terminal && (
                <div>
                  <span className="text-gray-500 dark:text-gray-500">Terminal: </span>
                  <span className="font-medium text-gray-900 dark:text-white">{flight.terminal}</span>
                </div>
              )}
              {flight.gate && (
                <div>
                  <span className="text-gray-500 dark:text-gray-500">Gate: </span>
                  <span className="font-medium text-gray-900 dark:text-white">{flight.gate}</span>
                </div>
              )}
            </div>
          )}

          {flight.delay_minutes > 0 && (
            <div className="mt-3 rounded-md bg-orange-50 p-2 dark:bg-orange-900/20">
              <p className="text-sm text-orange-800 dark:text-orange-200">
                ⚠️ Tertunda {flight.delay_minutes} menit
              </p>
            </div>
          )}

          {flight.remarks && (
            <div className="mt-3 rounded-md bg-gray-50 p-2 dark:bg-zinc-800">
              <p className="text-sm text-gray-700 dark:text-gray-300">{flight.remarks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}