import * as React from 'react';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';
import CreateBusinessForm from '@components/businesses/CreateBusinessForm';

export default function CreateBusinessView(): React.JSX.Element {
  return (
    <DashboardCard
      title="Registrar Negocio"
    >
      <CreateBusinessForm />
    </DashboardCard>
  );
}
