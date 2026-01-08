interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'SCHEDULED':
        return {
          gradient: 'from-blue-500 to-blue-600',
          shadowColor: 'shadow-blue-500/50',
          icon: '📅',
          label: 'Terjadwal'
        };
      case 'BOARDING':
        return {
          gradient: 'from-yellow-500 to-amber-600',
          shadowColor: 'shadow-yellow-500/50',
          icon: '🚶',
          label: 'Boarding'
        };
      case 'DEPARTED':
        return {
          gradient: 'from-green-500 to-emerald-600',
          shadowColor: 'shadow-green-500/50',
          icon: '🛫',
          label: 'Berangkat'
        };
      case 'DELAYED':
        return {
          gradient: 'from-orange-500 to-red-600',
          shadowColor: 'shadow-orange-500/50',
          icon: '⏱️',
          label: 'Tertunda'
        };
      case 'CANCELLED':
        return {
          gradient: 'from-red-500 to-rose-600',
          shadowColor: 'shadow-red-500/50',
          icon: '❌',
          label: 'Dibatalkan'
        };
      case 'ARRIVED':
        return {
          gradient: 'from-gray-500 to-gray-600',
          shadowColor: 'shadow-gray-500/50',
          icon: '🛬',
          label: 'Tiba'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-500',
          shadowColor: 'shadow-gray-500/50',
          icon: '❓',
          label: status
        };
    }
  };

  const config = getStatusConfig(status);
  const shouldPulse = status === 'BOARDING' || status === 'DELAYED';

  return (
    <div className="relative inline-flex">
      <span 
        className={`
          inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white 
          bg-gradient-to-r ${config.gradient} shadow-lg ${config.shadowColor}
          transition-all duration-300 hover:scale-105
        `}
      >
        <span className={`text-base ${shouldPulse ? 'animate-pulse' : ''}`}>
          {config.icon}
        </span>
        <span>{config.label}</span>
      </span>
      
      {shouldPulse && (
        <span 
          className={`
            absolute inset-0 rounded-full bg-gradient-to-r ${config.gradient} 
            animate-ping opacity-75
          `} 
        />
      )}
    </div>
  );
}