'use client';

import * as React from 'react';

// Third Party Imports
import List from '@mui/material/List';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

// Project Imports
import TodoItem from '@/components/todo-list/TodoItem';
import DashboardCard from '@/components/shared/DashboardCard';
import AddTodoDialog from '@/components/todo-list/AddTodoDialog';

// Third Party
import { v4 as uuidv4 } from 'uuid';
import { useQuery } from '@tanstack/react-query';

// Assets
import { IconPlus } from '@tabler/icons-react';
import { getTodos } from '@/lib/services/todo-api';

export default function TodoListView(): React.JSX.Element {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const {
    data: todos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const handleDialogOpen = (): void => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = (): void => {
    setIsDialogOpen(false);
  };

  const todoItems = React.useMemo(() => todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />) ?? [], [todos]);

  return (
    <>
      <DashboardCard
        title={<Typography variant="h2">Lista de Tareas</Typography>}
        action={
          <Button startIcon={<IconPlus />} variant="contained" onClick={handleDialogOpen}>
            Nueva Tarea
          </Button>
        }
      >
        <React.Fragment>
          {isLoading ? (
            <Stack display="flex" justifyContent="center" flexDirection="column" gap={2}>
              {Array.from({ length: 8 }).map(() => (
                <Skeleton key={uuidv4()} variant="rectangular" height={50} />
              ))}
            </Stack>
          ) : null}
          {!isLoading ? (
            <React.Fragment>
              {isError ? (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography align="center">¡Fallo al intentar encontrar las tareas! 😔</Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      sx={{ mx: 'auto' }}
                      disabled={isLoading}
                      color="primary"
                      variant="contained"
                      onClick={() => refetch()}
                    >
                      Intentar de Nuevo
                    </Button>
                  </Grid>
                </Grid>
              ) : null}
              {!isError ? <List>{todoItems}</List> : null}
            </React.Fragment>
          ) : null}
        </React.Fragment>
      </DashboardCard>
      <AddTodoDialog open={isDialogOpen} onClose={handleDialogClose} />
    </>
  );
}
