import Home from '@/components/page-template/Home';
import Summary from './components/page-template/Summary';
import Detail from './components/page-template/Detail';
import { ROUTES } from './router';
import NotFoundPage from './components/page-template/NotFoundPage';

function App() {
  const curPage = 'test';
  const Component = ROUTES[curPage] || NotFoundPage;
  return <Component />;
}

export default App;
