import React from 'react';
import Layout from '../layouts';
import PageAction from '../common/PageAction';

type Props = {};

const Detail = (props: Props) => {
  return (
    <Layout>
      <div className='rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12'>
        <PageAction
          breadcrumbs={[
            { label: 'Home', url: '/' },
            {
              label: 'Summary',
              url: '/summary',
            },
            {
              label: 'Detail',
              url: '/detail',
              active: true,
            },
          ]}
        />
      </div>
    </Layout>
  );
};

export default Detail;
