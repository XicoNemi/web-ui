'use cient';

import React from 'react';

// MUI Imports
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

// Project Imports
import { baselightTheme } from '@/styles/theme/DefaultColors';

import ReactQueryProvider from '@components/providers/ReactQueryProvider';

interface ProviderWrapperProps {
  children: React.ReactNode;
}

export default function ProviderWrapper({ children }: ProviderWrapperProps): React.JSX.Element {
  return (
    <ThemeProvider theme={baselightTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  );
}
