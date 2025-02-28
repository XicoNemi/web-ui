import * as React from 'react';

// Project Imports
import DashboardCard from '@/components/shared/DashboardCard';
import CreateUserForm from '@/components/users/CreateUserForm';

export default function CreateUserView(): React.JSX.Element {
  return (
    <DashboardCard
      title="Registrar Usuario"
    >
      <CreateUserForm />
    </DashboardCard>
  );
}
