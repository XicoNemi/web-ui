import React from 'react';

// MUI Imports
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

// Project Imports
import Loader from '@components/shared/Loader';

export default function SkeletonBusinessForm(): React.JSX.Element {
  return (
    <>
      <Loader />
      <Stack direction="column" spacing={2} width="100%" height="100%">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
        </Stack>
        <Stack>
          <Skeleton variant="rounded" height={106} width="100%" />
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
        </Stack>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
          <Skeleton variant="rounded" height={53} sx={{ width: { xs: '100%', md: '49%' } }} />
        </Stack>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
          <Skeleton variant="rounded" height={20} width={60} />
          <Skeleton variant="text" width={70} />
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="rounded" height={37} width={90} />
          <Skeleton variant="rounded" height={37} width={90} />
        </Stack>
      </Stack>
    </>
  );
}
