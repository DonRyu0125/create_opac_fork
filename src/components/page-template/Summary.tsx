import React from 'react';
import Layout from '../layouts';
import { Button } from '../ui/button';

type Props = {};

const Summary = (props: Props) => {
  return (
    <Layout>
      <div className='hidden h-full flex-col md:flex'>
        <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
          <h2>Something</h2>

          <div>
            <Button>12</Button>
            <Button>12</Button>
            <Button>12</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Summary;
