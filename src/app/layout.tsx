import React from 'react';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import './globals.css';

export const metadata: Metadata = {
  title: 'Estimate Editor',
  description: 'An application for creating and editing estimates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
