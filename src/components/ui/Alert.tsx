import { X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export default function Alert({ type = 'info', message, onClose }: AlertProps) {
  const colorMap: Record<string, string> = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };

  return (
    <div
      className={`px-4 py-3 rounded-md border ${colorMap[type]} flex justify-between items-center`}
    >
      <p className="text-sm">{message}</p>
      {onClose && (
        <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100">
          <X size={18} />
        </button>
      )}
    </div>
  );
}
