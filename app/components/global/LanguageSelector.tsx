import {Listbox} from '@headlessui/react';
import {useFetcher, useLocation} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import clsx from 'clsx';
import {useEffect, useState} from 'react';
import invariant from 'tiny-invariant';

import {ChevronDownIcon} from '~/components/icons/ChevronDown';
import RadioIcon from '~/components/icons/Radio';
import {countries} from '~/data/languageCountries';
import {DEFAULT_LOCALE} from '~/lib/utils';
import type {Locale} from '~/types/shopify';
import {useRootLoaderData} from '~/root';

type Props = {
  align?: 'center' | 'left' | 'right';
  onChange?: () => void;
};

export function LanguageSelector({ align = 'center', onChange }: Props) {
  const fetcher = useFetcher();
  const [listboxOpen, setListboxOpen] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  const selectedLocalePrefix = `${selectedLocale?.language}-${selectedLocale?.country}`;
  const { pathname, search } = useLocation();
  const pathWithoutLocale = `${pathname.replace(selectedLocale.pathPrefix, '')}${search}`;

  const defaultLocale = countries?.['default'];
  const defaultLocalePrefix = defaultLocale
    ? `${defaultLocale?.language}-${defaultLocale?.country}`
    : '';

  const setLocale = (newLocale: Locale) => {
    const newLocalePrefix = `${newLocale?.language}-${newLocale?.country}`;
    if (newLocalePrefix !== selectedLocalePrefix) {
      const countryUrlPath = getCountryUrlPath({
        countryLocale: newLocale,
        defaultLocalePrefix,
        pathWithoutLocale,
      });

      setPendingLocale(newLocale); // track pending locale change

      fetcher.submit(
        {
          cartFormInput: JSON.stringify({
            action: CartForm.ACTIONS.BuyerIdentityUpdate,
            inputs: {
              buyerIdentity: {
                countryCode: newLocale.country,
              },
            },
          }),
          redirectTo: countryUrlPath,
        },
        { method: 'post', action: '/cart?index' },
      );
    }
  };

  // ✅ Close dropdown after fetcher is done
  useEffect(() => {
    if (pendingLocale && fetcher.state === 'idle') {
      setPendingLocale(null);
      if (onChange) onChange();
    }
  }, [fetcher.state, pendingLocale, onChange]);

  const isLoading = fetcher.state !== 'idle';

  return (
    <Listbox onChange={setLocale} value={selectedLocale}>
      {({ open }) => {
        setTimeout(() => setListboxOpen(open));
        return (
          <div className="relative inline-flex items-center">
            <Listbox.Button
              disabled={isLoading} // disable while loading
              className={clsx(
                'flex h-[2rem] items-center rounded-sm  text-[16px] font-bold duration-150', //bg-darkGray bg-opacity-0
                'hover:bg-opacity-10',
                isLoading && 'opacity-70 cursor-not-allowed',
              )}
            >
              {selectedLocale?.country === 'US' || selectedLocale?.country === 'ES' ? (
                <span className="mr-2">
                  {selectedLocale?.country === 'US' ? 'English' : 'Spanish'}
                </span>
              ) : (
                <span className="mr-2">English</span>
              )}

              {/* ✅ Loader Spinner */}
              {isLoading ? (
                <svg
                  className="animate-spin h-4 w-4 text-gray-500 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <ChevronDownIcon className={clsx(open && 'rotate-180')} />
              )}
            </Listbox.Button>

            <Listbox.Options
              className={clsx(
                'absolute top-full z-10 mt-0 min-w-[150px] overflow-hidden rounded shadow',
                align === 'center' && 'left-1/2 -translate-x-1/2',
                align === 'left' && 'left-[-9px]',
                align === 'right' && 'right-0',
              )}
            >
              <div className="max-h-64 overflow-y-auto bg-white">
                {listboxOpen && (
                  <Countries
                    selectedLocalePrefix={selectedLocalePrefix}
                    getClassName={(active: boolean) =>
                      clsx([
                        'p-3 flex justify-between items-center text-left font-bold text-sm cursor-pointer whitespace-nowrap',
                        active ? 'bg-darkGray bg-opacity-5' : null,
                      ])
                    }
                  />
                )}
              </div>
            </Listbox.Options>
          </div>
        );
      }}
    </Listbox>
  );
}


export function Countries({
  getClassName,
  selectedLocalePrefix,
}: {
  getClassName: (active: boolean) => string;
  selectedLocalePrefix: string;
}) {
  // check if selectedLocalePrefix exists in countries list
  const allPrefixes = Object.keys(countries).map(
    (key) => `${countries[key].language}-${countries[key].country}`,
  );

  const hasMatch = allPrefixes.includes(selectedLocalePrefix);

  return (
    <>
      {Object.keys(countries).map((countryKey) => {
        const countryLocale = countries[countryKey];
        const countryLocalePrefix = `${countryLocale?.language}-${countryLocale?.country}`;

        // ✅ if no match at all, force-select EN-US
        const isSelected = hasMatch
          ? countryLocalePrefix === selectedLocalePrefix
          : countryLocalePrefix === 'EN-US';

        return (
          <Listbox.Option key={countryLocalePrefix} value={countryLocale}>
            {({ active }: { active: boolean }) => (
              <div className={getClassName(active)}>
                <span className="mr-8">{countryLocale.label}</span>
                <RadioIcon checked={isSelected} hovered={active} />
              </div>
            )}
          </Listbox.Option>
        );
      })}
    </>
  );
}


function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = '';
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;

  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}
