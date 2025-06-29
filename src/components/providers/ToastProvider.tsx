'use client';

import React, { createContext, useContext, useState, useCallback, useRef, PropsWithChildren } from 'react'
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

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
        duration: number;
    } | null>(null);

    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const DEBOUNCE_DELAY = 500;

    const showToast = useCallback((message: string, type: ToastType = 'success', duration = 2000) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            setToast({ message, type, duration });
            debounceTimeoutRef.current = null;
        }, DEBOUNCE_DELAY);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast && (
                <Toast
                    message={toast.message}
                    duration={toast.duration}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />)}
        </ToastContext.Provider>
    );
};
