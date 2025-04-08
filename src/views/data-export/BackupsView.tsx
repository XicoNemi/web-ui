'use client';

import * as React from 'react';

// Third Party Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import { toast } from '@components/core/toaster';
import { driveBackup, telegramBackup } from '@/lib/services/api';

import DashboardCard from '@components/shared/DashboardCard';

// Third Party
import { useMutation } from '@tanstack/react-query';
import { IconBrandGoogleDrive, IconBrandTelegram } from '@tabler/icons-react';
import Loader from '@/components/shared/Loader';

export default function BackupsView(): React.JSX.Element {
  const { mutate: pgBackup, isPending: isPendingTelegram } = useMutation({
    mutationFn: telegramBackup,
    mutationKey: ['telegramBackup'],
    onSuccess: () => {
      toast.success('Respaldo enviado a telegram correctamente');
    },
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar enviar el respaldo a Telegram');
    },
  });

  const { mutate: dvBackup, isPending: isPendingDrive } = useMutation({
    mutationFn: driveBackup,
    mutationKey: ['driveBackup'],
    onSuccess: () => {
      toast.success('Respaldo enviado a Google Drive correctamente');
    },
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar enviar el respaldo a Google Drive');
    },
  });

  const isLoading = isPendingTelegram || isPendingDrive;

  return (
    <>
      {isLoading ? <Loader /> : null}
      <DashboardCard title={<Typography variant="h2">Respaldos</Typography>}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              disabled={isLoading}
              color="primary"
              variant="contained"
              startIcon={<IconBrandTelegram />}
              onClick={() => {
                pgBackup();
              }}
            >
              Respaldo Telegram
            </Button>
            <Button
              disabled={isLoading}
              color="secondary"
              variant="contained"
              startIcon={<IconBrandGoogleDrive />}
              onClick={() => {
                dvBackup();
              }}
            >
              Respaldo Google Drive
            </Button>
          </Grid>
        </Grid>
      </DashboardCard>
    </>
  );
}
