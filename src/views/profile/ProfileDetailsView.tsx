'use client';

import * as React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// Project Imports
import { useAuth } from '@hooks/useAuth';
import { getProfile } from '@lib/services/api';
import { stringToAvatar } from '@utils/stringToAvatar';

import TabPanel from '@/components/shared/TabPanel';
import DashboardCard from '@components/shared/DashboardCard';
import ProfileSkeleton from '@components/profile/ProfileSkeleton';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

// Assets
import { IconLock, IconSettings, IconUser } from '@tabler/icons-react';
import getUserRole from '@/utils/getUserRole';
import { formatDate } from '@/utils/formatDate';
import ChangePasswordTab from '@/components/profile/ChangePassword';
import ProfileDropdownMenu from '@/components/profile/ProfileDropdownMenu';

export default function ProfileDetailsView(): React.JSX.Element {
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue);
  };

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(String(user?.id)),
    enabled: Boolean(user?.id),
  });

  return (
    <DashboardCard title="Consulta tu perfil">
      <Grid container spacing={2}>
        {isLoading ? (
          <ProfileSkeleton />
        ) : (
          <React.Fragment>
            {isError || !profile ? (
              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                  gap: 1,
                }}
              >
                <Typography>¡Fallo al intentar encontrar los datos del perfil! 😔</Typography>
                <Button disabled={isLoading} color="primary" variant="contained" onClick={() => refetch()}>
                  Intentar de Nuevo
                </Button>
              </Grid>
            ) : (
              <React.Fragment>
                <Grid
                  size={{ xs: 12 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2,
                  }}
                >
                  {profile.url_image?.length > 0 ? (
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                      src={profile.url_image}
                      alt={`${profile.name} profile image`}
                    />
                  ) : (
                    <Avatar
                      {...stringToAvatar(profile.name)}
                      sx={{
                        width: 80,
                        height: 80,
                      }}
                    />
                  )}
                  <Stack direction="column">
                    <Typography variant="h4">
                      {profile.name} {profile.lastname}
                    </Typography>
                    <Typography variant="caption">
                      ID: {profile.id} - {getUserRole(profile.type)}
                    </Typography>
                  </Stack>
                  <Box
                  >
                    <ProfileDropdownMenu />
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
                    <Tabs centered value={value} onChange={handleChange} aria-label="profile-tabs">
                      <Tab iconPosition="start" icon={<IconUser />} label="Cuenta" />
                      <Tab iconPosition="start" icon={<IconLock />} label="Cambiar Contraseña" />
                      <Tab disabled iconPosition="start" icon={<IconSettings />} label="Configuración" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Nombre/s</Typography>
                        <Typography variant="body1">{profile.name}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Apellido/s</Typography>
                        <Typography variant="body1">{profile.lastname}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Correo Electrónico</Typography>
                        <Typography variant="body1">{profile.email}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Teléfono</Typography>
                        <Typography variant="body1">{profile.tel}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Fecha de Nacimiento</Typography>
                        <Typography variant="body1">{formatDate(profile.birthday)}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Género</Typography>
                        <Typography variant="body1">{profile.gender}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h6">Rol/Tipo de Usuario</Typography>
                        <Typography variant="body1">{getUserRole(profile.type)}</Typography>
                      </Grid>
                      <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Typography variant="h6">Estado</Typography>
                        <Chip
                          label={profile.status ? 'Activo' : 'Deshabilitado'}
                          color={profile.status ? 'success' : 'error'}
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <ChangePasswordTab />
                  </TabPanel>
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Grid>
    </DashboardCard>
  );
}
