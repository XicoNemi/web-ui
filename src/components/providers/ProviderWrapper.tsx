'use cient';

import React from 'react';

// Project Imports
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';
import { baselightTheme } from '@/utils/theme/DefaultColors';

interface ProviderWrapperProps {
  children: React.ReactNode;
}

export default function ProviderWrapper({ children }: ProviderWrapperProps): React.JSX.Element {
  return (
    <ThemeProvider theme={baselightTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
