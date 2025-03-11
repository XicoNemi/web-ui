'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// Project Imports
import DashboardCard from '@/components/shared/DashboardCard';
import CreateUserForm from '@/components/users/CreateUserForm';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';
import { getUserById } from '@/lib/services/api';
import Loader from '@/components/shared/Loader';
import { CircularProgress } from '@mui/material';
import { paths } from '@/paths';

export default function UpdateUserView(): React.JSX.Element {
  const { userId } = useParams();
  const {
    data: userData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', userId ?? ''],
    queryFn: () => getUserById(userId as string),
    enabled: Boolean(userId),
  });
  return (
    <>
      {isLoading || isFetching ? <Loader /> : null}
      <DashboardCard title="Actualizar Usuario">
        {isLoading || isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {!userData || error ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                }}
              >
                <p>¡Fallo al encontrar el usuario! 😔</p>
                <Stack direction="row" spacing={2}>
                  <Button
                    disabled={isLoading || isFetching}
                    color="secondary"
                    variant="outlined"
                    LinkComponent={Link}
                    href={paths.users.list}
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
              <CreateUserForm userData={userData} />
            )}
          </>
        )}
      </DashboardCard>
    </>
  );
}
