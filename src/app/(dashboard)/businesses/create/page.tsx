import React from 'react';

// Project Imports
import CreateBusinessView from '@/views/businesses/CreateBusinessView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Nuevo Negocio',
  description: 'Crea un nuevo negocio en la plataforma como administrador.',
};

export default function CreateBusinessPage(): React.JSX.Element {
  return <CreateBusinessView />;
}
