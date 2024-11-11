import React, { type JSX } from 'react';

// MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  action?: JSX.Element;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
}

export default function DashboardCard({
  children,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
}: DashboardCardProps): JSX.Element {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      {cardheading ? (
        <CardContent>
          <Typography variant="h5">{headtitle}</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {headsubtitle}
          </Typography>
        </CardContent>
      ) : null}
      {children}
      {footer ? <Box sx={{ p: 2 }}>{footer}</Box> : null}
    </Card>
  );
}
