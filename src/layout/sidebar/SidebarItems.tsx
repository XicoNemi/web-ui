import React from 'react';
import { usePathname } from 'next/navigation';

// MUI Imports
import Box from '@mui/material/Box';
import List from '@mui/material/List';

// Project Imports
import NavItem from '@layout/sidebar/NavItem';
import NavGroup from '@layout/sidebar/NavGroup/NavGroup';
import Menuitems from '@layout/sidebar/MenuItems';

interface SideBarItemsProps {
  toggleMobileSidebar?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function -- This is necessary for normal sidebar
export default function SidebarItems({ toggleMobileSidebar = () => {} }: SideBarItemsProps): React.JSX.Element {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
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
