import * as React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Third Party Imports
import { SwiperSlide } from 'swiper/react';

// assets
import HideImageIcon from '@mui/icons-material/HideImage';

interface NoImagesFallbackSlideProps {
  imageSize: number;
}

export default function NoImagesFallbackSlide({ imageSize }: NoImagesFallbackSlideProps): React.JSX.Element {
  return (
    <SwiperSlide>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: imageSize,
          width: { xs: '90%', md: '80%' },
          mx: 'auto',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Stack direction="column" alignItems="center" justifyContent="center">
          <HideImageIcon sx={{ fontSize: 50 }} />
          <Typography variant="h6">No hay imágenes disponibles</Typography>
        </Stack>
      </Box>
    </SwiperSlide>
  );
}
