'use client';

import React, { useMemo } from 'react';
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
import { getCategoryColor } from '@utils/getCategoryColor';
import { getBusinessById, getUserById } from '@lib/services/api';

import DashboardCard from '@components/shared/DashboardCard';
import BusinessDetailsSkeleton from '@components/businesses/BusinessDetailsSkeleton';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

interface BusinessDetailsViewProps {
  businessId: string;
}

export default function BusinessDetailsView({ businessId }: BusinessDetailsViewProps): React.JSX.Element {
  const {
    data: businessData,
    isLoading: isLoadingBusiness,
    isError: isErrorBusiness,
    refetch: refetchBusiness,
  } = useQuery({
    enabled: Boolean(businessId),
    queryKey: ['business', businessId],
    queryFn: () => getBusinessById(businessId ?? ''),
  });

  const {
    data: ownerData,
    isLoading: isLoadingOwner,
    isError: isErrorOwner,
    refetch: refetchOwner,
  } = useQuery({
    enabled: Boolean(businessData?.ownerId),
    queryKey: ['user', businessData?.ownerId],
    queryFn: () => getUserById(businessData?.ownerId ?? ''),
  });

  const isLoading = isLoadingBusiness || isLoadingOwner;
  const categoryColor = useMemo(
    () => getCategoryColor(businessData?.category ?? 'Desconocido'),
    [businessData?.category]
  );

  const isError = isErrorBusiness || isErrorOwner;
  const refetch = async (): Promise<void> => {
    await refetchBusiness();
    await refetchOwner();
  };

  return (
    <DashboardCard
      title={<Typography variant="h2">Detalles del Negocio</Typography>}
      subtitle={`ID: ${String(businessId ?? 'No Encontrado')}`}
      action={
        <Button LinkComponent={Link} href={paths.businesses.list} variant="contained">
          Regresar
        </Button>
      }
    >
      <Grid container spacing={2}>
        {isLoading ? (
          <BusinessDetailsSkeleton />
        ) : (
          <>
            {!ownerData || !businessData || isError ? (
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
                  {businessData && businessData.url_image?.length > 0 ? (
                    <Avatar sx={{ height: 120, width: 120 }} src={businessData.url_image} alt={businessData.name} />
                  ) : (
                    <Avatar {...stringToAvatar(businessData.name)} sx={{ height: 120, width: 120 }} />
                  )}
                  <Typography variant="h4">{businessData.name}</Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Divider />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Descripción</Typography>
                  <Typography variant="body1">{businessData.description}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Categoría</Typography>
                  <Typography variant="body1" color={categoryColor}>
                    {businessData.category}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Dirección</Typography>
                  <Typography variant="body1">{businessData.address}</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Número Telefónico</Typography>
                  <MuiLink href={`mailto:${businessData.tel}`} underline="always" color={categoryColor}>
                    {businessData.tel}
                  </MuiLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Sitio Web</Typography>
                  {businessData.web_site ? (
                    <MuiLink href={businessData.web_site} target="_blank" underline="always" color={categoryColor}>
                      {businessData.web_site}
                    </MuiLink>
                  ) : (
                    <Typography variant="body1">Sin información</Typography>
                  )}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Estado</Typography>
                  <Chip
                    label={businessData.status ? 'Activo' : 'Deshabilitado'}
                    color={businessData.status ? 'success' : 'error'}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h4" color={categoryColor}>
                    Información del Dueño
                  </Typography>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Nombre Completo</Typography>
                  <Typography variant="body1">
                    {ownerData.name} {ownerData.lastname}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Correo Electrónico</Typography>
                  <MuiLink href={`mailto:${ownerData.email}`} underline="always" color={categoryColor}>
                    {ownerData.email}
                  </MuiLink>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h5">Número Telefónico</Typography>
                  <MuiLink href={`tel:${ownerData.tel}`} underline="always" color={categoryColor}>
                    {ownerData.tel}
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
