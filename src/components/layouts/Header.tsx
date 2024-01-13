import { config } from '@/constants';
import { getTypeJSON } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from '../common/Link';
import { ThemeToggler } from '../common/ThemeToggler';
const Header = () => {
  const { logo, navigations } = getTypeJSON(config);
  return (
    <header className=' bg-primary/20 mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex h-16 items-center justify-between'>
        <div className='flex-1 md:flex md:items-center md:gap-12'>
          <a className='block text-teal-600' href='/'>
            <span className='sr-only'>Home</span>
            <img className='w-16 h-16' src={logo} alt='logo' />
          </a>
        </div>

        <div className='md:flex md:items-center md:gap-12'>
          <nav aria-label='Global' className='hidden md:block'>
            <ul className='flex items-center gap-6 text-sm'>
              {navigations.map((nav) => (
                <li key={nav.title}>
                  <Link
                    className='transition no-underline text-md'
                    href={nav.url}
                  >
                    {nav.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className='flex items-center gap-4'>
            <div className='sm:flex sm:gap-4'>
              <Button className=''>Login</Button>

              <div className='hidden sm:flex'>
                <Button variant='outline'>Register</Button>
              </div>
            </div>

            <div className='block md:hidden'>
              <button className='rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
