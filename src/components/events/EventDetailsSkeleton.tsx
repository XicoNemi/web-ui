import React from 'react';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';

// Project Imports
import Loader from '@components/shared/Loader';

export default function BusinessDetailsSkeleton(): React.JSX.Element {
  return (
    <>
      <Loader />
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
        <Skeleton variant="circular" height={120} width={120} />
        <Skeleton variant="text" width={200} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Divider />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={130} />
        <Skeleton variant="text" width={250} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={150} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={140} />
        <Skeleton variant="text" width={200} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={170} />
        <Skeleton variant="text" width={100} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={180} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={80} />
        <Skeleton variant="rectangular" width={100} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Skeleton variant="text" width={170} />
        <Divider />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={220} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={190} />
        <Skeleton variant="text" width={240} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Skeleton variant="text" width={100} />
        <Skeleton variant="text" width={90} />
      </Grid>
    </>
  );
}
