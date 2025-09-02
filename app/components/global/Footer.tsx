// app/components/global/Footer.tsx
import { Link } from '@remix-run/react';

type FooterProps = {
  data: {
    title?: string;
    logo?: { asset?: { url?: string } };
    description?: string;
    companyColumn?: { title?: string; links?: { label: string; link?: string }[] };
    servicesColumn?: { title?: string; links?: { label: string; link?: string }[] };
    locationsColumn?: { title?: string; links?: { label: string; link?: string; highlight?: boolean }[] };
    appButtons?: { icon?: { asset?: { url?: string } }; link?: string }[];
    socialLinks?: { icon?: { asset?: { url?: string } }; link?: string }[];
    bottomLinks?: { label: string; link?: string }[];
  };
};

export default function Footer({ data }: FooterProps) {
  if (!data) return null;

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo + Title + Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {data.logo?.asset?.url && (
                <img
                  src={data.logo.asset.url}
                  alt={data.title || 'Logo'}
                  className="h-8"
                />
              )}
              {data.title && (
                <span className="text-lg font-semibold">{data.title}</span>
              )}
            </div>
            {data.description && (
              <p className="text-sm">{data.description}</p>
            )}
          </div>

          {/* Company */}
          {data.companyColumn && (
            <div>
              <h4 className="text-sm font-semibold mb-3">
                {data.companyColumn.title}
              </h4>
              <ul className="space-y-2">
                {data.companyColumn.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.link || '#'} className="text-sm">
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
              <h4 className="text-sm font-semibold mb-3">
                {data.servicesColumn.title}
              </h4>
              <ul className="space-y-2">
                {data.servicesColumn.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.link || '#'} className="text-sm">
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
              <h4 className="text-sm font-semibold mb-3">
                {data.locationsColumn.title}
              </h4>
              <ul className="space-y-2">
                {data.locationsColumn.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.link || '#'}
                      className={`text-sm ${link.highlight ? 'font-semibold' : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* App Download */}
          {data.appButtons && (
            <div>
              <h4 className="text-sm font-semibold mb-3">
                Download App
              </h4>
              <div className="flex flex-col space-y-3">
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
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            {data.bottomLinks?.map((link, idx) => (
              <Link key={idx} to={link.link || '#'} className="text-xs">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm">Follow Us</span>
            {data.socialLinks?.map((social, idx) => (
              <a key={idx} href={social.link} target="_blank" rel="noreferrer">
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
