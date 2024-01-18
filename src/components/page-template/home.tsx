import { home } from '@/constants';
import AccordionList from '../common/AccordionList';
import Hero from '../common/Hero';
import SearchForm from '../common/SearchForm';
import Section from '../common/Section';
import Slide from '../common/Slide';
import SplitSection from '../common/SplitSection';
import Layout from '../layouts';
import { Card, CardTitle } from '../ui/card';
import CardWithThumbnail from '../common/CardWithThumbnail';
const MOCK_SLIDE = new Array(12).fill('category').map((e) => ({ title: e }));

const Home = () => {
  const {
    heading,
    subHeading,
    heroBanner,
    browseByCategoryTitle,
    categoriesItems,
  } = home;
  return (
    <Layout>
      <Hero
        className=''
        title={heading}
        description={subHeading}
        backgroundImage={heroBanner}
      >
        <SearchForm
          className='w-full mt-6 max-w-2xl'
          searchURL={'/action'}
          inputName={'KEYWORD_CL'}
        />
      </Hero>
      <Section heading={browseByCategoryTitle}>
        <Slide
          // auto
          itemsPerSlide={{ lg: 4 }}
          items={categoriesItems}
          renderItem={(item, index) => (
            <Card className='max-w-md mx-auto shadow-xl ' key={index}>
              {/* <CardTitle>{item.title}</CardTitle> */}
              <CardWithThumbnail
                title={item.title}
                url={item.url}
                thumbnail={item.thumbnail}
              />
            </Card>
          )}
        />
      </Section>
      <Section heading={'Browse by area'} subHeading='Area Cateogry'></Section>
      <Section heading={'Recent Addition'}>{/* <Masonry /> */}</Section>
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

export default Home;
