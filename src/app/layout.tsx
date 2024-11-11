import React from 'react';
import type { Metadata } from 'next';

// Project Imports
import ProviderWrapper from '@/components/providers/ProviderWrapper';

// Metadata
export const metadata: Metadata = {
  title: 'XicoNemi | Dashboard',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
