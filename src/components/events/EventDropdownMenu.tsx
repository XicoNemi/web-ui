import React, { useState } from 'react';
import Link from 'next/link';

// MUI Imports
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// Project Imports
import { paths } from '@/paths';
import ConfirmDeleteEventModal from '@components/events/ConfirmDeleteEventDialog';

// Assets
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import MoreHorizOutlined from '@mui/icons-material/MoreHorizOutlined';

export default function EventDropdownMenu({ eventId }: { eventId: string }): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = (): void => {
    setIsOpen((prev) => !prev);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton size="small" sx={{ mt: -0.75, mr: -0.75 }} onClick={handleClick} aria-label="more options">
        <MoreHorizOutlined fontSize="small" color="inherit" aria-controls="menu-friend-card" aria-haspopup="true" />
      </IconButton>
      {anchorEl ? (
        <Menu
          id="menu-event-details-card"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          variant="selectedMenu"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'flex-start', alignItems: 'center' }}
            component={Link}
            href={paths.events.details(eventId)}
          >
            <IconEye size={20} /> <Typography>Detalles</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'flex-start', alignItems: 'center' }}
            component={Link}
            href={paths.events.edit(eventId)}
          >
            <IconEdit size={20} /> <Typography>Editar</Typography>
          </MenuItem>
          <MenuItem
            sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'flex-start', alignItems: 'center' }}
            onClick={toggleModal}
          >
            <IconTrash size={20} />
            <Typography>Eliminar</Typography>
          </MenuItem>
        </Menu>
      ) : null}
      {isOpen ? <ConfirmDeleteEventModal eventId={eventId} open={isOpen} toggleModal={toggleModal} /> : null}
    </>
  );
}
