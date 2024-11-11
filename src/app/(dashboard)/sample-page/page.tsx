'use client';

import React from 'react';

// MUI Imports
import { Typography } from '@mui/material';

// Project Imports
import PageContainer from '@components/container/PageContainer';
import DashboardCard from '@components/shared/DashboardCard';

export default function SamplePage(): React.JSX.Element {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Typography>This is a sample page</Typography>
      </DashboardCard>
    </PageContainer>
  );
}
