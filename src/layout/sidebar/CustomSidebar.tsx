/* eslint-disable no-unused-vars -- used for this moment */
/* eslint-disable @typescript-eslint/no-unused-vars -- for the moment */

import React from 'react';

// MUI Imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '270px',
  backgroundColor: theme.palette.background.paper,
  height: '100%',
  overflowY: 'auto',
}));

const SidebarItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SidebarItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const SidebarItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

interface CustomSidebarProps {
  children: React.ReactNode;
}

export default function CustomSidebar({ children }: CustomSidebarProps): React.JSX.Element {
  return (
    <SidebarContainer>
      <List>{children}</List>
    </SidebarContainer>
  );
}
