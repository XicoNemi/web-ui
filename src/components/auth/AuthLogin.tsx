import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// Project Imports
import { useAuth } from '@hooks/useAuth';
import { toast } from '@components/core/toaster';

import GoogleIcon from '@components/auth/GoogleIcon';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';

// Third Party Imports
import * as Yup from 'yup';

import { type FormikHelpers, useFormik } from 'formik';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';
import { AxiosError } from 'axios';
import Loader from '../shared/Loader';

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
  const { login, googleLogin } = useAuth();

  const validationSchema = Yup.object({
    email: Yup.string().email('Ingresa un correo válido').required('Ingresa tu correo'),
    password: Yup.string().required('Ingresa tu contraseña'),
  });

  const onSubmit = useCallback(
    async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>): Promise<void> => {
      try {
        setSubmitting(true);
        await login(values);
        toast.success('Sesión iniciada correctamente.');
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- safe to assume
          toast.error((err.response?.data?.message as string) || err.message);
        } else {
          toast.error('Ha ocurrido un error inesperado.');
        }
      } finally {
        router.refresh();
        setSubmitting(false);
      }
    },
    [login, router]
  );

  const { handleSubmit, values, handleChange, errors, touched, isSubmitting } = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  const hasErrorEmail = Boolean(errors.email && touched.email);
  const hasErrorPassword = Boolean(errors.password && touched.password);

  const googleAuth = useGoogleLogin({
    onSuccess: async (response: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) => {
      try {
        if (response.access_token) {
          await googleLogin(response.access_token);
          toast.success('Sesión iniciada correctamente con Google.');
        } else {
          toast.error('Error con la autenticación de Google.');
        }
      } catch (error) {
        toast.error('Error con la autenticación de Google.');
      }
    },
    onError: () => {
      toast.error('Error con la autenticación de Google.');
    },
  });

  return (
    <>
      {isSubmitting ? <Loader /> : null}
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
            helperText={touched.email ? errors.email : null}
            error={hasErrorEmail}
            onChange={handleChange}
            value={values.email}
            variant="outlined"
            disabled={isSubmitting}
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
            helperText={touched.password ? errors.password : null}
            error={hasErrorPassword}
            value={values.password}
            type="password"
            disabled={isSubmitting}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <Typography
            href="/"
            fontWeight="500"
            component={Link}
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <Button
          color="primary"
          loading={isSubmitting}
          form="loginForm"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Iniciar Sesión
        </Button>
        <Divider flexItem />
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ bgcolor: 'black' }}
          startIcon={<GoogleIcon />}
          loading={isSubmitting}
          onClick={() => {
            googleAuth();
          }}
        >
          Iniciar sesión con Google
        </Button>
      </Box>
      {subtitle}
    </>
  );
}
