import React from 'react';

// Project Imports
import BusinessesTableView from '@/views/businesses/BusinessesTableView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Negocios',
  description: 'Administración de negocios en la plataforma',
};

export default function BusinessesPage(): React.JSX.Element {
  return <BusinessesTableView />;
}
