'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

// Project Imports
import { toast } from '@components/core/toaster';
import { paths } from '@/paths';
import { useAuth } from '@hooks/useAuth';
import { verifyToken } from '@contexts/auth/AuthContext';

import GlobalLoader from '@/components/shared/GlobalLoader';

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
      toast.error('Ya has iniciado sesión');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user]);

  if (isChecking) {
    return <GlobalLoader />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
