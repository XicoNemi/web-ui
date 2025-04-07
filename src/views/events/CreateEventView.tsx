import * as React from 'react';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';
import CreateEventForm from '@components/events/CreateEventForm';

export default function CreateEventView(): React.JSX.Element {
  return (
    <DashboardCard title="Registrar Evento">
      <CreateEventForm />
    </DashboardCard>
  );
}
