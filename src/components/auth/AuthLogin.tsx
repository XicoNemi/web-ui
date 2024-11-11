import React from 'react';
import Link from 'next/link';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

// Project Imports
import CustomTextField from '@components/forms/theme-elements/CustomTextField';

interface LoginProps {
  title?: string;
  subtitle?: React.JSX.Element | React.JSX.Element[];
  subtext?: React.JSX.Element | React.JSX.Element[];
}

export default function AuthLogin({ title, subtitle, subtext }: LoginProps): React.JSX.Element {
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="username" mb="5px">
            Username
          </Typography>
          <CustomTextField variant="outlined" fullWidth />
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
            Password
          </Typography>
          <CustomTextField type="password" variant="outlined" fullWidth />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remeber this Device" />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
        <Button color="primary" variant="contained" size="large" fullWidth component={Link} href="/" type="submit">
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
}
