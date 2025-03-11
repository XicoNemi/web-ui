import React from 'react';

// MUI Imports
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// Project Imports
import type { Todo } from '@/types/todo';
import { toast } from '@components/core/toaster';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTodo, deleteTodo } from '@/lib/services/todo-api';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationKey: ['updateTodo'],
    mutationFn: updateTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Tarea actualizada con éxito');
    },
    onError: () => {
      toast.error('Error al actualizar la tarea');
    },
  });

  const deleteTodoMutation = useMutation({
    mutationKey: ['deleteTodo'],
    mutationFn: deleteTodo,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Tarea eliminada con éxito');
    },
    onError: () => {
      toast.error('Error al eliminar la tarea');
    },
  });

  const handleToggle = (): void => {
    updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDelete = (): void => {
    deleteTodoMutation.mutate(todo.id);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox edge="start" checked={todo.completed} tabIndex={-1} disableRipple onChange={handleToggle} />
      <ListItemText primary={todo.title} secondary={todo.description} />
    </ListItem>
  );
}
