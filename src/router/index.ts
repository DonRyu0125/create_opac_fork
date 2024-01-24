import Detail from '@/components/page-template/Detail';
import Home from '@/components/page-template/Home';
import NotFoundPage from '@/components/page-template/NotFoundPage';
import Summary from '@/components/page-template/Summary';

export type TRoute = Record<string, () => React.ReactNode>;

export const ROUTES: TRoute = {
  home: Home,
  summary: Summary,
  detail: Detail,
} as const;

export const getComponentFromKey = (key: string): (() => React.ReactNode) => {
  if (key in ROUTES) {
    return ROUTES[key];
  }
  return NotFoundPage;
};
