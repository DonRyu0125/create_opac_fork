import './App.css';
import Hero from './components/common/Hero';
import SearchForm from './components/common/SearchForm';

function App() {
  return (
    <>
      <Hero title={'Search'} description={'Lorem ipsum'} backgroundImage={''}>
        <SearchForm searchURL={'/action'} inputName={'KEYWORD_CL'} />
      </Hero>
    </>
  );
}

export default App;
