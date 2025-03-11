import React from 'react';
import type { Metadata } from 'next';

// Project Imports
import ProfileDetailsView from '@/views/profile/ProfileDetailsView';

export const metadata: Metadata = {
  title: 'XicoNemi | Mi Perfil',
  description: 'Revisa tu perfil e información de usuario en la plataforma XicoNemi',
};

export default function ProfilePage(): React.JSX.Element {
  return <ProfileDetailsView />;
}
