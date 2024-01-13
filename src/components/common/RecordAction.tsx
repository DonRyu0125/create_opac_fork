import { copyToClipboard } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookMarked,
  Heart,
  Link,
  Printer,
  Undo,
} from 'lucide-react';

type Props = {};

const RecordAction = (props: Props) => {
  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4'>
        <Button className=''>
          <Heart className='w-4 h-4 mr-2' /> Save
        </Button>
        <Button variant={'secondary'}>
          <Link className='w-4 h-4 mr-2' /> Copy
        </Button>
      </div>
      <div className='flex flex-row justify-between'>
        <Button variant='secondary'>
          <ArrowLeftIcon />
        </Button>

        <div className='flex flex-row space-x-1'>
          <Button variant='outline'>
            <Undo />
          </Button>
          <Button variant='outline'>
            <BookMarked />
          </Button>
          <Button variant='outline'>
            <Printer />
          </Button>
        </div>
        <Button variant='secondary'>
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default RecordAction;
