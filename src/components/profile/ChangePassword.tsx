import React from 'react';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import { toast } from '@components/core/toaster';
import { useAuth } from '@/hooks/useAuth';
import { updatePassword } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import PasswordField from '@components/forms/PasswordField';

// Third Party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@tanstack/react-query';

export default function ChangePasswordTab(): React.JSX.Element {
  const { user } = useAuth();

  const { mutate: changePassword, isPending } = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: (newPassword: string) => updatePassword(String(user?.id), newPassword),
    onSuccess: () => {
      toast.success('Contraseña actualizada');
    },
    onError: () => {
      toast.error('Error al actualizar la contraseña');
    },
  });

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema: yup.object().shape({
      newPassword: yup.string().required('Este campo es requerido'),
      confirmNewPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), ''], 'Las contraseñas no coinciden')
        .required('Este campo es requerido'),
    }),
    onSubmit: async ({ newPassword }, { resetForm }) => {
      changePassword(newPassword);
      resetForm();
    },
  });

  const hasErrorNewPassword = Boolean(errors.newPassword && touched.newPassword);
  const hasErrorConfirmNewPassword = Boolean(errors.confirmNewPassword && touched.confirmNewPassword);

  return (
    <React.Fragment>
      {isPending ? <Loader /> : null}
      <form id="change-password" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6">Cambiar Contraseña</Typography>
          </Grid>
          {/* <Grid size={{ xs: 12}}>
        <PasswordField
          fullWidth
          disabled={isPending}
          label="Contraseña Actual"
          variant="outlined"
        />
        </Grid> */}
          <Grid size={{ xs: 12 }}>
            <PasswordField
              fullWidth
              disabled={isPending}
              id="newPassword"
              name="newPassword"
              label="Nueva Contraseña"
              variant="outlined"
              value={values.newPassword}
              error={hasErrorNewPassword}
              helperText={hasErrorNewPassword ? errors.newPassword : ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <PasswordField
              fullWidth
              disabled={isPending}
              variant="outlined"
              id="confirmNewPassword"
              onChange={handleChange}
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              label="Confirmar Nueva Contraseña"
              error={hasErrorConfirmNewPassword}
              helperText={hasErrorConfirmNewPassword ? errors.confirmNewPassword : ''}
            />
          </Grid>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button type="submit" variant="contained" disabled={isPending}>
              Cambiar Contraseña
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
