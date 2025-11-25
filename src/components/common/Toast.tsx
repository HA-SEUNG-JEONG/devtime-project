import { useToast } from '@/contexts/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] max-w-[500px] px-4 py-3 rounded-lg shadow-lg
            flex items-center justify-between gap-3
            animate-[slideIn_0.3s_ease-out]
            ${
              toast.type === 'info'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : toast.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : toast.type === 'warning'
                    ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
            }
          `}
        >
          <p className="text-14r sm:text-16r whitespace-pre-line">
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-current opacity-50 hover:opacity-100 transition-opacity shrink-0"
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
