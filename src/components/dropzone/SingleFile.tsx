import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

// third-party
import { useDropzone } from 'react-dropzone';

// project import
import DropzoneWrapper from '@components/dropzone/DropzoneWrapper';
import PlaceholderContent from '@components/dropzone/PlaceHolderContent';

// Define the types for the props
interface SingleFileUploadProps {
  inputName?: string;
  error?: boolean;
  file?: {
    blob: globalThis.File;
    preview: string;
  } | null;
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => void;
  sx?: object;
}

// ==============================|| UPLOAD - SINGLE FILE ||============================== //

export default function SingleFileUpload({
  inputName = 'file',
  error,
  file,
  setFieldValue,
  sx,
}: SingleFileUploadProps): React.JSX.Element {
  const onDrop = (acceptedFiles: globalThis.File[]): void => {
    const [acceptedFile] = acceptedFiles;
    setFieldValue(inputName, {
      preview: URL.createObjectURL(acceptedFile),
      blob: acceptedFile,
    });
  };

  const onRemove = (): void => {
    setFieldValue(inputName, null);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    multiple: false,
    maxFiles: 1,
    onDrop,
  });

  const thumb = file?.blob ? (
    <Box
      sx={{
        bgcolor: 'background.paper',
        top: 8,
        left: 8,
        borderRadius: 2,
        position: 'absolute',
        width: 1,
        height: 1,
      }}
    >
      <CardMedia
        alt={file.blob.name}
        component="img"
        src={file.preview}
        sx={{ width: '100%', height: '100%', objectFit: 'contain', mx: 'auto' }}
      />
    </Box>
  ) : null;

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropzoneWrapper
        {...getRootProps()}
        sx={{
          ...(isDragActive ? { opacity: 0.72 } : {}),
          ...(isDragReject || error
            ? { color: 'error.main', borderColor: 'error.light', bgcolor: 'error.lighter' }
            : {}),
          ...(file ? { padding: '10% 0' } : {}),
        }}
      >
        <input data-testid="single-file-upload" {...getInputProps()} />
        <PlaceholderContent />
        {thumb}
      </DropzoneWrapper>

      {error ? (
        <Box mt={2}>Error al subir el archivo. Por favor, asegúrese de que el archivo sea una imagen válida.</Box>
      ) : null}

      {file ? (
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1.5 }}>
          <Button variant="contained" color="error" onClick={onRemove}>
            Quitar
          </Button>
        </Stack>
      ) : null}
    </Box>
  );
}
