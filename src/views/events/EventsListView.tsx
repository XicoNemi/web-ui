'use client';

import * as React from 'react';
import Link from 'next/link';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import { paths } from '@/paths';
import { getEvents } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import DashboardCard from '@components/shared/DashboardCard';
import EventDetailsCard from '@/components/events/EventDetailsCard';
import SkeletonEventCard from '@/components/events/SkeletonEventCard';

// Third Party Imports
import { v4 as randomUUID } from 'uuid';
import { useQuery } from '@tanstack/react-query';

// assets
import { IconPlus } from '@tabler/icons-react';

export default function EventsListView(): React.JSX.Element {
  const {
    data: events,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const cards = React.useMemo(
    () =>
      events && events.length > 0
        ? events.map((eventRow) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={eventRow.id}>
              <EventDetailsCard eventData={eventRow} />
            </Grid>
          ))
        : [],
    [events]
  );

  const skeletonCards = React.useMemo(
    () =>
      Array.from({ length: 8 }, () => (
        <Grid key={randomUUID()} size={{ xs: 12, md: 6, lg: 4 }}>
          <SkeletonEventCard />
        </Grid>
      )),
    []
  );

  return (
    <DashboardCard
      title={<Typography variant="h2">Eventos</Typography>}
      action={
        <Button LinkComponent={Link} href={paths.events.create} startIcon={<IconPlus />} variant="contained">
          Nuevo Evento
        </Button>
      }
    >
      <Grid container spacing={2}>
        {isLoading ? (
          <>
            <Loader />
            {skeletonCards}
          </>
        ) : (
          <>
            {!events || isError ? (
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
                <p>¡Fallo al encontrar el evento! 😔</p>
                <Button disabled={isLoading} color="primary" variant="contained" onClick={() => refetch()}>
                  Intentar de Nuevo
                </Button>
              </Grid>
            ) : (
              cards
            )}
          </>
        )}
      </Grid>
    </DashboardCard>
  );
}
