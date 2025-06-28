'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import Toast, { ToastType } from '@/components/ui/Toast';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success' as ToastType,
    duration: 3000,
  });

  const lastToastTimeRef = useRef<number>(0);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_DELAY = 500;

  const showToast = useCallback((message: string, type: ToastType = 'success', duration = 3000) => {
    const now = Date.now();

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
      debounceTimeoutRef.current = null;
    }

    if (now - lastToastTimeRef.current < DEBOUNCE_DELAY) {
      debounceTimeoutRef.current = setTimeout(() => {
        lastToastTimeRef.current = Date.now();
        setToast({
          visible: true,
          message,
          type,
          duration,
        });
      }, DEBOUNCE_DELAY);
    } else {
      lastToastTimeRef.current = now;
      setToast({
        visible: true,
        message,
        type,
        duration,
      });
    }
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({
      ...prev,
      visible: false,
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toast.message}
        duration={toast.duration}
        visible={toast.visible}
        type={toast.type}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
