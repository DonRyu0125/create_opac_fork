import './App.css';
import Hero from './components/common/Hero';
import SearchForm from './components/common/SearchForm';
import Section from './components/common/Section';
import Slide from './components/common/Slide';
import Layout from './components/layouts';

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
        <Slide />
      </Section>
    </Layout>
  );
}

export default App;
