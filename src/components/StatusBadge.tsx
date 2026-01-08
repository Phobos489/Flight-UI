interface StatusBadgeProps {
    status: string;
  }
  
  export default function StatusBadge({ status }: StatusBadgeProps) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'SCHEDULED':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'BOARDING':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'DEPARTED':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'DELAYED':
          return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
        case 'CANCELLED':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'ARRIVED':
          return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      }
    };
  
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
        {status}
      </span>
    );
  }