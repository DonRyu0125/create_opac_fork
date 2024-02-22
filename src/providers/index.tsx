import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './Theme';

type Props = {
  children?: React.ReactNode;
};

const index = ({ children }: Props) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>{children}</ThemeProvider>
    </ErrorBoundary>
  );
};

export default index;
