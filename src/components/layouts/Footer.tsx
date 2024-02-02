import { config } from '@/constants';
import { getJSONType } from '@/lib/utils';
import VendorFooter from './VendorFooter';

const Footer = () => {
  const { logo } = getJSONType(config);

  return (
    <VendorFooter />
  );
};

export default Footer;
