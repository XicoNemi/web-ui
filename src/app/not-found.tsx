import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const metadata = {
  title: 'XicoNemi | Página No Encontrada',
};

export default function NotFound(): React.JSX.Element {
  async function handleRedirect(): Promise<void> {
    'use server';
    redirect('/');
  }

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

      <form
        action={handleRedirect}
        style={{
          marginTop: '2rem',
        }}
      >
        <Button color="primary" variant="contained" type="submit">
          Regresar al Inicio
        </Button>
      </form>
    </Box>
  );
}
