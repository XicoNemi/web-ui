import React, { useCallback } from 'react';
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

// Third Party Imports
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/navigation';
import { toast } from '@components/core/toaster';

interface LoginProps {
  title?: string;
  subtitle?: React.JSX.Element | React.JSX.Element[];
  subtext?: React.JSX.Element | React.JSX.Element[];
}

interface FormValues {
  email: string;
  password: string;
}

export default function AuthLogin({ title, subtitle, subtext }: LoginProps): React.JSX.Element {
  const router = useRouter();
  const { login } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- formik typings are incorrect
  const validationSchema = Yup.object({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- formik typings are incorrect
    email: Yup.string().email('Ingresa un correo válido').required('Ingresa tu correo'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- formik typings are incorrect
    password: Yup.string().required('Ingresa tu contraseña'),
  });

  const onSubmit = useCallback(
    async (values: FormValues): Promise<void> => {
      try {
        await login(values);
        toast.success('Sesión iniciada correctamente.');
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error('Ha ocurrido un error inesperado.');
        }
      } finally {
        router.refresh();
      }
    },
    [login, router]
  );

  const { handleSubmit, values, handleChange, errors, touched } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const hasErrorEmail = Boolean(errors.email && touched.email);
  const hasErrorPassword = Boolean(errors.password && touched.password);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box
        component="form"
        id="loginForm"
        name="login"
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px">
            Usuario
          </Typography>
          <CustomTextField
            name="email"
            helperText={errors.email}
            error={hasErrorEmail}
            onChange={handleChange}
            value={values.email}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box mt="25px">
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
            Contraseña
          </Typography>
          <CustomTextField
            name="password"
            onChange={handleChange}
            helperText={errors.password}
            error={hasErrorPassword}
            value={values.password}
            type="password"
            variant="outlined"
            fullWidth
          />
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
            ¿Olvidaste tu contraseña?
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Button color="primary" form="loginForm" variant="contained" size="large" fullWidth type="submit">
          Iniciar Sesión
        </Button>
      </Box>
      {subtitle}
    </>
  );
}
