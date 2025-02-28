import React from 'react';

// Project Imports
import UpdateUserView from '@/views/users/UpdateUserView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Actualizar Uusario',
  description: 'Actualizar un usuario en la plataforma',
};

export default function CreateUserPage(): React.JSX.Element {
  return <UpdateUserView />;
}
