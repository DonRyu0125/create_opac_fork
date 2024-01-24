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
      className={cn('group relative block cursor-pointer', className)}
      onClick={() => (window.location.href = url)}
    >
      <div className="relative mb-4 before:content-[''] before:rounded-md before:absolute before:inset-0 before:bg-black before:bg-opacity-20">
        <img
          className='w-full brightness-75 group-hover:opacity-90'
          alt={title}
          src={thumbnail}
        />
        <div className='test__body absolute inset-0 p-8 text-white flex flex-col'>
          <div className='relative'>
            <a
              className='test__link absolute inset-0'
              target='_blank'
              href='/'
            ></a>
          </div>
          <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
            <span className='mt-3 inline-block bg-primary px-3 py-1 text-md  font-medium  tracking-wide max-w-full break-words  text-white'>
              {title}
            </span>
            {children}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HoverCard;
