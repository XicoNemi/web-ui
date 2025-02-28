import React, { type JSX } from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

interface DashboardCardProps {
  action?: JSX.Element;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
}

export default function DashboardCard({ title, footer, children, subtitle, action }: DashboardCardProps): JSX.Element {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      <CardHeader title={title} action={action} subheader={subtitle} />

      <Divider sx={{ mt: 1 }} />

      <CardContent>{children}</CardContent>
      {footer ? <Box sx={{ p: 2 }}>{footer}</Box> : null}
    </Card>
  );
}
