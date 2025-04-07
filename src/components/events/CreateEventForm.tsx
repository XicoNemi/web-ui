'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// MUI Imports
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Project Imports
import type { CreateEvent, Event } from '@/types/event';
import type { Business } from '@/types/business';

import { paths } from '@/paths';
import { toast } from '@components/core/toaster';
import { getBusinesses, createEvent, updateEventById } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import SelectInput from '@components/forms/SelectInput';
import CustomDatePicker from '@components/forms/CustomDatePicker';

// Third Party Imports
import * as yup from 'yup';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { eventTypes } from '@/utils/constants';

export default function CreateEventForm({ eventData }: { eventData?: Event }): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const isUpdate = Boolean(eventData);
  const businessIdFromPath = searchParams.get('businessId');

  const {
    data: businesses,
    isLoading: isLoadingBusinesses,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['businesses'],
    queryFn: getBusinesses,
    enabled: !businessIdFromPath,
  });

  const handleOnSuccess = async (successMessage: string): Promise<void> => {
    toast.success(successMessage);
    await queryClient.invalidateQueries({ queryKey: ['events'] });
    if (isUpdate) await queryClient.invalidateQueries({ queryKey: ['event', eventData!.id] });
    router.push(paths.events.list);
  };

  const { mutate: registerEvent, isPending } = useMutation({
    mutationKey: ['createEvent'],
    mutationFn: createEvent,
    onSuccess: async () => handleOnSuccess('Evento creado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar crear el evento');
    },
  });

  const { mutate: updateEvent, isPending: isPendingUpdate } = useMutation({
    mutationKey: ['updateEvent'],
    mutationFn: ({ data }: { data: CreateEvent }) => updateEventById({ eventId: eventData!.id, data }),
    onSuccess: async () => handleOnSuccess('Evento actualizado correctamente'),
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar actualizar el evento');
    },
  });

  const isLoading = isPending || isPendingUpdate || isLoadingBusinesses;

  const { values, handleSubmit, handleChange, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      name: eventData?.name ?? '',
      description: eventData?.description ?? '',
      startDate: eventData?.startDate ? dayjs(eventData.startDate) : null,
      endDate: eventData?.endDate ? dayjs(eventData.endDate) : null,
      type: eventData?.type ?? '',
      businessId: businessIdFromPath ?? '',
      status: eventData?.status ?? true,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Este campo es requerido'),
      description: yup.string().required('Este campo es requerido'),
      startDate: yup.date().required('Este campo es requerido'),
      endDate: yup
        .date()
        .min(yup.ref('startDate'), 'La fecha de finalización debe ser posterior a la fecha de inicio')
        .required('Este campo es requerido'),
      businessId: yup.string().required('Este campo es requerido'),
      type: yup.string().required('Este campo es requerido'),
    }),
    onSubmit: (sendValues) => {
      const formattedValues = {
        ...sendValues,
        startDate: sendValues.startDate ? dayjs(sendValues.startDate).unix() : null,
        endDate: sendValues.endDate ? dayjs(sendValues.endDate).unix() : null,
        userId: user?.id, // Agregar userId del contexto
      };

      if (isUpdate) {
        updateEvent({ data: formattedValues as CreateEvent });
      } else {
        registerEvent(formattedValues as CreateEvent);
      }
    },
  });

  const businessItems = React.useMemo(
    () =>
      businesses?.map((business: Business) => ({
        label: business.name,
        value: business.id,
      })) ?? [],
    [businesses]
  );

  const eventTypeItems = React.useMemo(
    () =>
      eventTypes.map((type) => ({
        label: type,
        value: type,
      })),
    []
  );

  const hasErrorName = Boolean(touched.name && errors.name);
  const hasErrorType = Boolean(touched.type && errors.type);
  const hasErrorEndDate = Boolean(touched.endDate && errors.endDate);
  const hasErrorStartDate = Boolean(touched.startDate && errors.startDate);
  const hasErrorBusinessId = Boolean(touched.businessId && errors.businessId);
  const hasErrorDescription = Boolean(touched.description && errors.description);

  return (
    <>
      {isLoading ? <Loader /> : null}
      {isError ? (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2">Error al buscar los negocios disponibles </Typography>
            <Button variant="contained" type="button" onClick={() => refetch()}>
              Intentar de Nuevo
            </Button>
          </Grid>
        </Grid>
      ) : null}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              id="name"
              name="name"
              fullWidth
              label="Nombre del Evento"
              variant="outlined"
              value={values.name}
              error={hasErrorName}
              disabled={isLoading}
              onChange={handleChange}
              helperText={hasErrorName ? errors.name : null}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {businessIdFromPath ? (
              <TextField
                disabled
                fullWidth
                id="businessId"
                label="Negocio"
                name="businessId"
                variant="outlined"
                value={businessIdFromPath}
              />
            ) : (
              <SelectInput
                fullWidth
                id="businessId"
                label="Negocio"
                name="businessId"
                variant="outlined"
                disabled={isLoading}
                items={businessItems}
                onChange={handleChange}
                value={values.businessId}
                labelId="select-businessId"
                hasError={hasErrorBusinessId}
                errorMessage={errors.businessId}
              />
            )}
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <SelectInput
              fullWidth
              id="type"
              label="Tipo de Evento"
              name="type"
              variant="outlined"
              disabled={isLoading}
              items={eventTypeItems}
              onChange={handleChange}
              value={values.type}
              labelId="select-type"
              hasError={hasErrorType}
              errorMessage={errors.type}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CustomDatePicker
              label="Fecha de Inicio"
              value={values.startDate}
              onChange={(date) => setFieldValue('startDate', date)}
              error={hasErrorStartDate}
              helperText={hasErrorStartDate ? errors.startDate : null}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CustomDatePicker
              label="Fecha de Finalización"
              value={values.endDate}
              onChange={(date) => setFieldValue('endDate', date)}
              error={hasErrorEndDate}
              helperText={hasErrorEndDate ? errors.endDate : null}
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
              href={paths.events.list}
              variant="outlined"
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isLoading} variant="contained" color="primary">
              {eventData ? 'Actualizar' : 'Crear'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
