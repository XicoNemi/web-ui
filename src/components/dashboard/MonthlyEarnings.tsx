import React from 'react';
import dynamic from 'next/dynamic';

// MUI Imports
import useTheme from '@mui/material/styles/useTheme';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';

// Third Party Imports
import type { ApexOptions } from 'apexcharts';

// Assets
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';

interface SeriesColumnChart {
  name: string;
  color: string;
  data: number[];
}

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MonthlyEarnings(): React.JSX.Element {
  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'area',
      fontFamily: "'Karla', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart: SeriesColumnChart[] = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Monthly Earnings"
      action={
        <Fab color="secondary" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={<Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height={60} width="100%" />}
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="10px">
          $6,820
        </Typography>
        <Stack direction="row" spacing={1} m={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 27, height: 27 }}>
            <IconArrowDownRight width={20} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +9%
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            last year
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
}
