import React from 'react';
import Layout from '../layouts';
import PageAction from '../common/PageAction';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import RecordDetail from '../common/RecordDetail';
import SearchForm from '../common/SearchForm';
import ImageCarousel from '../common/ImageCarousel';
import InfoTable from '../common/InfoTable';

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
                  <InfoTable
                    rowsData={[
                      {
                        label: 'Title',
                        value: 'The Adventures of Fictional Book',
                      },
                      { label: 'Author', value: 'John Authorson' },
                      { label: 'Genre', value: 'Fantasy' },
                      { label: 'Published Year', value: 2022 },
                      { label: 'ISBN', value: '978-1-2345-6789-0' },
                      { label: 'Available Copies', value: 10 },
                      {
                        label: 'Description',
                        value: 'A captivating tale of imagination and wonder.',
                      },
                    ]}
                    renderRow={(row) => row.value}
                  />
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
