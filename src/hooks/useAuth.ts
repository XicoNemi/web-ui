import * as React from 'react';

import type { AuthContextValue } from '@/contexts/auth/types';
import { AuthContext } from '@/contexts/auth/AuthContext';

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return ctx;
}
