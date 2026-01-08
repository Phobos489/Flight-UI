import { Airline } from '@/types';

interface AirlineCardProps {
  airline: Airline;
}

export default function AirlineCard({ airline }: AirlineCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative p-6 z-10">
        <div className="flex items-start gap-4">
          {/* Airline code badge */}
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-xl shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <span className="text-3xl font-black text-white drop-shadow-lg">
                {airline.code}
              </span>
            </div>
            {/* Pulse animation ring */}
            <div className="absolute inset-0 rounded-2xl bg-blue-400 animate-ping opacity-20" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {airline.name}
            </h3>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              Kode: {airline.code}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              🌍 {airline.country}
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {/* Status badge */}
              {airline.is_active ? (
                <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/30">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-bold text-white">Active</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-400 to-gray-500">
                  <div className="w-2 h-2 rounded-full bg-white" />
                  <span className="text-xs font-bold text-white">Inactive</span>
                </div>
              )}
            </div>

            {/* Logo URL if available */}
            {airline.logo_url && (
              <div className="mt-3 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  🔗 Logo URL
                </p>
                <p className="text-xs font-mono text-blue-700 dark:text-blue-300 truncate">
                  {airline.logo_url}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full" />
      </div>
    </div>
  );
}