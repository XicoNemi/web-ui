'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

// Project Imports
import { paths } from '@/paths';
import { verifyToken } from '@/contexts/auth/AuthContext';


import Loader from '@/components/shared/Loader';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();

  const serviceToken = localStorage.getItem('serviceToken');

  React.useEffect(() => {
    if (!serviceToken || !verifyToken(serviceToken)) {
      router.replace(paths.auth.login);
    }
  }, [serviceToken, router]);

  if (!serviceToken) {
    return <Loader />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}