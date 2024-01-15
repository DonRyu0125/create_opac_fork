import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

import React from 'react';

export interface CollapseListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  expand?: boolean;
}

const CollapseList = ({
  title,
  children,
  expand = false,
}: CollapseListProps) => {
  const [isOpen, setIsOpen] = React.useState(expand);
  return (
    <div className='w-full space-y-2'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='overflow-hidden rounded-md border border-input  [&_summary::-webkit-details-marker]:hidden'
      >
        <CollapsibleTrigger className='flex cursor-pointer items-center justify-between py-2 px-2.5 text-gray-900 transition w-full'>
          <span className='text-sm '> {title} </span>
          <span>
            {isOpen ? (
              <ChevronUp className='w-4 h-4 opacity-50' />
            ) : (
              <ChevronDown className='w-4 h-4 opacity-50' />
            )}
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapseList;
