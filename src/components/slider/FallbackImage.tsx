import * as React from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';

// MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export function Fallback(): React.JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}

export function FallbackImage(props: ImageProps): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  return (
    <React.Fragment>
      {isLoading ? <Fallback /> : null}
      <Image
        {...props}
        onLoad={() => {
          setIsLoading(false);
        }}
      />
    </React.Fragment>
  );
}
