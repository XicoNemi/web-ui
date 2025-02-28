import React from 'react';

// Project Imports
import CreateUserView from '@/views/users/CreateUserView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Nuevo Usuario',
  description: 'Crea un nuevo usuario en la plataforma',
};

export default function CreateUserPage(): React.JSX.Element {
  return <CreateUserView />;
}
