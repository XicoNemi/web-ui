import React from 'react';
import Link from 'next/link';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import { paths } from '@/paths';

import CustomTextField from '@components/forms/theme-elements/CustomTextField';

interface RegisterProps {
  title?: string;
  subtitle?: React.JSX.Element | React.JSX.Element[];
  subtext?: React.JSX.Element | React.JSX.Element[];
}

export default function AuthRegister({ title, subtitle, subtext }: RegisterProps): React.JSX.Element {
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
            Name
          </Typography>
          <CustomTextField id="name" variant="outlined" fullWidth />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
            Email Address
          </Typography>
          <CustomTextField id="email" variant="outlined" fullWidth />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            Password
          </Typography>
          <CustomTextField id="password" variant="outlined" fullWidth />
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          component={Link}
          href={paths.auth.login}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
}
