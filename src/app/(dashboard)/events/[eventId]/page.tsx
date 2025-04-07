import React from 'react';

// Project Imports
import EventDetailsView from '@/views/events/EventDetailsView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Detalles del Evento',
  description: 'Detalles del evento en la plataforma',
};

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<React.JSX.Element> {
  const eventId = (await params).eventId;

  return <EventDetailsView eventId={eventId} />;
}
