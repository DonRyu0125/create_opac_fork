import { viewAtom } from '../../store';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '../ui/button';
import { useAtom } from 'jotai';

const ViewToggle = () => {
  const [view, setView] = useAtom(viewAtom);
  const toggleView = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };
  return (
    <div className='flex flex-row'>
      <Button
        className='rounded-r-none'
        onClick={toggleView}
        variant={view === 'grid' ? 'default' : 'outline'}
        size='icon'
      >
        <LayoutGrid className='h-4 w-4' />
      </Button>
      <Button
        className='rounded-l-none'
        onClick={toggleView}
        variant={view === 'list' ? 'default' : 'outline'}
        size='icon'
      >
        <List className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default ViewToggle;
