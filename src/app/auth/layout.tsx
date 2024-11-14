import React from 'react';

import { GuestGuard } from '@guards/GuestGuard';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps): React.JSX.Element {
  return <GuestGuard>{children}</GuestGuard>;
}
