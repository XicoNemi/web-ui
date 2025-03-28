import React from 'react';
import { usePathname } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';

// Project Imports
import NavItem from '@layout/sidebar/NavItem';
import NavGroup from '@layout/sidebar/NavGroup/NavGroup';
import Menuitems from '@layout/sidebar/MenuItems';
import { useAuth } from '@/hooks/useAuth';

interface SideBarItemsProps {
  toggleMobileSidebar?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function -- This is necessary for normal sidebar
export default function SidebarItems({ toggleMobileSidebar = () => {} }: SideBarItemsProps): React.JSX.Element {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { user, isInitialized } = useAuth();
  const userRole = user?.type;

  if (!isInitialized) {
    return (
      <Box sx={{ px: 3 }}>
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
      </Box>
    );
  }

  const filteredMenuItems = Menuitems.filter((item) => {
    if (!item.roles) {
      return true;
    }
    return userRole ? item.roles.includes(userRole) : false;
  });

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {filteredMenuItems.map((item) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
          }
          return <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={toggleMobileSidebar} />;
        })}
      </List>
    </Box>
  );
}
