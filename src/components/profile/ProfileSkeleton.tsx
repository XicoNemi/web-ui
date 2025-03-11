import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

export default function ProfileSkeleton(): React.JSX.Element {
  return (
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
        <Skeleton variant="circular" width={80} height={80} />
        <Stack direction="column">
          <Skeleton variant="text" height={24} width={130} />
          <Skeleton variant="text" width={90} />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper' }}>
          <Tabs value={0} variant="scrollable" scrollButtons="auto" aria-label="skeleton-tabs">
            <Tab disabled label={<Skeleton variant="text" width={100} />} />
            <Tab disabled label={<Skeleton variant="text" width={100} />} />
            <Tab disabled label={<Skeleton variant="text" width={100} />} />
          </Tabs>
        </Box>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Skeleton variant="rectangular" sx={{ height: 300 }} />
      </Grid>
    </React.Fragment>
  );
}
