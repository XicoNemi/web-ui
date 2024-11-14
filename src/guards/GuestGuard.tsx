'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

// Project Imports
import { paths } from '@/paths';
import { useAuth } from '@/hooks/useAuth';
import { verifyToken } from '@/contexts/auth/AuthContext';

import Loader from '@/components/shared/Loader';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);
  const serviceToken = localStorage.getItem('serviceToken');

  const checkPermissions = async (): Promise<void> => {
    if (user && serviceToken && verifyToken(serviceToken)) {
      setIsChecking(false);
      router.replace(paths.dashboard);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user]);

  if (isChecking) {
    return <Loader />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
