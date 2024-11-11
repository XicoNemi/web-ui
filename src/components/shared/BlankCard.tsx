import React from 'react';

// MUI Imports
import Card from '@mui/material/Card';

interface BlankCardProps {
  className?: string;
  children: React.JSX.Element | React.JSX.Element[];
}

export default function BlankCard({ children, className }: BlankCardProps): React.JSX.Element {
  return (
    <Card sx={{ p: 0, position: 'relative' }} className={className} elevation={9} variant={undefined}>
      {children}
    </Card>
  );
}
