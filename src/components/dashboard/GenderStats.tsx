'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// MUI Imports
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import Skeleton from '@mui/material/Skeleton';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';
import type { ApexOptions } from 'apexcharts';
import { getGenderStats } from '@/lib/services/api';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function GenderStats(): React.JSX.Element {
  const { data: genderStats, isLoading } = useQuery({
    queryKey: ['genderStats'],
    queryFn: getGenderStats,
  });

  // chart color
  const theme = useTheme();
  const primary = '#ecf2ff';
  const primarylight = theme.palette.primary.main;
  const secondary = theme.palette.secondary.light;
  const error = theme.palette.error.main;

  // chart options
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'pie',
      fontFamily: "'Karla', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, secondary, error],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      show: true,
    },
    labels: genderStats ? genderStats.map((stat) => stat.gender) : [],
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  const seriescolumnchart = genderStats ? genderStats.map((stat) => stat.percentage) : [];

  return (
    <DashboardCard title="Estadísticas de género">
      <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
        {isLoading ? (
          <Skeleton variant="circular" width="100%" height={200} />
        ) : (
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="pie" height={200} width="100%" />
        )}
      </Stack>
    </DashboardCard>
  );
}
