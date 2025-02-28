'use client';

import React from 'react';

// Project Imports
import DashboardCard from '@components/shared/DashboardCard';

export default function Icons(): React.JSX.Element {
  return (
    <DashboardCard title="Icons">
      <iframe src="https://tabler-icons.io/" title="Inline Frame Example" frameBorder={0} width="100%" height="650" />
    </DashboardCard>
  );
}
