import React from 'react';

// Project Imports
import CreateEventView from '@/views/events/CreateEventView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Nuevo Evento',
  description: 'Crea un nuevo evento en la plataforma como administrador.',
};

export default function CreateEventPage(): React.JSX.Element {
  return <CreateEventView />;
}
