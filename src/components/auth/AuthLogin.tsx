import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

// Project Imports
import { useAuth } from '@hooks/useAuth';
import { toast } from '@components/core/toaster';

import GoogleIcon from '@components/auth/GoogleIcon';
import CustomTextField from '@components/forms/theme-elements/CustomTextField';

// Third Party Imports
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google';

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 2 }}>
        <Button color="primary" form="loginForm" variant="contained" size="large" fullWidth type="submit">
          Iniciar Sesión
        </Button>
        <Divider flexItem />
        <Button
          fullWidth
          size="large"
          variant="contained"
          sx={{ bgcolor: 'black' }}
          startIcon={<GoogleIcon />}
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
