import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import React from 'react';
import Link from './Link';

export type BreadcrumbItem = {
  label: string;
  url: string;
  active?: boolean;
};
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label='Breadcrumb' className='p-4'>
      <ol className='flex items-center flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400'>
        {items.map((e, i) => (
          <React.Fragment key={i}>
            {i !== 0 && (
              <li>
                <ChevronRightIcon className='w-4 h-4' />
              </li>
            )}
            <li>
              <Link
                className={cn('no-underline', !e.active && 'text-gray-900')}
                href={e.url}
              >
                {e.label}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
