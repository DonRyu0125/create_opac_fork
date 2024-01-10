import { cn } from '@/lib/utils';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, className }: React.ComponentProps<'div'>) => {
  return (
    <div className={cn('max-w-screen-2xl', className)}>
      <Header />
      <main className='container'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
