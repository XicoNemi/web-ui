'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// MUI Imports
import useTheme from '@mui/material/styles/useTheme';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';

// Third Party Imports
import { useQuery } from '@tanstack/react-query';
import type { ApexOptions } from 'apexcharts';
import { getAverageRatingStats } from '@/lib/services/api';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function RatingStats(): React.JSX.Element {
  const { data: ratingStats, isLoading } = useQuery({
    queryKey: ['ratingStats'],
    queryFn: getAverageRatingStats,
  });

  // select
  const [month, setMonth] = useState('1');

  const handleChange = (event: SelectChangeEvent): void => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart options
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: "'Karla', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '42%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: ratingStats ? ratingStats.map((stat) => stat.name) : [],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Valoración promedio',
      data: ratingStats ? ratingStats.map((stat) => parseFloat(String(stat.rating))) : [],
    },
  ];

  return (
    <DashboardCard
      title="Estadísticas de Valoración por Negocio"
      action={
        <Select labelId="month-dd" id="month-dd" value={month} size="small" onChange={handleChange}>
          <MenuItem value={1}>March 2023</MenuItem>
          <MenuItem value={2}>April 2023</MenuItem>
          <MenuItem value={3}>May 2023</MenuItem>
        </Select>
      }
    >
      {isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={370} />
      ) : (
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="bar" height={370} width="100%" />
      )}
    </DashboardCard>
  );
}
