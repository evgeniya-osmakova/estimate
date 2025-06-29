'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(100%);
        opacity: 0;
    }
`;

export type ToastType = 'success' | 'error';

const ToastContainer = styled.div<{ $visible: boolean; $type: ToastType }>`
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${props => props.$type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    padding: 16px 24px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: ${props => props.$visible ? slideIn : slideOut} 0.3s ease-in-out forwards;
`;

export interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
    message,
    duration = 3000,
    type = 'success',
    onClose
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const t1 = setTimeout(() => setVisible(false), duration);
        const t2 = setTimeout(onClose, duration + 300);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [duration, onClose]);

    return (
        <ToastContainer $visible={visible} $type={type}>
            {message}
        </ToastContainer>
    );
};

export default Toast;
