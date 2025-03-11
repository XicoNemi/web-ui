import * as React from 'react';

// MUI Imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// Project Imports
import type { Todo } from '@/types/todo';
import { toast } from '@components/core/toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo } from '@/lib/services/todo-api';

// Third Party Imports
import * as yup from 'yup';
import { useFormik } from 'formik';

interface AddTodoDialogProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = yup.object({
  title: yup.string().required('El título es requerido'),
  description: yup.string().required('La descripción es requerida'),
});

export default function AddTodoDialog({ open, onClose }: AddTodoDialogProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationKey: ['addTodo'],
    mutationFn: createTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Tarea agregada con éxito');
    },
    onError: () => {
      toast.error('Error al agregar la tarea');
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        completed: false,
      };
      addTodoMutation.mutate(newTodo);
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nueva Tarea</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            fullWidth
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title ? Boolean(formik.errors.title) : false}
            helperText={formik.touched.title ? formik.errors.title : null}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description ? Boolean(formik.errors.description) : false}
            helperText={formik.touched.description ? formik.errors.description : null}
          />
        </DialogContent>
        <DialogActions sx={{ dislay: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
