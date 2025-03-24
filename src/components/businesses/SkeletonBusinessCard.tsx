import React from 'react';

// MUI Imports
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export default function SkeletonBusinessCard(): React.JSX.Element {
  return (
    <Card
      elevation={5}
      sx={{
        height: 300,
        maxHeight: 300,
      }}
    >
      <CardHeader
        title={<Skeleton variant="text" width={100} />}
        subheader={<Skeleton variant="text" width={80} />}
        avatar={<Skeleton variant="circular" width={40} height={40} />}
      />
      <CardContent sx={{ height: '100%', maxHeight: 300, overflowY: 'auto' }}>
        <Grid container spacing={2}>
          <Grid
            size={{
              xs: 12,
            }}
          >
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="text" width={250} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Skeleton variant="text" width={110} height={20} />
            <Skeleton variant="text" width={95} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Skeleton variant="text" width={70} height={20} />
            <Skeleton variant="text" width={140} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Skeleton variant="text" width={180} height={20} />
            <Skeleton variant="text" width={155} />
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Skeleton variant="text" width={150} height={20} />
            <Skeleton variant="rounded" width={250} height={20} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
