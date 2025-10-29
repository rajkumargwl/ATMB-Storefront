import { Link } from '@remix-run/react';
import CallWhite from '~/components/icons/CallWhite';
import {usePrefixPathWithLocale} from '~/lib/utils';
 
type FooterProps = {
  data: {
    title?: string;
    logo?: { asset?: { url?: string } };
    description?: string;
    companyColumn?: { title?: string; links?: { label: string; link?: string }[] };
    servicesColumn?: { title?: string; links?: { label: string; link?: string }[] };
    locationsColumn?: { title?: string; links?: { label: string; link?: string }[] };
    MailCenterOperator?: { title?: string; links?: { label: string; link?: string }[] };
    MailboxRenters?: { title?: string; links?: { label: string; link?: string }[] };
    contactColumn?: {
      title?: string;
      address?: string;
      links?: {
        icon?: { asset?: { url?: string } };
        label: string;
        value?: string;
        link?: string;
        tooltipTitle?: string; // ADD THIS
      }[]
    };
    appButtons?: {
      icon?: { asset?: { url?: string } };
      link?: string;
      tooltipTitle?: string; // ADD THIS
    }[];
    socialLinks?: {
      icon?: { asset?: { url?: string } };
      link?: string;
      tooltipTitle?: string; // ADD THIS
    }[];
    bottomLinks?: { label: string; link?: string }[];
  };
};
 
export default function Footer({ data }: FooterProps) {
  if (!data) return null;
 
  return (
    <footer className="bg-[#1F2327] text-white  px-5 xl:px-0">
      <div className="max-w-[1312px] mx-auto pt-6 md:pt-10 pb-8 md:pb-9">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-5">
          {/* Logo + Title + Description */}
          <div className="lg:col-span-2 md:max-w-[306px] flex items-center md:items-start flex-col gap-6 lg:gap-[69px]">
            <div className="block">
              {data.logo?.asset?.url && (
                <img
                  src={data.logo.asset.url}
                  alt={data.title || 'Logo'}
                  className="h-[56px] w-[111px] mb-6 ml-auto md:ml-[0px] mr-auto md:mr-[0px]"
                />
              )}
              {data.description && (
                <p className="tracking-[0px] font-Roboto text-LightWhite text-[16px] leading-[24px] font-normal text-center md:text-left">
                  {data.description}
                </p>
              )}
            </div>
                {/* App Download Buttons */}
                {data.appButtons && (
                  <div className="flex gap-3 justify-center md:justify-start">
                    {data.appButtons.map((btn, idx) => (
                      <a
                        key={idx}
                        href={btn.link || '#'}
                        target="_blank"
                        rel="noreferrer"
                        title={btn.tooltipTitle}
                      >
                        {btn.icon?.asset?.url && (
                          <img
                            src={btn.icon.asset.url}
                            alt={btn.tooltipTitle || 'App button'}
                            className="h-10"
                          />
                        )}
                      </a>
                    ))}
                  </div>
                )}
          </div>
 
          {/* Right Columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-[48px] lg:col-span-3 w-full xl:min-w-[812px] xl:-ml-5">
            {/* Company */}
            {data.companyColumn && (
              <FooterColumn title={data.companyColumn.title} links={data.companyColumn.links} />
            )}
 
            {/* Shop by Use Case */}
            {data.servicesColumn && (
              <FooterColumn title={data.servicesColumn.title} links={data.servicesColumn.links} />
            )}
 
            <div className='flex flex-col gap-[26px]'>
            {/* Solutions */}
            {data.locationsColumn && (
              <FooterColumn title={data.locationsColumn.title} links={data.locationsColumn.links} />
            )}
            {/* Mailbox Renters */}
            {data.MailboxRenters && (
              <FooterColumn
                title={data.MailboxRenters.title}
                links={data.MailboxRenters.links}
              />
            )}
            </div>
            <div className='flex flex-col gap-[26px]'>
            {/* Mail Center Operator */}
            {data.MailCenterOperator && (
              <FooterColumn
                title={data.MailCenterOperator.title}
                links={data.MailCenterOperator.links}
              />
            )}
 
            
 
            {/* Contact */}
            {data?.contactColumn && (
              <div>
                <h3 className="text-[18px] leading-[27px] font-normal text-white mb-3 md:mb-4 tracking-[0px]">
                  {data.contactColumn.title}
                </h3>
                <ul className="space-y-3 text-sm">
                  {data.contactColumn.links?.map((item, idx) => (
                    <li key={idx} className="flex gap-1 items-center">
                      {item?.icon?.asset?.url && (
                        <img
                          src={item.icon.asset.url}
                          alt={item.label}
                          className="w-[24px]"
                          title={item.tooltipTitle}
                        />
                      )}
                      {item.link ? (
                        <a
                          href={usePrefixPathWithLocale(item.link)}
                          className="font-Roboto text-LightWhite text-[14px] leading-[21px] font-normal tracking-[0px] inline-block"
                        >
                          {item.label} {item.value}
                        </a>
                      ) : (
                        <span className="text-LightWhite text-[14px] leading-[21px] tracking-[0px]">
                          {item.label} {item.value}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                {data.contactColumn.address && (
                  <p className="mt-3 text-LightWhite text-[14px] leading-[21px] font-normal tracking-[0px]">
                    {data.contactColumn.address}
                  </p>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
 
      {/* Divider + Bottom Section */}
      <div className="border-t border-[#4D4E4F]">
        <div className="max-w-[1312px] mx-auto pt-5 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {data.bottomLinks?.map((link, idx) => (
              <Link
                key={idx}
                to={usePrefixPathWithLocale(link.link) || '#'}
                className="font-Roboto text-[14px] leading-[21px] font-normal tracking-[0px] text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
 
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {data.socialLinks?.map((social, idx) => (
              <a
                key={idx}
                href={social.link || '#'}
                target="_blank"
                rel="noreferrer"
                className="border border-[#4D4E4F] p-[9px] rounded-full cursor-pointer"
              >
                {social.icon?.asset?.url && (
                  <img
                    src={social.icon.asset.url}
                    alt="Social"
                    className="h-6 w-6"
                    title={social.tooltipTitle}
                  />
                )}
              </a>
            ))}
             {/* <span className="text-[14px] leading-[21px] font-normal text-white inline">
            AnyTime Mailbox ©  2025
          </span> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
 
function FooterColumn({
  title,
  links,
}: {
  title?: string;
  links?: { label: string; link?: string }[];
}) {
  return (
    <div>
      <h3 className="font-Roboto text-[18px] leading-[27px] font-normal tracking-[0px] text-white mb-3 md:mb-4">
        {title}
      </h3>
      <ul className="space-y-1">
        {links?.map((link, idx) => (
          <li key={idx}>
            <Link
              to={usePrefixPathWithLocale(link.link) || '#'}
              className="font-Roboto text-LightWhite text-[14px] leading-[21px] font-normal tracking-[0px] py-1 inline-block"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
 