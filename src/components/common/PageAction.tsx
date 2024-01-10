import { LayoutGrid, List } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Breadcrumb from './Breadcrumb';
import { useAtom } from 'jotai';
import { viewAtom } from '../store';

type Props = {};

const PageAction = (props: Props) => {
  const [view, setView] = useAtom(viewAtom);
  const toggleView = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };
  return (
    <div>
      <div className='container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16'>
        <Breadcrumb
          items={[
            { label: 'Home', url: '/' },
            {
              label: 'Summary',
              url: '/summary',
              active: true,
            },
          ]}
        />

        <div>
          <Button
            onClick={toggleView}
            variant={view === 'grid' ? 'default' : 'outline'}
            size='icon'
          >
            <LayoutGrid className='h-4 w-4' />
          </Button>
          <Button
            onClick={toggleView}
            variant={view === 'list' ? 'default' : 'outline'}
            size='icon'
          >
            <List className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default PageAction;
