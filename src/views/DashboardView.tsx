'use client';
import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// Project Imports
import Blog from '@components/dashboard/Blog';
import PageContainer from '@components/container/PageContainer';
import SalesOverview from '@components/dashboard/SalesOverview';
import YearlyBreakup from '@components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@components/dashboard/MonthlyEarnings';
import RecentTransactions from '@components/dashboard/RecentTransactions';
import ProductPerformance from '@components/dashboard/ProductPerformance';

export default function DashboardView(): React.JSX.Element {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
