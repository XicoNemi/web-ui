import React from 'react';

// material-ui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

// project import
import getDropzoneData from '@utils/getDropzoneData';

// Third-party
import type { FileRejection } from 'react-dropzone';
import type { FileData } from '@/types/dropzone';

// ==============================|| DROPZONE - REJECTION FILES ||============================== //

export default function RejectionFiles({ fileRejections }: { fileRejections: FileRejection[] }): React.JSX.Element {
  return (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file }) => {
        const { path, size } = getDropzoneData(file as unknown as FileData);

        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {size ?? ''}
            </Typography>
          </Box>
        );
      })}
    </Paper>
  );
}
