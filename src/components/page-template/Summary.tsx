import React from 'react';
import Layout from '../layouts';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Breadcrumb from '../common/Breadcrumb';
import PageHeader from '../common/PageHeader';
import DropdownSelect from '../common/DropdownSelect';
import CollapseList from '../common/CollapseList';
import CheckboxWithLabel from '../common/CheckboxWithLabel';

type Props = {};

const Summary = (props: Props) => {
  return (
    <Layout>
      <div className='rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12'>
        <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
          <Breadcrumb
            items={[
              { label: 'home', url: '/' },
              {
                label: 'summary',
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

        <section>
          <div className='mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8'>
            <PageHeader
              heading={'240 results for "Test"'}
              subHeading='Displaying 1-40 of 240'
            />
            <div className='mt-8 block lg:hidden'>
              <button className='flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600'>
                <span className='text-sm font-medium'> Filters & Sorting </span>

                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='h-4 w-4 rtl:rotate-180'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.25 4.5l7.5 7.5-7.5 7.5'
                  />
                </svg>
              </button>
            </div>

            <div className='mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8'>
              <div className='hidden space-y-4 lg:block'>
                <div>
                  <DropdownSelect title={'Records per page'} options={[]} />
                </div>
                <div>
                  <DropdownSelect title={'Sort by'} options={[]} />
                </div>

                <div className='flex flex-col space-y-4'>
                  <CollapseList label='Filter' title='Date' expand={true}>
                    <div className='space-y-3  border-t p-4'>
                      <CheckboxWithLabel label='1994' checked />
                      <CheckboxWithLabel label='1995' />
                      <CheckboxWithLabel label='1996' />
                      <CheckboxWithLabel label='1997' />
                    </div>
                  </CollapseList>
                </div>
              </div>

              <div className='lg:col-span-3'>
                <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  <li>
                    <a href='#' className='group block overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt=''
                        className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]'
                      />

                      <div className='relative bg-white pt-3'>
                        <h3 className='text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4'>
                          Basic Tee
                        </h3>

                        <p className='mt-2'>
                          <span className='sr-only'> Regular Price </span>

                          <span className='tracking-wider text-gray-900'>
                            {' '}
                            £24.00 GBP{' '}
                          </span>
                        </p>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href='#' className='group block overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt=''
                        className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]'
                      />

                      <div className='relative bg-white pt-3'>
                        <h3 className='text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4'>
                          Basic Tee
                        </h3>

                        <p className='mt-2'>
                          <span className='sr-only'> Regular Price </span>

                          <span className='tracking-wider text-gray-900'>
                            {' '}
                            £24.00 GBP{' '}
                          </span>
                        </p>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href='#' className='group block overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                        alt=''
                        className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]'
                      />

                      <div className='relative bg-white pt-3'>
                        <h3 className='text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4'>
                          Basic Tee
                        </h3>

                        <p className='mt-2'>
                          <span className='sr-only'> Regular Price </span>

                          <span className='tracking-wider text-gray-900'>
                            {' '}
                            £24.00 GBP{' '}
                          </span>
                        </p>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Summary;
