import * as React from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// Project Imports
import { useAuth } from '@/hooks/useAuth';
import { uploadUserImage } from '@/lib/services/api';
import { toast } from '@components/core/toaster';

import SingleFileUpload from '@components/dropzone/SingleFile';

// Third Party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Loader from '@components/shared/Loader';

interface UploadProfileImageDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  file: yup.mixed().required('La imagen es requerida'),
});

export default function UploadProfileImageDialog({ open, onClose }: UploadProfileImageDialogProps): React.JSX.Element {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const { mutate: uploadImage, isPending } = useMutation({
    mutationKey: ['uploadProfileImage'],
    mutationFn: (file: Blob) => uploadUserImage({ userId: String(user?.id), file }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.invalidateQueries({ queryKey: ['user', user?.id] });
      toast.success('Imagen cargada con éxito');
    },
    onError: () => {
      toast.error('Error al cargar la imagen');
    },
  });

  const formik = useFormik({
    initialValues: {
      file: null as { blob: globalThis.File; preview: string } | null,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (values.file?.blob) {
        uploadImage(values.file.blob);
      }
      resetForm();
      onClose();
    },
  });

  React.useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on mount and open
  }, [open]);

  return (
    <>
      {isPending ? <Loader /> : null}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Subir Foto De Perfil</DialogTitle>
        <DialogContent>
          <form id="upload-profile-image" onSubmit={formik.handleSubmit}>
            <SingleFileUpload
              setFieldValue={formik.setFieldValue}
              error={Boolean(formik.errors.file && formik.touched.file)}
              file={formik.values.file}
            />
          </form>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={isPending} onClick={onClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button disabled={isPending} type="submit" form="upload-profile-image" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
