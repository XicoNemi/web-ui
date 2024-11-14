"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryRetries, queryStaleTime } from '@/utils/constants';

export default function ReactQueryProvider({ children }: {children: React.ReactNode}): React.JSX.Element {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: queryStaleTime,
        retry: queryRetries
      }
    }
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
