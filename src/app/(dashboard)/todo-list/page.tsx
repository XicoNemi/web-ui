import React from 'react';

import type { Metadata } from 'next';

// Project Imports
import TodoListView from '@/views/todo-list/TodoListView';

// Metadata
export const metadata: Metadata = {
  title: 'XicoNemi | Apps | Lista de Tareas',
};

export default function TodoListPage(): React.JSX.Element {
  return <TodoListView />;
}
