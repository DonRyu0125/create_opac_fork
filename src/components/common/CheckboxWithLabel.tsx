'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export interface CheckboxWithLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  labelId?: string;
  checked?: boolean;
}
const CheckboxWithLabel = ({
  className,
  label,
  labelId,
  checked = false,
  ...props
}: CheckboxWithLabelProps) => {
  return (
    <div className={cn('flex items-center space-x-2', className)} {...props}>
      <Checkbox id={labelId || label} checked={checked} />
      <label
        htmlFor={labelId || label}
        className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxWithLabel;
