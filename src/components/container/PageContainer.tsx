import React from 'react';

// import { Helmet } from 'react-helmet';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface PageContainerProps {
  description?: string;
  children: React.JSX.Element | React.JSX.Element[];
  title?: string;
}

export default function PageContainer({ title, description, children }: PageContainerProps): React.JSX.Element {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Helmet>
        {children}
      </div>
    </HelmetProvider>
  );
}
