import { createContext, useContext, useCallback } from 'react';
import { toast as sonnerToast } from 'sonner';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    switch (type) {
      case 'success':
        sonnerToast.success(message);
        break;
      case 'warning':
        sonnerToast.warning(message);
        break;
      case 'error':
        sonnerToast.error(message);
        break;
      case 'info':
      default:
        sonnerToast.info(message);
        break;
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

