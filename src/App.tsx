import './App.css';
import Hero from './components/common/Hero';
import SearchInput from './components/common/SearchInput';

function App() {
  return (
    <>
      <Hero title={'Search'} description={'Lorem ipsum'} backgroundImage={''}>
        <SearchInput searchURL={'/action'} inputName={'KEYWORD_CL'} />
      </Hero>
    </>
  );
}

export default App;
