import React from 'react';

// Project Imports
import BusinessesListView from '@/views/businesses/BusinessesListView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Negocios',
  description: 'Administración de negocios en la plataforma',
};

export default function BusinessesPage(): React.JSX.Element {
  return <BusinessesListView />;
}
