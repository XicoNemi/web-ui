'use client';

import * as React from 'react';

// Third Party Imports
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Project Imports
import type { Todo } from '@/types/todo';
import { toast } from '@components/core/toaster';

import TodoItem from '@/components/todo-list/TodoItem';
import DashboardCard from '@/components/shared/DashboardCard';
import AddTodoDialog from '@/components/todo-list/AddTodoDialog';

// Assets
import { IconPlus } from '@tabler/icons-react';

export default function TodoListView(): React.JSX.Element {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Cargar tareas desde localStorage cuando el componente se monta
  React.useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const parsedTodos: Todo[] = JSON.parse(storedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        toast.error('Error al cargar las tareas');
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleDialogOpen = (): void => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = (): void => {
    setIsDialogOpen(false);
  };

  const addNewTask = (newTodo: Todo): void => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const deleteTask = (todoId: string): void => {
    const filteredTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(filteredTodos);
  };

  const toggleTask = (todoId: string): void => {
    const updatedTodos = todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const todoItems = todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} onDelete={deleteTask} onToggle={toggleTask} />
  ));

  return (
    <DashboardCard
      title={<Typography variant="h2">Lista de Tareas</Typography>}
      action={
        <Button startIcon={<IconPlus />} variant="contained" onClick={handleDialogOpen}>
          Nueva Tarea
        </Button>
      }
    >
      <React.Fragment>
        <List>{todoItems}</List>
        <AddTodoDialog open={isDialogOpen} onClose={handleDialogClose} onAdd={addNewTask} />
      </React.Fragment>
    </DashboardCard>
  );
}
