import { paths } from '@/paths';
import {
  IconBrandGoogleAnalytics,
  IconUsersGroup,
  IconBuildingStore,
  IconListCheck,
  IconUserCog,
  IconCalendarEvent,
} from '@tabler/icons-react';

import { v4 as uniqueId } from 'uuid';
import { UserRoles } from '@/types/user';

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
    roles: [UserRoles.SuperAdmin],
  },
  {
    id: uniqueId(),
    title: 'Analíticas De Mi Negocio',
    icon: IconBrandGoogleAnalytics,
    href: paths.dashboard,
    roles: [UserRoles.BusinessOwner],
  },

  {
    navlabel: true,
    subheader: 'Mi Cuenta',
  },
  {
    id: uniqueId(),
    title: 'Perfil',
    icon: IconUserCog,
    href: paths.profile,
    roles: [UserRoles.BusinessOwner, UserRoles.SuperAdmin],
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
    roles: [UserRoles.SuperAdmin],
  },
  {
    id: uniqueId(),
    title: 'Negocios',
    icon: IconBuildingStore,
    href: paths.businesses.list,
    roles: [UserRoles.SuperAdmin],
  },
  {
    id: uniqueId(),
    title: 'Mis Negocios',
    icon: IconBuildingStore,
    href: paths.businesses.list,
    roles: [UserRoles.BusinessOwner],
  },
  {
    id: uniqueId(),
    title: 'Eventos',
    icon: IconCalendarEvent,
    href: paths.events.list,
    roles: [UserRoles.SuperAdmin],
  },
  {
    navlabel: true,
    subheader: 'Otras Apps',
  },
  {
    id: uniqueId(),
    title: 'Lista de Tareas',
    icon: IconListCheck,
    href: paths.todoList,
    roles: [UserRoles.Common, UserRoles.BusinessOwner, UserRoles.SuperAdmin],
  },
];

export default Menuitems;
