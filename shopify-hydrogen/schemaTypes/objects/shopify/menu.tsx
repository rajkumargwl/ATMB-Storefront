import {defineField, defineType} from 'sanity';
import ShopifyMenuInput from '../../../components/shopify/ShopifyMenuInput';

export const menu = defineField({
  name: 'shopifyMenu',
  title: 'Shopify Menu',
  type: 'object',
  fields: [
    defineField({
      name: 'selectedMenu',
      title: 'Shopify Menu Item',
      type: 'string',
      inputComponent: ShopifyMenuInput,
    }),
  ],
});
