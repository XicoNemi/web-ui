'use client';

import React from 'react';

// MUI Imports
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

// Project Imports
import { baselightTheme } from '@/styles/theme/DefaultColors';
import { Toaster } from '@components/core/toaster';

import { AuthProvider } from '@/contexts/auth/AuthContext';
import ReactQueryProvider from '@components/providers/ReactQueryProvider';

// Third Party Imports
import { GoogleOAuthProvider } from '@react-oauth/google';

interface ProviderWrapperProps {
  children: React.ReactNode;
}

const clientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT ?? 'google-client-id';

export default function ProviderWrapper({ children }: ProviderWrapperProps): React.JSX.Element {
  return (
    <ReactQueryProvider>
      <Toaster position="bottom-right" richColors />
      <ThemeProvider theme={baselightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <GoogleOAuthProvider clientId={clientId}>
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
