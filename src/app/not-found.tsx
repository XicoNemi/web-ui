import React from 'react';
import Image from 'next/image';

// MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BackToHomeButton from '@/components/core/BackToHomeButton';

export const metadata = {
  title: 'XicoNemi | Página No Encontrada',
};

export default function NotFound(): React.JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
        Error 404
      </Typography>
      <Typography variant="h2">Ruta No Encontrada</Typography>
      <Typography>
        ¡Oh No! la ruta que seguías no pudo ser encontrada 😔. Intenta de nuevo o regresa al inicio.
      </Typography>

      <BackToHomeButton />
    </Box>
  );
}
