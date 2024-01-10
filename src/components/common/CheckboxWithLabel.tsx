import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

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
      <Label
        htmlFor={labelId || label}
        className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </Label>
    </div>
  );
};

export default CheckboxWithLabel;
