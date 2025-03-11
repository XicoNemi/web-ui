'use client';

import * as React from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// Project Imports
import { toast } from '@components/core/toaster';
import { deleteBusinessById } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import CustomDialog from '@components/shared/CustomDialog';

// Third Party Imports
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ConfirmDeleteModalProps {
  open: boolean;
  toggleModal: () => void;
  businessId: string;
}

export default function ConfirmDeleteBusinessModal({
  open,
  businessId,
  toggleModal,
}: ConfirmDeleteModalProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: deleteBusiness, isPending } = useMutation({
    mutationKey: ['deleteBusiness'],
    mutationFn: () => deleteBusinessById(businessId),
    onSuccess: async () => {
      toast.success('Negocio eliminado correctamente');
      await queryClient.invalidateQueries({ queryKey: ['businesses'] });
      await queryClient.invalidateQueries({ queryKey: ['business', businessId] });
      toggleModal();
    },
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar eliminar el negocio');
    },
  });

  return (
    <>
      {isPending ? <Loader /> : null}
      <CustomDialog
        open={open}
        onClose={() => {
          toggleModal();
        }}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro de que deseas eliminar este negocio?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              toggleModal();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deleteBusiness();
            }}
            color="secondary"
          >
            Eliminar
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
}
