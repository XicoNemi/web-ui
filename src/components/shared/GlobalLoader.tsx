import React from 'react';

// MUI Imports
import Box from '@mui/material/Box';

// Project Imports
import styles from '@styles/Loader.module.css';
import Image from 'next/image';
import Loader from '@components/shared/Loader';

// ==============================|| LOADER ||============================== //

export default function GlobalLoader(): React.ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1301,
      }}
    >
      <Loader />
      <Image
        priority
        src="/images/logos/logo-png.svg"
        alt="Logo"
        width={181}
        height={120}
        style={{ marginBottom: '2rem' }}
      />
      {/* <!-- Based on Uiverse.io by Sourcesketch -->  */}
      <div className={styles.cell}>
        <div className={styles.card}>
          <span className={styles['flower-loader']}>Cargando…</span>
        </div>
      </div>
    </Box>
  );
}
