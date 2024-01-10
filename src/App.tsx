import './App.css';
import Hero from './components/common/Hero';
import SearchForm from './components/common/SearchForm';
import Layout from './components/layouts';

function App() {
  return (
    <Layout>
      <Hero title={'Search'} description={'Lorem ipsum'} backgroundImage={''}>
        <SearchForm searchURL={'/action'} inputName={'KEYWORD_CL'} />
      </Hero>
    </Layout>
  );
}

export default App;
