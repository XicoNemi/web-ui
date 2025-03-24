'use client';
import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

// Project Import
import RatingStats from '@components/dashboard/RatingStats';
import GenderStats from '@components/dashboard/GenderStats';
import MonthlyEarnings from '@components/dashboard/MonthlyEarnings';
import RecentTransactions from '@components/dashboard/RecentTransactions';
import ProductPerformance from '@components/dashboard/ProductPerformance';

export default function DashboardView(): React.JSX.Element {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <RatingStats />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <GenderStats />
            </Grid>
            <Grid size={12}>
              <MonthlyEarnings />
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <RecentTransactions />
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ProductPerformance />
        </Grid>
      </Grid>
    </Box>
  );
}
