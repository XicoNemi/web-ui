import { paths } from '@/paths';
import {
  IconBrandGoogleAnalytics,
  IconUsersGroup,
  IconBuildingStore,
  IconListCheck,
  IconUserCog,
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
    subheader: 'Mi Cuenta',
  },
  {
    id: uniqueId(),
    title: 'Perfil',
    icon: IconUserCog,
    href: paths.profile,
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
    id: uniqueId(),
    title: 'Negocios',
    icon: IconBuildingStore,
    href: paths.businesses.list,
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
  },
];

export default Menuitems;
