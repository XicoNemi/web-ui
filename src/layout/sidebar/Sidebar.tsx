import React from 'react';

// MUI Imports
import { type Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// Project Imports
import SidebarItems from '@layout/sidebar/SidebarItems';

import { Sidebar } from 'react-mui-sidebar';
import MainLogo from '@layout/shared/logo/Logo';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

export default function MSidebar({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }: ItemType): React.JSX.Element {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const sidebarWidth = '270px';

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: 'border-box',
              ...scrollbarStyles,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Sidebar
              width="270px"
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                <MainLogo />
              </Box>

              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Sidebar
          width="270px"
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1 }}>
            <MainLogo />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar Items */}
          {/* ------------------------------------------- */}
          <SidebarItems />
        </Sidebar>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
    </Drawer>
  );
}