import { paths } from '@/paths';
import {
  IconRoute,
  IconBrandGoogleAnalytics,
  IconUsersGroup,
  IconListCheck,
  IconCalendarEvent,
  IconHome,
  IconToolsKitchen2,
} from '@tabler/icons-react';

import { v4 as uniqueId } from 'uuid';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Inicio',
  },

  {
    id: uniqueId(),
    title: 'Analíticas',
    icon: IconBrandGoogleAnalytics,
    href: paths.dashboard,
  },
  {
    navlabel: true,
    subheader: 'Administrar',
  },
  {
    id: uniqueId(),
    title: 'Usuarios',
    icon: IconUsersGroup,
    href: paths.users.list,
  },
  {
    navlabel: true,
    subheader: 'Negocios',
  },
  {
    id: uniqueId(),
    title: 'Rutas',
    icon: IconRoute,
    href: '/in-progress',
  },
  {
    id: uniqueId(),
    title: 'Eventos',
    icon: IconCalendarEvent,
    href: '/in-progress',
  },
  {
    id: uniqueId(),
    title: 'Comida',
    icon: IconToolsKitchen2,
    href: '/in-progress',
  },
  {
    id: uniqueId(),
    title: 'Hospedajes',
    icon: IconHome,
    href: '/in-progress',
  },
  {
    id: uniqueId(),
    title: 'Itinerarios',
    icon: IconListCheck,
    href: '/in-progress',
  },
];

export default Menuitems;
