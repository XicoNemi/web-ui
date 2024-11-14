import { paths } from '@/paths';
import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconRoute,
  IconUsersGroup,
  IconListCheck,
  IconCalendarEvent,
  IconHome,
  IconToolsKitchen2
} from '@tabler/icons-react';

import { v4 as uniqueId } from 'uuid';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
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
    href: '/in-progress',
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
  {
    navlabel: true,
    subheader: 'Template',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/utilities/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/utilities/shadow',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: paths.auth.login,
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: paths.auth.register,
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
