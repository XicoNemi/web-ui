import React from 'react';

// mui imports
import ListSubheader, { type ListSubheaderProps } from '@mui/material/ListSubheader';
import type { Theme } from '@mui/material';
import styled from '@mui/material/styles/styled';

interface NavGroup {
  navlabel?: boolean;
  subheader?: string;
}

interface ItemType {
  item: NavGroup;
}

const ListSubheaderStyle = styled((props: ListSubheaderProps) => <ListSubheader disableSticky {...props} />)(
  ({ theme }: { theme: Theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: '26px',
    padding: '3px 12px',
  })
);

export default function NavGroup({ item }: ItemType): React.JSX.Element {
  return <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>;
}
