import React from 'react';

// Project Imports
import EventsListView from '@/views/events/EventsListView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Eventos',
  description: 'Administración de eventos en la plataforma',
};

export default function EventsPage(): React.JSX.Element {
  return <EventsListView />;
}
