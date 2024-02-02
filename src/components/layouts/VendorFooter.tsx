

type Props = {};

const VendorFooter = (props: Props) => {
  return (
    <section id='footer'>
      <div
        id='license'
        className='bg-[#00142E] text-center text-white py-[50px] px-[8px] sm:px-[200px]'
      >
        <p className='text-[16px] sm:text-[18px] font-medium leading-[21px]'>
          Please read carefully
        </p>
        <p className='mt-[25px] font-extralight leading-[32px] text-[13px] sm:text-[18px] text-ford-grey'>
          Multimedia License Agreement | Images, video and audio from this Web
          site are provided for the purpose of editorial use only. You must
          contact archives@ford.com to obtain approval for advertising,
          marketing or other commercial users.
        </p>
        <p className='mt-[40px] text-[16px] text-ford-grey leading-[24px]'>
          © {new Date().getFullYear()} The Ford Motor Company. All Rights
          Reserved.
        </p>
      </div>

      <div
        id='blackbox'
        className='flex justify-items-center flex-col sm:flex-row h-[350px] w-full bg-black text-white pt-[80px] py-[100px] hidden sm:flex'
      >
        <div className='w-1/4 flex justify-center'>
          <div className='flex flex-col'>
            <h3 className='text-[18px] leading-[21px] font-bold text-ford-white mb-[25px]'>
              Ford Press
            </h3>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://media.ford.com/content/fordmedia/fna/us/en.html'
            >
              Media
            </a>
          </div>
        </div>
        <div className='w-1/4 flex justify-center'>
          <div className='flex flex-col'>
            <h3 className='text-[18px] leading-[21px] font-bold text-ford-white mb-[25px] '>
              Contact Us
            </h3>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://corporate.ford.com/contact.html'
            >
              Ford Motor Company
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://shareholder.ford.com/investors/overview/default.aspx'
            >
              Investors
            </a>
            <p className='text-[16px] leading-[19px] text-ford-white mb-[20px] contactUs'>
              Ford Heritage Vault
            </p>
          </div>
        </div>
        <div className='w-1/4 flex justify-center'>
          <div className='flex flex-col'>
            <h3 className='text-[18px] leading-[21px] font-bold text-ford-white mb-[25px]'>
              Support
            </h3>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.ford.com/support/'
            >
              Ford Support US
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.lincoln.com/support/'
            >
              Lincoln Support US
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.ford.com/support/recalls/'
            >
              Recalls
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.ford.com/support/category/fordpass/'
            >
              FordPass
            </a>
          </div>
        </div>
        <div className='w-1/4 flex justify-center'>
          <div className='flex flex-col'>
            <h3 className='text-[18px] leading-[21px] font-bold text-ford-white mb-[25px]'>
              Shop
            </h3>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.ford.com/'
            >
              Ford US
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://www.lincoln.com/'
            >
              Lincoln US
            </a>
            <a
              className='text-[16px] leading-[19px] text-ford-white mb-[20px]'
              href='https://corporate.ford.com/operations/locations/global-links.html'
            >
              Global Sites
            </a>
          </div>
        </div>
      </div>
      <div
        id='blackbox_mobile'
        className='flex sm:hidden flex-col bg-black h-auto text-ford-white text-[18px] divide-y divide-ford-white px-[15px] py-[40px]'
      >
        <div>
          <div className='flex justify-between h-[60px] pt-[15px]'>
            <div>
              <p>Ford Press</p>
            </div>
            <div className='expandBlackboxButton'>
              <span className='material-icons'> expand_more </span>
            </div>
          </div>
          <div className='bg-black w-full h-auto px-[15px] pb-[30px] blackBoxCollapse collapse'>
            <a
              className='mb-[8px]'
              href='https://media.ford.com/content/fordmedia/fna/us/en.html'
            >
              Media
            </a>
          </div>
        </div>
        <div>
          <div className='flex justify-between h-[60px] pt-[15px]'>
            <div>
              <p className=''>Contact Us</p>
            </div>
            <div className='expandBlackboxButton'>
              <span className='material-icons'> expand_more </span>
            </div>
          </div>
          <div className='bg-black w-full h-auto px-[15px] pb-[30px] blackBoxCollapse collapse'>
            <a
              className='mb-[8px]'
              href='https://corporate.ford.com/contact.html'
            >
              Ford Motor Company
            </a>
            <a
              className='mb-[8px]'
              href='https://shareholder.ford.com/investors/overview/default.aspx'
            >
              Investor
              <p className='mb-[8px] contactUs'>Ford Heritage Vault</p>
            </a>
          </div>
          <a
            className='mb-[8px]'
            href='https://shareholder.ford.com/investors/overview/default.aspx'
          ></a>
        </div>
        <a
          className='mb-[8px]'
          href='https://shareholder.ford.com/investors/overview/default.aspx'
        ></a>
        <div>
          <a
            className='mb-[8px]'
            href='https://shareholder.ford.com/investors/overview/default.aspx'
          >
            <div className='flex justify-between h-[60px] pt-[15px]'>
              <div>
                <p>Support</p>
              </div>
              <div className='expandBlackboxButton'>
                <span className='material-icons'> expand_more </span>
              </div>
            </div>
          </a>
          <div className='bg-black w-full h-auto px-[15px] pb-[30px] blackBoxCollapse collapse'>
            <a
              className='mb-[8px]'
              href='https://shareholder.ford.com/investors/overview/default.aspx'
            ></a>
            <a className='mb-[8px]' href='https://www.ford.com/support/'>
              Ford Support US
            </a>
            <a className='mb-[8px]' href='https://www.ford.com/support/'>
              Lincoln Support US
            </a>
            <a
              className='mb-[8px]'
              href='https://www.ford.com/support/recalls/'
            >
              Recalls
            </a>
            <a
              className='mb-[8px]'
              href='https://www.ford.com/support/category/fordpass/'
            >
              FordPass
            </a>
          </div>
        </div>
        <div>
          <div className='flex justify-between h-[60px] pt-[15px]'>
            <div>
              <p>Shop</p>
            </div>
            <div className='expandBlackboxButton'>
              <span className='material-icons'> expand_more </span>
            </div>
          </div>
          <div className='bg-black w-full h-auto px-[15px] pb-[30px] blackBoxCollapse collapse'>
            <a className='mb-[8px]' href='https://www.ford.com/'>
              Ford US
            </a>
            <a className='mb-[8px]' href='https://www.lincoln.com/'>
              Lincoln US
            </a>
            <a> </a>
            <a
              className='mb-[8px]'
              href='https://corporate.ford.com/operations/locations/global-links.html'
            >
              Global Sites
            </a>
          </div>
        </div>
      </div>

      <div
        id=''
        className='h-[170px] sm:h-[80px] bg-[#00095B] text-white flex flex-col sm:flex-row justify-evenly sm:justify-between py-[25px] px-[15px] sm:px-[100px] space-y-[25px] sm:space-y-0'
      >
        <div className='flex space-x-[15px]' id='surveyButton'></div>
        <div className='flex flex-col sm:flex-row justify-around sm:space-x-[30px]'>
          <div className='sm:self-center'>
            <p className='text-[16px] text-ford-white leading-[19px]'>
              Connect with us
            </p>
          </div>
          <div className='sm:self-center footerSocialLink'>
            <a href='https://twitter.com/Ford' aria-label='Twitter Link'>
              <i className='fa-brands fa-twitter-square' aria-hidden='true'></i>
            </a>
            <a
              href='https://www.linkedin.com/company/ford-motor-company'
              aria-label='LinkedIn Link'
            >
              <i className='fa-brands fa-linkedin' aria-hidden='true'></i>
            </a>
            <a href='https://www.facebook.com/ford' aria-label='Ford Link'>
              <i
                className='fa-brands fa-facebook-square'
                aria-hidden='true'
              ></i>
            </a>
            <a
              href='https://www.instagram.com/accounts/login/?next=/ford/'
              aria-label='Instagram Link'
            >
              <i
                className='fa-brands fa-instagram-square'
                aria-hidden='true'
              ></i>
            </a>
          </div>
        </div>
      </div>

      <div
        id='fordLinks'
        className='bg-ford-white text-center text-[#4D4D4D] py-[50px] px-[15px] sm:px-[100px]'
      >
        <div className='flex flex-col lg:flex-row justify-evenly mt-[15px] '>
          <a
            className='mt-[25px] font-extralight leading-[32px] text-[13px] sm:text-[18px] flex'
            href='https://corporate.ford.com/about/copyright.html'
            target='_blank'
          >
            <img
              alt='Ford Logo'
              className='h-[30px] mx-1'
              src='/assets/images/ford-logo.png'
            />
            © {new Date().getFullYear()} The Ford Motor Company <p></p>
          </a>
        </div>
        <a
          className='mt-[25px] font-extralight leading-[32px] text-[13px] sm:text-[18px] flex'
          href='https://corporate.ford.com/about/copyright.html'
          target='_blank'
        ></a>
        <div className='flex flex-col lg:flex-row justify-evenly mt-[15px] '>
          <a
            className='mt-[25px] font-extralight leading-[32px] text-[13px] sm:text-[18px] flex'
            href='https://corporate.ford.com/about/copyright.html'
            target='_blank'
          ></a>
          <a
            href='https://www.ford.com/help/contact/#accessibility'
            target='_blank'
          >
            Accessibility
          </a>
          <a href='https://www.ford.com/help/privacy/' target='_blank'>
            Privacy Policy
          </a>
          <a href='https://corporate.ford.com/#cookie-settings' target='_blank'>
            Cookie Settings
          </a>
          <a
            href='https://www.ford.com/help/privacy/#caPrivacy'
            target='_blank'
          >
            Your CA Privacy Rights
          </a>
          <a href='https://www.ford.com/help/terms/ ' target='_blank'>
            Terms and Conditions
          </a>
          <a
            href='https://corporate.ford.com/about/ford-open-source.html'
            target='_blank'
          >
            Open Source Notices
          </a>
          <a
            href='https://corporate.ford.com/about/ford-social-rules-of-the-road.html'
            target='_blank'
          >
            Ford Social Rules of the Road
          </a>
        </div>
        <div className='flex flex-col lg:flex-row justify-evenly mt-[15px] '>
          <a
            href='https://corporate.ford.com/content/dam/corporate/us/en-us/documents/legal/Social-Security-Number-Privacy-Statement-081109.pdf '
            target='_blank'
          >
            SSN Privacy (view PDF)
          </a>
          <a
            href='https://corporate.ford.com/content/dam/corporate/us/en-us/documents/legal/global-modern-slavery-and-human-trafficking-transparency-statement.pdf'
            target='_blank'
          >
            Global Modern Slavery Statement (view PDF)
          </a>
          <a
            href='https://corporate.ford.com/content/dam/corporate/us/en-us/documents/legal/Form-SD-and-CMR-for-Year-Ended-December-31-2020-Certification-Copy.pdf'
            target='_blank'
          >
            Conflict Minerals (view PDF)
          </a>
          <a
            href='https://corporate.ford.com/content/dam/corporate/us/en-us/documents/legal/Pay-Transparency-Policy-Statement-2017.pdf'
            target='_blank'
          >
            Pay Transparency (view PDF)
          </a>
        </div>
      </div>
    </section>
  );
};

export default VendorFooter;
