import clsx from 'clsx';
import {useCallback} from 'react';

import CollectionGroup from '~/components/global/collectionGroup/CollectionGroup';
import {Link} from '~/components/Link';
import type {SanityMenuLink} from '~/lib/sanity';

/**
 * A component that defines the navigation for a web storefront
 */

type Props = {
  menuLinks: SanityMenuLink[];
};

export default function Navigation({menuLinks}: Props) {
  const renderLinks = useCallback(() => {
    const staticLinks = [
      {
        _key: 'static-home',
        title: 'Home',
        slug: '/',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'Service',
        slug: '/service',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'Locations',
        slug: '/locations',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'Solutions',
        slug: '/',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'Blog',
        slug: '/',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'How it works',
        slug: '/',
        _type: 'linkInternal',
      },
      {
        _key: 'static-home',
        title: 'About US',
        slug: '/',
        _type: 'linkInternal',
      },
      {
        _key: 'static-contact',
        title: 'Contact Us',
        url: 'https://yourdomain.com/contact',
        newWindow: false,
        _type: 'linkExternal',
      },
    ];

    const combinedLinks = [...staticLinks, ...(menuLinks ?? [])];

    return combinedLinks.map((link) => {
      if (link._type === 'collectionGroup') {
        return <CollectionGroup collectionGroup={link} key={link._key} />;
      }

      if (link._type === 'linkExternal') {
        return (
          <div className="flex items-center" key={link._key}>
            <a
              className="linkTextNavigation"
              href={link.url}
              rel="noreferrer"
              target={link.newWindow ? '_blank' : '_self'}
            >
              {link.title}
            </a>
          </div>
        );
      }

      if (link._type === 'linkInternal') {
        if (!link.slug) {
          return null;
        }

        return (
          <div className="flex items-center" key={link._key}>
            <Link className="linkTextNavigation" to={link.slug}>
              {link.title}
            </Link>
          </div>
        );
      }

      return null;
    });
  }, [menuLinks]);

  return (
    <nav
      className={clsx(
        'relative hidden items-stretch justify-start gap-6 text-sm font-bold',
        'lg:flex',
      )}
    >
      {renderLinks()}
    </nav>
  );
}
