import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface InfoCardProps {
  title: string | React.ReactNode;
  className?: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  thumbnail?: string;
  alt?: string;
}

const InfoCard = ({
  title,
  description,
  className,
  footer,
  children,
  thumbnail,
  alt,
}: InfoCardProps) => {
  return (
    <Card className={cn('cursor-pointer shadow-md hover:shadow-xl', className)}>
      <CardHeader className='h-32'>
        <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
        {description && (
          <CardDescription className='text-sm text-gray-500 dark:text-gray-400'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='p-4 pt-0 text-sm leading-relaxed'>
        {children}
        {thumbnail && (
          <img
            src={thumbnail}
            alt={alt || 'image thumbnail'}
            className='rounded-md object-cover'
          />
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default InfoCard;
