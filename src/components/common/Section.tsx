import { cn } from '@/lib/utils';
import React from 'react';

interface Props extends React.ComponentProps<'section'> {
  heading: string;
  subHeading?: string;
}

const Section = ({
  className,
  children,
  heading,
  subHeading,
  ...props
}: Props) => {
  
  return (
    <section className={cn('bg-gray-900 text-white', className)} {...props}>
      <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
        <div className='mx-auto max-w-lg text-center'>
          <h2 className='text-3xl font-bold sm:text-4xl'>{heading} </h2>
          {subHeading && <p className='mt-4 text-gray-300'>{subHeading}</p>}
        </div>
        <div className='mt-8 flex flex-row'>{children}</div>
      </div>
    </section>
  );
};

export default Section;
