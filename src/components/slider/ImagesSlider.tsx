'use client';

import * as React from 'react';

// MUI Imports
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

// Project Imports
import { FallbackImage } from '@components/slider/FallbackImage';
import NoImagesFallbackSlide from '@components/slider/NoImagesFallbackSlide';

// Third Party Imports
import { Swiper, SwiperSlide } from 'swiper/react';

import { v4 as uuid } from 'uuid';

// assets
import { Navigation, EffectCoverflow } from 'swiper/modules';

interface ImagesSliderProps {
  data: string[] | undefined;
}

export default function ImagesSlider({ data }: ImagesSliderProps): React.ReactElement {
  const { breakpoints } = useTheme();
  const downMD = useMediaQuery(breakpoints.down('md'));
  const downSM = useMediaQuery(breakpoints.down('sm'));

  const imageSize = React.useMemo<number>(() => {
    if (downSM) return 200;
    if (downMD) return 300;
    return 400;
  }, [downMD, downSM]);

  const imagesResult = React.useMemo(
    () =>
      data?.map((image: string, index: number) => (
        <SwiperSlide key={uuid()}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: { xs: 200, md: 300 },
            }}
          >
            <FallbackImage src={image} alt={`Image ${index.toString()}`} fill style={{ objectFit: 'fill' }} />
          </Box>
        </SwiperSlide>
      )) ?? [],
    [data]
  );

  return (
    <Grid size={{ xs: 12 }}>
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView={downSM ? 1.4 : 1.9}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 0,
          modifier: 0.6,
          scale: 0.55,
          slideShadows: true,
        }}
        navigation
        modules={[EffectCoverflow, Navigation]}
      >
        {imagesResult.length > 0 ? imagesResult : <NoImagesFallbackSlide imageSize={imageSize} />}
      </Swiper>
    </Grid>
  );
}
