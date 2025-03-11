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
import { deleteUserById } from '@/lib/services/api';

import Loader from '@components/shared/Loader';
import CustomDialog from '@components/shared/CustomDialog';

// Third Party Imports
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ConfirmDeleteModalProps {
  open: boolean;
  toggleModal: () => void;
  userId: string;
}

export default function ConfirmDeleteModal({ open, userId, toggleModal }: ConfirmDeleteModalProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isPending } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: () => deleteUserById(userId),
    onSuccess: async () => {
      toast.success('Usuario eliminado correctamente');
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      await queryClient.invalidateQueries({ queryKey: ['user', userId] });
      toggleModal();
    },
    onError: (error: Error) => {
      toast.error(error.message ? error.message : 'Ha ocurrido un error al intentar eliminar el usuario');
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
          <DialogContentText>¿Estás seguro de que deseas eliminar este usuario?</DialogContentText>
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
              deleteUser();
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
