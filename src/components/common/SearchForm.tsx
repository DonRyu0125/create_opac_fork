import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

export interface SearchFormProps extends React.HTMLAttributes<HTMLFormElement> {
  searchURL: string;
  inputName: string;
}
const SearchForm = ({
  className,
  searchURL,
  inputName,
  ...props
}: SearchFormProps) => {
  return (
    <form
      method='POST'
      action={searchURL}
      className={cn('w-full mx-auto flex space-x-4 justify-center', className)}
      {...props}
    >
      <div className='w-96'>
        <Input
          name={inputName}
          className='w-full rounded-none  py-3 bg-white  text-white'
          placeholder='What are you looking for'
          type='search'
        />
      </div>
      <Button
        variant={'secondary'}
        className='right-0 top-0 h-full px-4'
        type='submit'
      >
        <span className='hidden md:block'> Search</span>
        <span className='md:hidden block'>
          <Search className='w-4 h-4' />
        </span>
      </Button>
    </form>
  );
};

export default SearchForm;
