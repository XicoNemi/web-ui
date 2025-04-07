'use client';

import React from 'react';
import Link from 'next/link';

// MUI Imports
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';

// Project Imports
import { paths } from '@/paths';
import { stringToAvatar } from '@utils/stringToAvatar';
import { getEventById, getUserById } from '@lib/services/api';

import DashboardCard from '@components/shared/DashboardCard';
import EventDetailsSkeleton from '@components/events/EventDetailsSkeleton';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

interface EventDetailsViewProps {
  eventId: string;
}

export default function EventDetailsView({ eventId }: EventDetailsViewProps): React.JSX.Element {
  const {
    data: eventData,
    isLoading: isLoadingEvent,
    isError: isErrorEvent,
    refetch: refetchEvent,
  } = useQuery({
    enabled: Boolean(eventId),
    queryKey: ['event', eventId],
    queryFn: () => getEventById(eventId ?? ''),
  });

  const {
    data: userData,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: refetchUser,
  } = useQuery({
    enabled: Boolean(eventData?.userId),
    queryKey: ['user', eventData?.userId],
    queryFn: () => getUserById(eventData?.userId ?? ''),
  });

  const isLoading = isLoadingEvent || isLoadingUser;

  const isError = isErrorEvent || isErrorUser;
  const refetch = async (): Promise<void> => {
    await refetchEvent();
    await refetchUser();
  };

  return (
    <DashboardCard
      title={<Typography variant="h2">Detalles del Evento</Typography>}
      subtitle={`ID: ${String(eventId ?? 'No Encontrado')}`}
      action={
        <Button LinkComponent={Link} href={paths.events.list} variant="contained">
          Regresar
        </Button>
      }
    >
      <Grid container spacing={2}>
        {isLoading ? (
          <EventDetailsSkeleton />
        ) : (
          <>
            {!userData || !eventData || isError ? (
              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                }}
              >
                <p>¡Fallo al encontrar el evento o los datos del usuario! 😔</p>
                <Button disabled={isLoading} color="primary" variant="contained" onClick={() => refetch()}>
                  Intentar de Nuevo
                </Button>
              </Grid>
            ) : (
              <>
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {eventData.url_image && eventData.url_image?.length > 0 ? (
                    <Avatar sx={{ height: 120, width: 120 }} src={eventData.url_image} alt={eventData.name} />
                  ) : (
                    <Avatar {...stringToAvatar(eventData.name)} sx={{ height: 120, width: 120 }} />
                  )}
                  <Typography variant="h4">{eventData.name}</Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Descripción</Typography>
                  <Typography variant="body1">{eventData.description}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Estado</Typography>
                  <Chip
                    label={eventData.status ? 'Activo' : 'Deshabilitado'}
                    color={eventData.status ? 'success' : 'error'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h4">Información del Creador</Typography>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Nombre Completo</Typography>
                  <Typography variant="body1">
                    {userData.name} {userData.lastname}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Correo Electrónico</Typography>
                  <MuiLink href={`mailto:${userData.email}`} underline="always">
                    {userData.email}
                  </MuiLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Número Telefónico</Typography>
                  <MuiLink href={`tel:${userData.tel}`} underline="always">
                    {userData.tel}
                  </MuiLink>
                </Grid>
              </>
            )}
          </>
        )}
      </Grid>
    </DashboardCard>
  );
}
