import Hero from '../common/Hero';
import SearchForm from '../common/SearchForm';
import Section from '../common/Section';
import Slide from '../common/Slide';
import Layout from '../layouts';
import { Card, CardTitle } from '../ui/card';
const MOCK_SLIDE = new Array(12).fill('category').map((e) => ({ title: e }));

const Home = () => {
  return (
    <Layout>
      <Hero title={'Search'} description={'Lorem ipsum'} backgroundImage={''}>
        <SearchForm searchURL={'/action'} inputName={'KEYWORD_CL'} />
      </Hero>
      <Section
        heading={'Kickstart your marketing'}
        subHeading='Lorep ipsum 12h16M4'
      >
        <Slide
          itemsPerSlide={{ lg: 4 }}
          items={MOCK_SLIDE}
          renderItem={(item: { title: string }, index) => (
            <Card className='h-48' key={index}>
              <CardTitle>{item.title}</CardTitle>
            </Card>
          )}
        />
      </Section>
      <Section heading={'Browse by area'} subHeading='Area Cateogry'></Section>
      <Section heading={'Recent Addition'}>{/* <Masonry /> */}</Section>
      <Section heading='Featured Collection'></Section>
    </Layout>
  );
};

export default Home;
