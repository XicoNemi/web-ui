import React from 'react';
import type { Metadata } from 'next';

// Project Imports
import Loader from '@/components/shared/Loader';

export const metadata: Metadata = {
  title: 'XicoNemi | Loading',
};

export default function Loading(): React.JSX.Element {
  return <Loader />;
}
