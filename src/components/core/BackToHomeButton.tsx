'use client';

import React from 'react';
import Link from 'next/link';

// MUI Imports
import Button, { type ButtonProps } from '@mui/material/Button';

// Project Imports
import { paths } from '@/paths';

export default function BackToHomeButton({ props }: { props?: ButtonProps }): React.JSX.Element {
  return (
    <Button LinkComponent={Link} href={paths.dashboard} variant="contained" color="primary" {...props}>
      Volver al Inicio
    </Button>
  );
}
