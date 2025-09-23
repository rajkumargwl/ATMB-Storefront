import { Link } from '@remix-run/react';
import CallWhite from '~/components/icons/CallWhite';

type FooterProps = {
  data: {
    title?: string;
    logo?: { asset?: { url?: string } };
    description?: string;
    companyColumn?: { title?: string; links?: { label: string; link?: string }[] };
    servicesColumn?: { title?: string; links?: { label: string; link?: string }[] };
    locationsColumn?: { title?: string; links?: { label: string; link?: string; highlight?: boolean }[] };
    contactColumn?: { title?: string; links?: { label: string; value?: string; link?: string }[] };
    appButtons?: { icon?: { asset?: { url?: string } }; link?: string }[];
    socialLinks?: { icon?: { asset?: { url?: string } }; link?: string }[];
    bottomLinks?: { label: string; link?: string }[];
  };
};

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer className="bg-PrimaryBlack text-white px-5">
      <div className="max-w-[1312px] mx-auto pt-6 md:pt-10 pb-8 md:pb-9">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-5">
          {/* Logo + Title + Description */}
          <div className="lg:col-span-2 md:max-w-[306px] flex items-center md:items-start flex-col justify-between gap-6">
            <div className="block">
              {data.logo?.asset?.url && (
                <img
                  src={data.logo.asset.url}
                  alt={data.title || 'Logo'}
                  className="h-[56px] w-[111px] mb-6 ml-auto md:ml-[0px] mr-auto md:mr-[0px]"
                />
              )}
              {data.description && (
                <p className="text-LightWhite text-[16px] leading-[24px] font-normal text-center md:text-left">
                  {data.description}
                </p>
              )}
            </div>
            {/* App Download Buttons */}
            {data.appButtons && (
              <div className="flex gap-3 justify-center md:justify-start">
                {data.appButtons.map((btn, idx) => (
                  <a key={idx} href={btn.link} target="_blank" rel="noreferrer" className='hidden'>
                    {btn.icon?.asset?.url && (
                      <img
                        src={btn.icon.asset.url}
                        alt="App button"
                        className="h-10"
                      />
                    )}
                  </a>
                ))}
                <a className="rounded-[100px] bg-[#F60] font-Roboto text-white px-4 py-3 font-normal leading-[16px] tracking-[0.08px] text-base flex items-center gap-3" href="/"><CallWhite /> +1 (775) 500 0579</a>
              </div>
            )}
          </div>
    
          {/* Four Section Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 md:gap-14 lg:col-span-3 w-full xl:min-w-[812px] xl:-ml-5">
            {/* Company */}
            {data.companyColumn && (
              <div>
                <h4 className="text-[18px] leading-[27px] font-normal text-white mb-4">
                  {data.companyColumn.title}
                </h4>
                <ul className="space-y-1">
                  {data.companyColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className="text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
    
            {/* Services */}
            {data.servicesColumn && (
              <div>
                <h4 className="text-[18px] leading-[27px] font-normal text-white mb-4">
                  {data.servicesColumn.title}
                </h4>
                <ul className="space-y-1">
                  {data.servicesColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className="text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
    
            {/* Locations */}
            {data.locationsColumn && (
              <div>
                <h4 className="text-[18px] leading-[27px] font-normal text-white mb-4">
                  {data.locationsColumn.title}
                </h4>
                <ul className="space-y-1">
                  {data.locationsColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className={`text-sm ${
                          link.highlight
                            ? 'text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block'
                            : 'text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
    
            {/* Contact */}
            {/* {data?.contactColumn && ( */}
              <div>
                <h4 className="text-[18px] leading-[27px] font-normal text-white mb-4">
                  {data?.contactColumn?.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {data?.contactColumn?.links?.map((item, idx) => (
                    <li key={idx} className='flex gap-2 space-y-2 items-center'>
                      {item?.icon?.asset?.url && (
                      <img
                        src={item.icon.asset.url}
                        alt="App button"
                        className="w-[24px]"
                      />
                    )}
                      {item?.link ? (
                        <a
                          href={item?.link}
                          className="text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block"
                        >
                          {item?.label} {item?.value}
                        </a>
                      ) : (
                        <span>
                          {item?.label} {item?.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className='text-LightWhite text-[14px] leading-[21px] font-normal py-1 inline-block'>{data?.contactColumn?.address}</p>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>

      <div className="max-w-[1312px] mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left - Social links */}
        <div className="flex space-x-5 md:space-x-11 mb-4 md:mb-0">
          <a href="#" className="text-[18px] leading-[27px] font-normal text-LightWhite underline decoration-solid">Instagram</a>
          <a href="#" className="text-[18px] leading-[27px] font-normal text-LightWhite underline decoration-solid">Facebook</a>
          <a href="#" className="text-[18px] leading-[27px] font-normal text-LightWhite underline decoration-solid">Youtube</a>
        </div>

        {/* Right - App info */}
        <div className="flex items-center space-x-4 flex-col-reverse md:flex-row">
          
            <span className="text-[14px] leading-[21px] font-normal text-white inline mt-4 md:mt-[0px]">
              Mobile app is available now on
            </span>
         
          <div className="flex items-center space-x-4">
          {data.socialLinks?.map((social, idx) => (
                <a key={idx} href={social.link} target="_blank" rel="noreferrer" className='border border-[#4D4E4F] p-[7px] rounded-full cursor-pointer'>
                  {social.icon?.asset?.url && (
                    <img
                      src={social.icon.asset.url}
                      alt="Social"
                      className="h-7 w-7"
                    />
                  )}
                </a>
              ))}
             </div>
        </div>
      </div>
    
      {/* Full-width Divider */}
      <div className="border-t border-[#4D4E4F] mt-5">
        <div className="max-w-[1312px] mx-auto pt-5 pb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {data.bottomLinks?.map((link, idx) => (
              <Link key={idx} to={link.link || '#'} className="text-[14px] leading-[21px] font-normal text-white">
                {link.label}
              </Link>
            ))}
          </div>
    
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {/* {data.socialLinks?.map((social, idx) => (
              <a key={idx} href={social.link} target="_blank" rel="noreferrer" className='border p-2 rounded-full hover:bg-gray-800 cursor-pointer'>
                {social.icon?.asset?.url && (
                  <img
                    src={social.icon.asset.url}
                    alt="Social"
                    className="h-5 w-5"
                  />
                )}
              </a>
            ))} */}
             <span className="text-[14px] leading-[21px] font-normal text-white inline">
            AnyTime Mailbox ©  2025
          </span>
          </div>
        </div>
      </div>
  </footer>  
  );
}