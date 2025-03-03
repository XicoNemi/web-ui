import React from 'react';
import type { Metadata } from 'next';

// Project Imports
import GlobalLoader from '@/components/shared/GlobalLoader';

export const metadata: Metadata = {
  title: 'XicoNemi | Cargando...',
};

export default function Loading(): React.JSX.Element {
  return <GlobalLoader />;
}
