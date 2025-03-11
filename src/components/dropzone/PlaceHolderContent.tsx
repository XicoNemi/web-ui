import React from 'react';
// material-ui
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// Types
import { DropzoneType } from '@/types/dropzone';

// assets
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

const UploadCover = '/images/upload/upload.svg';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

export default function PlaceholderContent({ type }: { type?: DropzoneType }): React.JSX.Element {
  return (
    <>
      {type !== DropzoneType.Standard && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">Arrastra y Suelta o Selecciona el archivo</Typography>

            <Typography color="secondary.main">Suelta aquí o da click para buscar en tu dispositivo.</Typography>
          </Stack>
        </Stack>
      )}
      {type === DropzoneType.Standard && (
        <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
          <CameraAltOutlinedIcon style={{ fontSize: '32px' }} />
        </Stack>
      )}
    </>
  );
}
