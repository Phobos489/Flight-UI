// src/components/StatusBadge.tsx
import { getStatusColor, getStatusText } from '@/lib/api';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(status)}`}
    >
      {getStatusText(status)}
    </span>
  );
}