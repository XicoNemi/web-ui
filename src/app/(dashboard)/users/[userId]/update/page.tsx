import React from 'react';

// Project Imports
import UpdateUserView from '@/views/users/UpdateUserView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Actualizar Usuario',
  description: 'Actualizar un usuario en la plataforma',
};

export default function UpdateUserPage(): React.JSX.Element {
  return <UpdateUserView />;
}
