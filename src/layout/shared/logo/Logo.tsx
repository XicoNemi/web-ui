import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// MUI Imports
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

export default function Logo(): React.JSX.Element {
  return (
    <LinkStyled href="/">
      <Image src="/images/logos/dark-logo.svg" alt="logo" height={70} width={174} priority />
    </LinkStyled>
  );
}
