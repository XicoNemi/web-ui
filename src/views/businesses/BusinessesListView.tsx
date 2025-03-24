'use client';

import * as React from 'react';
import Link from 'next/link';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import { paths } from '@/paths';
import { getBusinesses } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import DashboardCard from '@components/shared/DashboardCard';
import BusinessDetailsCard from '@/components/businesses/BusinessDetailsCard';
import SkeletonBusinessCard from '@/components/businesses/SkeletonBusinessCard';

// Third Party Imports
import { v4 as randomUUID } from 'uuid';
import { useQuery } from '@tanstack/react-query';

// assets
import { IconPlus } from '@tabler/icons-react';

export default function BusinessesListView(): React.JSX.Element {
  const {
    data: businesses,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
  });

  const cards = React.useMemo(
    () =>
      businesses && businesses.length > 0
        ? businesses.map((businessRow) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={businessRow.id}>
              <BusinessDetailsCard businessData={businessRow} />
            </Grid>
          ))
        : [],
    [businesses]
  );

  const skeletonCards = React.useMemo(
    () =>
      Array.from({ length: 8 }, () => (
        <Grid key={randomUUID()} size={{ xs: 12, md: 6, lg: 4 }}>
          <SkeletonBusinessCard />
        </Grid>
      )),
    []
  );

  return (
    <DashboardCard
      title={<Typography variant="h2">Negocios</Typography>}
      action={
        <Button LinkComponent={Link} href={paths.businesses.create} startIcon={<IconPlus />} variant="contained">
          Nuevo Negocio
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
            {!businesses || isError ? (
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
                <p>¡Fallo al encontrar el negocio o los datos del dueño! 😔</p>
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
