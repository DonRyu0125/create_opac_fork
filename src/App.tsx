import { ReactDOM } from 'react';
import './App.css';
import Hero from './components/common/Hero';
import SearchForm from './components/common/SearchForm';
import Section from './components/common/Section';
import Slide from './components/common/Slide';
import Layout from './components/layouts';
import { Card, CardTitle } from './components/ui/card';
import Masonry from './components/common/Masonry';

const MOCK_SLIDE = new Array(12).fill('category').map((e) => ({ title: e }));
function App() {
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
    </Layout>
  );
}

export default App;
