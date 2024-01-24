import { ROUTES, getComponentFromKey } from './router';
import NotFoundPage from './components/page-template/NotFoundPage';

function App() {
  const curPage = 'summary'; // look at ROUTES object to find matching key /
  // component to be render.E.G if curPage === home then render Home component and so one
  const Component = getComponentFromKey(curPage);
  return <Component />;
}

export default App;
