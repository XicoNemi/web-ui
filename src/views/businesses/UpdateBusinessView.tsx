'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Project Imports
import { paths } from '@/paths';

import DashboardCard from '@components/shared/DashboardCard';
import CreateBusinessForm from '@components/businesses/CreateBusinessForm';
import SkeletonBusinessForm from '@components/businesses/SkeletonBusinessForm';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';
import { getBusinessById } from '@lib/services/api';

export default function UpdateBusinessView(): React.JSX.Element {
  const { businessId } = useParams();

  const {
    data: businessData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    enabled: Boolean(businessId),
    queryKey: ['business', businessId ?? ''],
    queryFn: () => getBusinessById(businessId as string),
  });

  return (
    <DashboardCard title="Actualizar Negocio">
      {isLoading || isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <SkeletonBusinessForm />
        </Box>
      ) : (
        <>
          {/* TODO: Remove manual error management  */}
          {((!businessData || businessData?.message) ?? isError) ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px',
              }}
            >
              <p>¡Fallo al intentar encontrar los datos del negocio! 😔</p>
              <Stack direction="row" spacing={2}>
                <Button
                  disabled={isLoading || isFetching}
                  color="secondary"
                  variant="outlined"
                  LinkComponent={Link}
                  href={paths.businesses.list}
                >
                  Regresar
                </Button>
                <Button
                  disabled={isLoading || isFetching}
                  color="primary"
                  variant="contained"
                  onClick={() => refetch()}
                >
                  Intentar de Nuevo
                </Button>
              </Stack>
            </Box>
          ) : (
            <CreateBusinessForm businessData={businessData} />
          )}
        </>
      )}
    </DashboardCard>
  );
}
