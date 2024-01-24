import { home } from '@/constants';
import AccordionList from '../common/AccordionList';
import Hero from '../common/Hero';
import SearchForm from '../common/SearchForm';
import Section from '../common/Section';
import Slide from '../common/Slide';
import SplitSection from '../common/SplitSection';
import Layout from '../layouts';
import { Card, CardTitle } from '../ui/card';
import ThumbnailCard from '../common/ThumbnailCard';
import Map from '../common/Map';
import Masonry from '../common/Masonry';
import HoverCard from '../common/HoverCard';
import { truncateWords } from '@/lib/utils';
const pics = [
  'https://picsum.photos/1000/800/?random=123',
  'https://picsum.photos/500/600/?random=456',
  'https://picsum.photos/900/700/?random=789',
  'https://picsum.photos/600/400/?random=321',
  'https://picsum.photos/1200/900/?random=654',
  'https://picsum.photos/800/500/?random=987',
  'https://picsum.photos/1000/700/?random=123',
  'https://picsum.photos/700/800/?random=234',
  'https://picsum.photos/450/600/?random=567',
  'https://picsum.photos/800/600/?random=890',
  'https://picsum.photos/550/450/?random=123',
  'https://picsum.photos/1000/600/?random=456',
  'https://picsum.photos/400/300/?random=789',
  'https://picsum.photos/900/800/?random=321',
  'https://picsum.photos/1200/900/?random=654',
  'https://picsum.photos/700/400/?random=987',
  'https://picsum.photos/800/700/?random=123',
  'https://picsum.photos/600/500/?random=234',
  'https://picsum.photos/800/600/?random=567',
  'https://picsum.photos/500/800/?random=890',
];

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
            <Card
              className='max-w-md mx-auto shadow-xl border-none cursor-pointer'
              key={index}
            >
              <ThumbnailCard
                title={item.title}
                url={item.url}
                thumbnail={item.thumbnail}
              />
            </Card>
          )}
        />
      </Section>
      {/* <Section
        className='bg-secondary'
        heading={'Browse by area'}
        subHeading='Area Category'
      >
        <Map />
      </Section> */}
      <Section heading={'Recent Addition'}>
        <Masonry
          items={pics}
          renderItem={(item, index) => (
            <HoverCard
              key={index}
              title={truncateWords('Test', 10)}
              thumbnail={item}
              url={''}
            />
          )}
        />
      </Section>
    </Layout>
  );
};

export default Home;
