import React from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

export interface HoverCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
}

const HoverCard = ({
  title,
  description,
  url,
  thumbnail,
  className,
  children,
}: HoverCardProps) => {
  return (
    <Card
      className={cn('group relative block', className)}
      onClick={() => (window.location.href = url)}
    >
      <a href='#' className='group relative block bg-black'>
        <img
          alt={title}
          src={thumbnail}
          className='absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50'
        />

        <div className='relative p-4 sm:p-6 lg:p-8'>
          <p className='text-sm font-medium uppercase tracking-widest text-pink-500'>
            {title}
          </p>

          <p className='text-xl font-bold text-white sm:text-2xl'>Tony Wayne</p>

          {description && (
            <div className='mt-32 sm:mt-48 lg:mt-64'>
              <div className='translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
                <p className='text-sm text-white'>{description}</p>
              </div>
            </div>
          )}
        </div>
      </a>
    </Card>
  );
};

export default HoverCard;
