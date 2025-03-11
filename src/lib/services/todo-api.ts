import type { Todo } from '@/types/todo';
import axios from 'axios';

const axiosServices = axios.create({
  baseURL: 'https://magicloops.dev/api/loop/670ea288-c74e-4259-9281-a351fd897bce/run',
});

export const getTodos = (): Promise<Todo[]> =>
  axiosServices.post('/', {
    operation: 'read',
  });

export const createTodo = (newTodo: Todo): Promise<void> =>
  axiosServices.post('/', {
    operation: 'create',
    data: newTodo,
  });

export const updateTodo = (newTodo: Todo): Promise<void> =>
  axiosServices.post('/', {
    operation: 'update',
    data: newTodo,
  });

export const deleteTodo = (todoId: string): Promise<void> =>
  axiosServices.post('/', {
    operation: 'delete',
    data: {
      id: todoId,
    },
  });
