'use client';

import React from 'react';

// MUI Imports
import { Typography } from '@mui/material';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';

export default function SamplePage(): React.JSX.Element {
  return (
    <DashboardCard title="Sample Page">
      <Typography>This is a sample page</Typography>
    </DashboardCard>
  );
}
