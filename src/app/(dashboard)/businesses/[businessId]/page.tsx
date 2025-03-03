import React from 'react';

// Project Imports
import BusinessDetailsView from '@/views/businesses/BusinessDetailsView';

// Metadata
export const metadata = {
  title: 'XicoNemi | Detalles del negocio',
  description: 'Detalles del negocio en la plataforma',
};

export default async function BusinessDetailsPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}): Promise<React.JSX.Element> {
  const businessId = (await params).businessId;

  return <BusinessDetailsView businessId={businessId} />;
}
