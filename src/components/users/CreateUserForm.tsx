'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Project Imports
import type { CreateUser, User } from '@/types/user';

import { paths } from '@/paths';
import { toast } from '@components/core/toaster';
import { createUser, updateUserById } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import SelectInput from '@components/forms/SelectInput';
import PasswordField from '@components/forms/PasswordField';
import CustomDatePicker from '@components/forms/CustomDatePicker';

// Third Party Imports
import * as yup from 'yup';
import dayjs, { unix } from 'dayjs';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function CreateUserForm({ userData }: { userData?: User }): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isUpdate = Boolean(userData);

  const handleOnSuccess = async (successMessage: string): Promise<void> => {
    toast.success(successMessage);
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    if (isUpdate) await queryClient.invalidateQueries({ queryKey: ['user', userData!.id] });
    router.push(paths.users.list);
  };

  const { mutate: registerUser, isPending } = useMutation({
    mutationKey: ['createUser'],
    mutationFn: createUser,
    onSuccess: async () => handleOnSuccess('Usuario creado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar crear el usuario');
    },
  });

  const { mutate: updateUser, isPending: isPendingUpdate } = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ data }: { data: CreateUser }) => updateUserById({ userId: userData!.id, data }),
    onSuccess: async () => handleOnSuccess('Usuario actualizado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar actualizar el usuario');
    },
  });

  const isLoading = isPending || isPendingUpdate;

  const { values, handleSubmit, handleChange, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      name: userData?.name ?? '',
      lastname: userData?.lastname ?? '',
      email: userData?.email ?? '',
      tel: userData?.tel ?? '',
      password: '',
      gender: userData?.gender ?? '',
      type: userData?.type ?? '',
      birthday: userData?.birthday ? unix(userData.birthday) : null,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Este campo es requerido'),
      lastname: yup.string().required('Este campo es requerido'),
      email: yup.string().email('Correo electrónico inválido').required('Este campo es requerido'),
      tel: yup
        .string()
        .matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos')
        .required('Este campo es requerido'),
      password: yup.string().required('Este campo es requerido'),
      gender: yup.string().required('Este campo es requerido'),
      type: yup.string().required('Este campo es requerido'),
      birthday: yup.date().required('Este campo es requerido'),
    }),
    onSubmit: (sendValues) => {
      const formattedValues = {
        ...sendValues,
        birthday: sendValues.birthday ? dayjs(sendValues.birthday).unix() : null,
      };

      if (isUpdate) {
        updateUser({ data: formattedValues as CreateUser });
      } else {
        registerUser(formattedValues as CreateUser);
      }
    },
  });

  // Error Flags
  const hasErrorName = Boolean(touched.name && errors.name);
  const hasErrorLastName = Boolean(touched.lastname && errors.lastname);
  const hasErrorEmail = Boolean(touched.email && errors.email);
  const hasErrorTel = Boolean(touched.tel && errors.tel);
  const hasErrorPassword = Boolean(touched.password && errors.password);
  const hasErrorGender = Boolean(touched.gender && errors.gender);
  const hasErrorType = Boolean(touched.type && errors.type);
  const hasErrorBirthday = Boolean(touched.birthday && errors);

  return (
    <>
      {isLoading ? <Loader /> : null}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="name"
              name="name"
              fullWidth
              label="Nombre"
              variant="outlined"
              error={hasErrorName}
              value={values.name}
              helperText={hasErrorName ? errors.name : null}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="lastname"
              name="lastname"
              fullWidth
              label="Apellidos"
              variant="outlined"
              error={hasErrorLastName}
              value={values.lastname}
              helperText={hasErrorLastName ? errors.lastname : null}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="email"
              name="email"
              type="email"
              fullWidth
              label="Correo Electrónico"
              variant="outlined"
              value={values.email}
              error={hasErrorEmail}
              helperText={hasErrorEmail ? errors.email : ''}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="tel"
              name="tel"
              type="tel"
              fullWidth
              label="Número de Teléfono"
              variant="outlined"
              value={values.tel}
              error={hasErrorTel}
              helperText={hasErrorTel ? errors.tel : ''}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <PasswordField
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              variant="outlined"
              value={values.password}
              error={hasErrorPassword}
              helperText={hasErrorPassword ? errors.password : ''}
              onChange={handleChange}
              disabled={isLoading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SelectInput
              fullWidth
              id="gender"
              name="gender"
              type="gender"
              label="Género"
              variant="outlined"
              value={values.gender}
              labelId="select-gender"
              onChange={handleChange}
              disabled={isLoading}
              hasError={hasErrorGender}
              errorMessage={errors.gender}
              items={[
                {
                  label: 'Masculino',
                  value: 'Masculino',
                },
                {
                  label: 'Femenino',
                  value: 'Femenino',
                },
                {
                  label: 'Otro',
                  value: 'Otro',
                },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <SelectInput
              fullWidth
              id="type"
              name="type"
              type="type"
              label="Tipo de Usuario"
              variant="outlined"
              value={values.type}
              labelId="select-type"
              onChange={handleChange}
              disabled={isLoading}
              hasError={hasErrorType}
              errorMessage={errors.type}
              items={[
                {
                  label: 'Dueño de Negocio',
                  value: 'BusinessOwner',
                },
                {
                  label: 'Usuario',
                  value: 'Common',
                },
                {
                  label: 'Administrador',
                  value: 'SuperAdmin',
                },
              ]}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomDatePicker
              label="Fecha de Nacimiento"
              value={values.birthday}
              onChange={(date) => setFieldValue('birthday', date)}
              error={hasErrorBirthday}
              helperText={hasErrorBirthday ? errors.birthday : ''}
            />
          </Grid>
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              LinkComponent={Link}
              loading={isLoading}
              href={paths.users.list}
              variant="outlined"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading} variant="contained" color="primary">
              {userData ? 'Actualizar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
