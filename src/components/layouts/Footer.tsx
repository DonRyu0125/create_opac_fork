import { config } from '@/constants';
import { getTypeJSON } from '@/lib/utils';

const Footer = () => {
  const { logo } = getTypeJSON(config);

  return (
    <footer className='bg-red-50 mx-auto  px-4 py-8 sm:px-6 lg:px-8'>
      <div className='sm:flex sm:items-center sm:justify-between'>
        <div className='flex justify-center text-teal-600 sm:justify-start'>
          <img className='w-16 h-16' src={logo} alt='logo' />
        </div>

        <p className='mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right'>
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
