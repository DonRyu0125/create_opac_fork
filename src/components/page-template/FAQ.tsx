import { faq } from '@/constants';
import AccordionList from '../common/AccordionList';
import Hero from '../common/Hero';
import Section from '../common/Section';
import SplitSection from '../common/SplitSection';
import Layout from '../layouts';

const FAQ = () => {
  const { heading, subHeading, heroBanner } = faq;
  return (
    <Layout>
      <Hero
        className=''
        title={heading}
        description={subHeading}
        backgroundImage={heroBanner}
      ></Hero>
      <Section heading='FAQ'>
        <AccordionList />
      </Section>
      <Section heading='How to order'>
        <div className='flex flex-col w-full'>
          <SplitSection reverse title={'test title'}>
            <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>
          </SplitSection>
          <SplitSection title={'test title'}>
            <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>
          </SplitSection>
          <SplitSection reverse title={'test title'}>
            <div className='relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full'>
              <img
                alt='Party'
                src='https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                className='absolute inset-0 h-full w-full object-cover'
              />
            </div>
          </SplitSection>
        </div>
      </Section>
    </Layout>
  );
};

export default FAQ;
