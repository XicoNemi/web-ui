import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Project Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Assets
// import img1 from 'public/images/backgrounds/rocket.png';

export function Upgrade(): React.JSX.Element {
  return (
    <Box display="flex" alignItems="center" gap={2} sx={{ m: 3, p: 3, bgcolor: 'primary.light', borderRadius: '8px' }}>
      <>
        <Box>
          <Typography variant="h5" sx={{ width: '80px' }} fontSize="16px" mb={1}>
            Haven&apos;t account ?
          </Typography>
          <Button
            color="primary"
            target="_blank"
            disableElevation
            component={Link}
            href="/authentication/register"
            variant="contained"
            aria-label="logout"
            size="small"
          >
            Sign Up
          </Button>
        </Box>
        <Box mt="-35px">
          <Image alt="Remy Sharp" src="/images/backgrounds/rocket.png" width={100} height={100} />
        </Box>
      </>
    </Box>
  );
}
