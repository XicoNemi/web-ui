import React from 'react';
import Link from 'next/link';

// mui imports
import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme, ListItemButton } from '@mui/material';

interface NavGroup {
  [x: string]: unknown;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: React.MouseEvent<HTMLButtonElement>;
}

interface ItemType {
  item: NavGroup;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  hideMenu?: unknown;
  level?: number;
  pathDirect: string;
}

export default function NavItem({ item, level, pathDirect, onClick }: ItemType): React.JSX.Element {
  const Icon = item.icon;
  const theme = useTheme();

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    '.MuiButtonBase-root': {
      whiteSpace: 'nowrap',
      marginBottom: '2px',
      padding: '8px 10px',
      borderRadius: '8px',
      backgroundColor: level && level > 1 ? 'transparent !important' : 'inherit',
      color: theme.palette.text.secondary,
      paddingLeft: '10px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
      },
      '&.Mui-selected': {
        color: 'white',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
        },
      },
    },
  }));

  return (
    <List component="div" disablePadding key={item.id}>
      <ListItemStyled>
        <ListItemButton
          component={Link}
          href={item.href ?? '#'}
          disabled={Boolean(item.disabled)}
          selected={pathDirect === item.href}
          target={item.external ? '_blank' : ''}
          onClick={onClick}
        >
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 0',
              color: 'inherit',
            }}
          >
            {Icon ? <Icon stroke={1.5} size="1.3rem" /> : null}
          </ListItemIcon>
          <ListItemText>
            <>{item.title}</>
          </ListItemText>
        </ListItemButton>
      </ListItemStyled>
    </List>
  );
}
