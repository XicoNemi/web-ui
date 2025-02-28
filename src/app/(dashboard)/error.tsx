'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.JSX.Element {
  useEffect(() => {
    // Manage error and send a log to the server

    // eslint-disable-next-line no-console -- Error handling
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
      }}
    >
      <Image
        priority
        alt="logo"
        width={270}
        height={170}
        src="/images/logos/dark-logo.svg"
        style={{
          marginBottom: '2rem',
        }}
      />
      <Typography variant="h1" color="primary">
        Error En el Servidor
      </Typography>
      <Typography variant="h2">Internal Server Error</Typography>
      <Typography>
        ¡Oh No! Algo salió mal y no podemos encontrar una ruta para este problema. Intenta de nuevo o vuelve más tarde.
      </Typography>
      <Button onClick={reset} variant="contained" sx={{ mt: 2 }}>
        Intentar de Nuevo
      </Button>
    </Box>
  );
}
