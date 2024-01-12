import React from 'react';
import { Button } from '../ui/button';
import { Heart, Link } from 'lucide-react';

type Props = {};

const RecordActions = (props: Props) => {
  return (
    <div className='flex flex-col border rounded p-2'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-4'>
        <Button className=''>
          <Heart className='w-4 h-4 mr-2' /> Save
        </Button>
        <Button variant={'secondary'}>
          <Link className='w-4 h-4 mr-2' /> Copy
        </Button>
      </div>
      <div>
        <Button variant='ghost'></Button>
      </div>
    </div>
  );
};

export default RecordActions;
