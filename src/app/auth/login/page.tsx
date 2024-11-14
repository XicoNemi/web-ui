import React from 'react';
import type { Metadata } from 'next';

// Project Imports
import LoginView from '@/views/auth/LoginView';

export const metadata: Metadata = {
  title: 'XicoNemi - Inicia Sesión',
  description: 'Inicia sesión en XicoNemi y comienza a administrar tu contenido',
};

export default function LoginPage(): React.JSX.Element {
  return <LoginView />;
}
