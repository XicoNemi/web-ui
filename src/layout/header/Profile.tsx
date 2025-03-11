'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Project Imports
import { paths } from '@/paths';
import { useAuth } from '@hooks/useAuth';
import { getProfile } from '@/lib/services/api';
import { stringToAvatar } from '@/utils/stringToAvatar';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';

// Assets
import { IconUser } from '@tabler/icons-react';
import Loader from '@/components/shared/Loader';

export default function Profile(): React.JSX.Element {
  const router = useRouter();
  const { logout, user } = useAuth();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    enabled: Boolean(user?.id),
    queryFn: () => getProfile(String(user?.id)),
  });

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = (): void => {
    setAnchorEl2(null);
  };

  const handleRedirect = (path: string): void => {
    router.push(path);
    handleClose2();
  };

  return (
    <React.Fragment>
      {isLoading ? <Loader /> : null}
      <Box>
        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            ...(typeof anchorEl2 === 'object' && {
              color: 'primary.main',
            }),
          }}
          onClick={handleClick2}
        >
          {isLoading || !profile ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <>
              {profile.url_image?.length > 0 ? (
                <Avatar src={profile.url_image} alt={`${profile.name} - profile picture`} />
              ) : (
                <Avatar {...stringToAvatar(profile ? `${profile.name}${profile.lastname}` : 'Xico Nemi')} />
              )}
            </>
          )}
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '200px',
            },
          }}
        >
          <Box
            px={2}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
          >
            <Typography>Bienvenido</Typography>
            {isLoading || !profile ? (
              <Skeleton variant="text" width={100} />
            ) : (
              <Typography color="textSecondary">
                {user?.name} {user?.lastname}
              </Typography>
            )}
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem
            onClick={() => {
              handleRedirect(paths.profile);
            }}
          >
            <ListItemIcon>
              <IconUser width={20} />
            </ListItemIcon>
            <ListItemText>Mi Perfil</ListItemText>
          </MenuItem>
          <Box mt={1} py={1} px={2}>
            <Button
              variant="outlined"
              onClick={async () => {
                await logout();
                router.refresh();
              }}
              color="primary"
              fullWidth
            >
              Cerrar Sesión
            </Button>
          </Box>
        </Menu>
      </Box>
    </React.Fragment>
  );
}
