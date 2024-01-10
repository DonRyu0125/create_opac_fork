import React from 'react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Breadcrumb from './Breadcrumb';

type Props = {};

const PageAction = (props: Props) => {
  return (
    <div>
      <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
        <Breadcrumb
          items={[
            { label: 'Home', url: '/' },
            {
              label: 'Summary',
              url: '/summary',
              active: true,
            },
          ]}
        />

        <div>
          <Button>12</Button>
          <Button>12</Button>
          <Button>12</Button>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default PageAction;
