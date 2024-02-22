import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './Theme';
import { MetadataProvider } from './MetadataProvider';

type Props = {
  children?: React.ReactNode;
};

const index = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <MetadataProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </MetadataProvider>
    </ErrorBoundary>
  );
};

export default index;
