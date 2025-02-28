import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Project Imports
import { useAuth } from '@hooks/useAuth';

// Assets
import { IconUser } from '@tabler/icons-react';
import stringToAvatar from '@/utils/stringToAvatar';

export default function Profile(): React.JSX.Element {
  const router = useRouter();
  const { logout, user } = useAuth();

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = (): void => {
    setAnchorEl2(null);
  };

  return (
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
        <Avatar {...stringToAvatar(user?.name ?? 'Xico Nemi')} />
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
        <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          <Typography>
            Bienvenido de nuevo: {user?.name} {user?.lastname}
          </Typography>
        </Box>
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
  );
}
