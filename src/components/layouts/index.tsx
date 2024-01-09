import { cn } from '@/lib/utils';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, className }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('container', className)}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
