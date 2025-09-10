import { Link } from '@remix-run/react';

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
    <footer className="bg-[#0A0A0A] text-white">
      <div className="max-w-[1312px] mx-auto px-4 md:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Logo + Title + Description */}
          <div className="lg:col-span-2 max-w-[300px]">
            {data.logo?.asset?.url && (
              <img
                src={data.logo.asset.url}
                alt={data.title || 'Logo'}
                className="h-[56px] w-[111px] mb-4"
              />
            )}
            {data.description && (
              <p className="text-[16px] mb-4 text-center md:text-left">
                {data.description}
              </p>
            )}
            {/* App Download Buttons */}
            {data.appButtons && (
              <div className="flex gap-3 justify-center md:justify-start">
                {data.appButtons.map((btn, idx) => (
                  <a key={idx} href={btn.link} target="_blank" rel="noreferrer">
                    {btn.icon?.asset?.url && (
                      <img
                        src={btn.icon.asset.url}
                        alt="App button"
                        className="h-10"
                      />
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
    
          {/* Four Section Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:col-span-3 w-full">
            {/* Company */}
            {data.companyColumn && (
              <div>
                <h4 className="text-[18px] font-bold mb-5">
                  {data.companyColumn.title}
                </h4>
                <ul className="space-y-2">
                  {data.companyColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className="text-sm text-[#DCDCDC] hover:underline"
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
                <h4 className="text-[18px] font-bold mb-5">
                  {data.servicesColumn.title}
                </h4>
                <ul className="space-y-2">
                  {data.servicesColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className="text-sm text-[#DCDCDC] hover:underline"
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
                <h4 className="text-[18px] font-bold mb-5">
                  {data.locationsColumn.title}
                </h4>
                <ul className="space-y-2">
                  {data.locationsColumn.links?.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        to={link.link || '#'}
                        className={`text-sm ${
                          link.highlight
                            ? 'text-orange-500 font-semibold'
                            : 'text-[#DCDCDC] hover:underline'
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
                <h4 className="text-[18px] font-bold mb-5">
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
                          className="text-[14px] text-[#DCDCDC] hover:underline"
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
                <p className='text-[14px] mt-4'>{data?.contactColumn?.address}</p>
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
    
      {/* Full-width Divider */}
      <div className="border-t border-gray-800 mt-8">
        <div className="max-w-[1312px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-6 text-[14px]">
            {data.bottomLinks?.map((link, idx) => (
              <Link key={idx} to={link.link || '#'} className="hover:underline">
                {link.label}
              </Link>
            ))}
          </div>
    
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {data.socialLinks?.map((social, idx) => (
              <a key={idx} href={social.link} target="_blank" rel="noreferrer" className='border p-2 rounded-full hover:bg-gray-800 cursor-pointer'>
                {social.icon?.asset?.url && (
                  <img
                    src={social.icon.asset.url}
                    alt="Social"
                    className="h-5 w-5"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
  </footer>  
  );
}
