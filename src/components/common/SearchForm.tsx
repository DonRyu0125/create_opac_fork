import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Search, SearchIcon } from 'lucide-react';
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
      <div className='w-3/4 relative'>
        <Input
          name={inputName}
          className='w-full rounded-none pl-8 border-2 py-3 bg-transparent text-white'
          placeholder='What are you looking for'
          type='search'
        />
        <SearchIcon className='absolute w-4 h-5 left-2 my-auto  mx-0 right-0 top-0 bottom-0 text-white' />
      </div>
      <Button
        variant={'default'}
        className='right-0 top-0 h-full'
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
