import React, { PropsWithChildren } from 'react'
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import './globals.css';

export const metadata: Metadata = {
    title: 'Estimate Editor',
    description: 'An application for creating and editing estimates',
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <ToastProvider>
                        <StyledComponentsRegistry>
                            {children}
                        </StyledComponentsRegistry>
                    </ToastProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
