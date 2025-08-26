import React, { useEffect, useState } from 'react';
import { Stack, Text, Select } from '@sanity/ui';
import { set, unset, PatchEvent } from 'sanity';
import { FormFieldProps } from 'sanity';

type ShopifyMenuItem = {
  title: string;
  url: string;
};

const fetchShopifyMenus = async (): Promise<ShopifyMenuItem[]> => {
  const domain = process.env.SHOPIFY_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !token) {
    console.error('Shopify credentials are missing in .env');
    return [];
  }

  const res = await fetch(`https://${domain}/api/2023-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: `
        {
          menu(handle: "main-menu") {
            items {
              title
              url
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();
  return json?.data?.menu?.items ?? [];
};

const ShopifyMenuInput = React.forwardRef<HTMLInputElement, FormFieldProps<string>>(
  (props, ref) => {
    const { value, onChange, schemaType, elementProps } = props;
    const [menus, setMenus] = useState<ShopifyMenuItem[]>([]);

    useEffect(() => {
      fetchShopifyMenus().then(setMenus).catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value;
      onChange(PatchEvent.from(selected ? set(selected) : unset()));
    };

    return (
      <Stack space={3}>
        <Text size={1}>{schemaType.title}</Text>
        <Select
          {...elementProps}
          ref={ref}
          value={value || ''}
          onChange={handleChange}
        >
          <option value="">-- Select a menu item --</option>
          {menus.map((item, idx) => (
            <option key={idx} value={item.url}>
              {item.title}
            </option>
          ))}
        </Select>
      </Stack>
    );
  }
);

ShopifyMenuInput.displayName = 'ShopifyMenuInput';
export default ShopifyMenuInput;
