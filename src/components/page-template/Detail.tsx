import React from 'react';
import Layout from '../layouts';
import PageAction from '../common/PageAction';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import RecordDetail from '../common/RecordDetail';
import SearchForm from '../common/SearchForm';
import ImageCarousel, { ImageProps } from '../common/ImageCarousel';
import InfoTable from '../common/InfoTable';
import RecordActions from '../common/RecordActions';

type Props = {};

const images = [
  {
    src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/9a192748_4e41_4f04_a2de_a3bc0114cb3f/preview_00433935_001.jpg',
  },
  {
    src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/6_16/ae91ce34_b9b4_44a4_9f0e_a3bc011460e8/preview_00433892_001.jpg',
  },
  {
    src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/2_1/5bcca073_26c7_4e0f_bb70_a3d7001a1c24/preview_01081548_001.jpg',
  },
  {
    src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_10/11_3/8dc66e9f_43e1_4170_956b_a3c1003d49ec/preview_00595099_001.jpg',
  },
  {
    src: 'https://media.britishmuseum.org/media/Repository/Documents/2014_11/9_19/c4b282ba_d905_4cff_adcb_a3de0144bc78/preview_01466623_001.jpg',
  },
];
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
            className='my-0 w-full mx-0 min-w-80 md:max-w-md'
          />
        </PageAction>
        <section>
          <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
            <div className='grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6'>
              <ImageCarousel
                items={images}
                renderItems={(image) => (
                  <img
                    src={image.src}
                    className='h-36 cursor-pointer object-cover border-4 hover:border-primary'
                  />
                )}
              />
              <div className='grid gap-4 md:gap-10 items-start'>
                <RecordDetail
                  heading={'A test record'}
                  subHeading='by Author Jane'
                >
                  <div className='flex flex-col space-y-4'>
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
                          value:
                            'A captivating tale of imagination and wonder.',
                        },
                      ]}
                      renderRow={(row) => row.value}
                    />

                    <RecordActions />
                  </div>
                </RecordDetail>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Detail;
