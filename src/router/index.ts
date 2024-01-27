import Detail from '@/components/page-template/Detail';
import FAQ from '@/components/page-template/FAQ';
import Home from '@/components/page-template/Home';
import NotFoundPage from '@/components/page-template/NotFoundPage';
import Summary from '@/components/page-template/Summary';

export type TRoute = Record<string, () => React.ReactNode>;


export const ROUTES: TRoute = {
  home: Home,
  summary: Summary,
  detail: Detail,
  faq: FAQ,
};




/**
 * Return the Component for the corresponding key
 * @param key
 * @returns
 */
export const getComponentFromKey = (key: string): (() => React.ReactNode) => {
  if (key in ROUTES) {
    return ROUTES[key];
  }
  return NotFoundPage;
};
