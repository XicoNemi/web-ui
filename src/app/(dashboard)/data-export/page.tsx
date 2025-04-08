import React from 'react';

import type { Metadata } from 'next';

// Project Imports
import BackupsView from '@/views/data-export/BackupsView';

// Metadata
export const metadata: Metadata = {
  title: 'XicoNemi | Respaldos',
};

export default function BackupsPage(): React.JSX.Element {
  return <BackupsView />;
}
