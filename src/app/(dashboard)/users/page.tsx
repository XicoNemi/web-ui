import React from 'react';

// Project Imports
import UsersTableView from '@/views/users/UsersTableView';

// Metadata
export const metadata = {
  title: 'Xiconemi | Usuarios',
  description: 'Lista de usuarios',
}


export default function UsersListPage(): React.JSX.Element {
  return <UsersTableView />;
}
