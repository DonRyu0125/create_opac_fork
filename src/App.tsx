import Home from '@/components/page-template/Home';
import Summary from './components/page-template/Summary';
import Detail from './components/page-template/Detail';
import { ROUTES } from './router';

function App() {
  const curPage = 'home';
  return ROUTES[curPage];
}

export default App;
