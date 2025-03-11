'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

// Project Imports
import type { User } from '@/types/user';
import type { Category } from '@/types/category';
import type { CreateBusiness, Business } from '@/types/business';

import { paths } from '@/paths';
import { toast } from '@components/core/toaster';
import { categories } from '@/utils/constants';
import { createBusiness, getAllOwners, updateBusinessById } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import SelectInput from '@components/forms/SelectInput';

// Third Party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

export default function CreateBusinessForm({ businessData }: { businessData?: Business }): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isUpdate = Boolean(businessData);

  const {
    data: owners,
    isLoading: isLoadingOwners,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['owners'],
    queryFn: getAllOwners,
  });

  const handleOnSuccess = async (successMessage: string): Promise<void> => {
    toast.success(successMessage);
    await queryClient.invalidateQueries({ queryKey: ['businesses'] });
    if (isUpdate) await queryClient.invalidateQueries({ queryKey: ['business', businessData!.id] });
    router.push(paths.businesses.list);
  };

  const { mutate: registerBusiness, isPending } = useMutation({
    mutationKey: ['createBusiness'],
    mutationFn: createBusiness,
    onSuccess: async () => handleOnSuccess('Negocio creado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar crear el negocio');
    },
  });

  const { mutate: updateBusiness, isPending: isPendingUpdate } = useMutation({
    mutationKey: ['updateBusiness'],
    mutationFn: ({ data }: { data: CreateBusiness }) => updateBusinessById({ businessId: businessData!.id, data }),
    onSuccess: async () => handleOnSuccess('Negocio actualizado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar actualizar el negocio');
    },
  });

  const isLoading = isPending || isPendingUpdate || isLoadingOwners;

  const { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      name: businessData?.name ?? '',
      description: businessData?.description ?? '',
      category: businessData?.category ?? '',
      tel: businessData?.tel ?? '',
      address: businessData?.address ?? '',
      ownerId: businessData?.ownerId ?? '',
      social_networks: null,
      status: businessData?.status ?? true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Este campo es requerido'),
      description: yup.string().required('Este campo es requerido'),
      tel: yup
        .string()
        .matches(/^\d{10}$/, 'El número de teléfono debe tener 10 dígitos')
        .required('Este campo es requerido'),
      address: yup.string().required('Este campo es requerido'),
      category: yup.mixed<Category>().oneOf(Object.values(categories)).required('Este campo es requerido'),
      ownerId: yup.string().required('Este campo es requerido'),
      status: yup.boolean().required('Este campo es requerido'),
    }),
    onSubmit: (sendValues) => {
      if (isUpdate) {
        updateBusiness({ data: sendValues as CreateBusiness });
      } else {
        registerBusiness(sendValues as CreateBusiness);
      }
    },
  });

  // Error Flags
  const hasErrorTel = Boolean(touched.tel && errors.tel);
  const hasErrorName = Boolean(touched.name && errors.name);
  const hasErrorOwnerId = Boolean(touched.ownerId && errors);
  const hasErrorAddress = Boolean(touched.address && errors.address);
  const hasErrorCategory = Boolean(touched.category && errors.category);
  const hasErrorDescription = Boolean(touched.description && errors.description);

  const ownersItems = React.useMemo(
    () =>
      owners?.map(({ name, lastname, id, status }: User) => ({
        label: `${name} ${lastname}`,
        value: id,
        disabled: !status,
      })) ?? [],
    [owners]
  );

  if (isError || owners?.length === 0 || !owners) {
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
      }}
    >
      <p>¡Fallo al intentar encontrar los posibles dueños! 😔</p>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={2}>
        <Button
          LinkComponent={Link}
          loading={isLoading}
          href={paths.businesses.list}
          variant="outlined"
          color="secondary"
        >
          Regresar
        </Button>
        <Button disabled={isLoading} color="primary" variant="contained" onClick={() => refetch()}>
          Intentar de Nuevo
        </Button>
      </Stack>
    </Box>;
  }

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
            <SelectInput
              fullWidth
              id="ownerId"
              name="ownerId"
              type="ownerId"
              label="Dueño"
              variant="outlined"
              disabled={isLoading}
              value={values.ownerId}
              onChange={handleChange}
              labelId="select-ownerId"
              hasError={hasErrorOwnerId}
              errorMessage={errors.ownerId}
              items={ownersItems}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              id="description"
              name="description"
              variant="outlined"
              label="Descripción"
              disabled={isLoading}
              onChange={handleChange}
              value={values.description}
              error={hasErrorDescription}
              helperText={hasErrorDescription ? errors.description : null}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={3}
              id="address"
              name="address"
              variant="outlined"
              label="Dirección"
              disabled={isLoading}
              onChange={handleChange}
              value={values.address}
              error={hasErrorAddress}
              helperText={hasErrorAddress ? errors.address : null}
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
            <SelectInput
              fullWidth
              id="category"
              name="category"
              type="category"
              label="Categoría"
              variant="outlined"
              disabled={isLoading}
              value={values.category}
              onChange={handleChange}
              labelId="select-category"
              hasError={hasErrorCategory}
              errorMessage={errors.category}
              items={categories.map((category) => ({
                label: category,
                value: category,
              }))}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControlLabel
              control={
                <Switch value={values.status} onChange={handleChange} defaultChecked name="status" id="status" />
              }
              label="Estado del negocio"
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
              href={paths.businesses.list}
              variant="outlined"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading} variant="contained" color="primary">
              {businessData ? 'Actualizar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
