import React, { useState, useCallback } from 'react';
import Toast, { ToastProps } from './Toast';

export interface ToastData {
  type: 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  onToastAdd?: (addToast: (toast: ToastData) => void) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ onToastAdd }) => {
  const [toasts, setToasts] = useState<(ToastProps & { timestamp: number })[]>([]);

  const addToast = useCallback((toastData: ToastData) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      ...toastData,
      timestamp: Date.now(),
      onClose: removeToast,
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  React.useEffect(() => {
    if (onToastAdd) {
      onToastAdd(addToast);
    }
  }, [onToastAdd, addToast]);

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;