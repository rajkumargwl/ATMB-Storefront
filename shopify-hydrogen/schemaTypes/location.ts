import {defineType, defineField} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'locationId',
      title: 'Location ID',
      type: 'string',
    }),
    defineField({
      name: 'parentLocationId',
      title: 'Parent Location ID',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
    }),
    defineField({
      name: 'countryCode',
      title: 'Country Code',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State / Province',
      type: 'string',
    }),
    defineField({
      name: 'stateCode',
      title: 'State Code',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'addressLine1',
      title: 'Address Line 1',
      type: 'string',
    }),
     defineField({
      name: 'addressLine2',        // <--- Added field
      title: 'Address Line 2',
      type: 'string',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint', // stores latitude + longitude
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
    }),
    defineField({
      name: 'webkey',
      title: 'Web Key',
      type: 'string',
    }),
    defineField({
      name: 'featureList',
      title: 'Feature List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', type: 'string' },
            { name: 'class', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'feature_id', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'status', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'sort_order', type: 'number' }, // <--- added sort_order inside feature object
          ],
        },
      ],
    }),
    defineField({
      name: 'ratingList',
      title: 'Rating List',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'attributionList',
      title: 'Attribution List',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'attributeList',
      title: 'Attribute List',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'planTier',
      title: 'Plan Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Basic', value: 'basic'},
          {title: 'Premium', value: 'premium'},
        ],
        layout: 'radio', // optional: makes it radio buttons
      },
    }),
    defineField({
      name: 'priceRange',
      title: 'Price Range',
      type: 'number', // integer
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Easy ingress', value: 'easyIngress'},
          {title: '24/7 Access', value: 'access247'},
          {title: 'Mail forwarding', value: 'mailForwarding'},
          {title: 'Mail Scanning', value: 'mailScanning'},
          {title: 'Parking', value: 'parking'},
          {title: 'ADA Accessibility', value: 'adaAccessibility'},
        ],
      },
    }),

  ],
  
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'city',
    },
  },
})
