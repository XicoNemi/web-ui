import React from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// Project Imports
import type { Event } from '@/types/event';
import EventDropdownMenu from './EventDropdownMenu';
import Avatar from '@mui/material/Avatar';
import { stringToAvatar } from '@/utils/stringToAvatar';
import { formatDate } from '@/utils/formatDate';

export default function EventDetailsCard({ eventData }: { eventData: Event }): React.JSX.Element {
  return (
    <Card
      elevation={5}
      sx={{
        height: 300,
        maxHeight: 300,
      }}
    >
      <CardHeader
        title={eventData.name}
        subheader={eventData.type}
        action={<EventDropdownMenu eventId={eventData.id} />}
        slotProps={{
          title: {
            sx: {
              fontSize: 14,
            },
          },
        }}
        avatar={
          <>
            {eventData.url_image && eventData.url_image.length > 0 ? (
              <Avatar src={eventData.url_image} alt={`${eventData.name} - event picture`} />
            ) : (
              <Avatar {...stringToAvatar(eventData.name.toUpperCase())} />
            )}
          </>
        }
      />

      <CardContent sx={{ height: '100%', maxHeight: 300, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Typography variant="body1">Descripción</Typography>
            <Typography variant="body2">{eventData.description}</Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1">Fecha de Inicio:</Typography>
            <Typography variant="body2">{formatDate(eventData.startDate)}</Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1">Fecha de Finalización:</Typography>
            <Typography variant="body2">{formatDate(eventData.endDate)}</Typography>
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography variant="body1">Estatus:</Typography>
            <Chip
              color={eventData.status ? 'success' : 'error'}
              label={eventData.status ? 'Activo' : 'Inactivo'}
              size="small"
              variant="filled"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
