import React from 'react';
import Layout from '../layouts';
import PageAction from '../common/PageAction';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import RecordDetail from '../common/RecordDetail';
import SearchForm from '../common/SearchForm';
import ImageCarousel from '../common/ImageCarousel';

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
        >
          <SearchForm
            searchURL={''}
            inputName={''}
            className='my-0 w-full mx-0 min-w-80'
          />
        </PageAction>
        <section>
          <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
            <div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
              <div className='grid md:grid-cols-5 gap-3 items-start'>
                <div className='col-span-4'>
                  <ImageCarousel />
                </div>
              </div>
              <div className='grid gap-4 md:gap-10 items-start'>
                <RecordDetail
                  heading={'A test record'}
                  subHeading='by Author Jane'
                >
                  {' '}
                  <div className='flow-root'>
                    <dl className='-my-3 divide-y divide-gray-100 text-sm'>
                      <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                        <dt className='font-medium text-gray-900'>Title</dt>
                        <dd className='text-gray-700 sm:col-span-2'>Mr</dd>
                      </div>

                      <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                        <dt className='font-medium text-gray-900'>Name</dt>
                        <dd className='text-gray-700 sm:col-span-2'>
                          John Frusciante
                        </dd>
                      </div>

                      <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                        <dt className='font-medium text-gray-900'>
                          Occupation
                        </dt>
                        <dd className='text-gray-700 sm:col-span-2'>
                          Guitarist
                        </dd>
                      </div>

                      <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                        <dt className='font-medium text-gray-900'>Salary</dt>
                        <dd className='text-gray-700 sm:col-span-2'>
                          $1,000,000+
                        </dd>
                      </div>

                      <div className='grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4'>
                        <dt className='font-medium text-gray-900'>Bio</dt>
                        <dd className='text-gray-700 sm:col-span-2'>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Et facilis debitis explicabo doloremque impedit
                          nesciunt dolorem facere, dolor quasi veritatis quia
                          fugit aperiam aspernatur neque molestiae labore
                          aliquam soluta architecto?
                        </dd>
                      </div>
                    </dl>
                  </div>
                </RecordDetail>

                <Button size='lg'>Add to Cart</Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Detail;
