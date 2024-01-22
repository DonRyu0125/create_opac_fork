import Detail from '@/components/page-template/Detail';
import Home from '@/components/page-template/Home';
import Summary from '@/components/page-template/Summary';

export type TRoute = Record<string, () => React.ReactNode>;

export const ROUTES: TRoute = {
  home: Home,
  summary: Summary,
  detail: Detail,
};
