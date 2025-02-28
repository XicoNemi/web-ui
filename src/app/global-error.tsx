'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function GlobalError({
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
    <html lang="es-MX">
      <body>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
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
            Error 500
          </Typography>
          <Typography variant="h2">Internal Server Error</Typography>
          <Typography>
            ¡Oh No! Algo salió mal y no podemos encontrar una ruta. Intenta de nuevo o vuelve más tarde.
          </Typography>
          <Button onClick={reset}>Try again</Button>
        </Box>
      </body>
    </html>
  );
}
