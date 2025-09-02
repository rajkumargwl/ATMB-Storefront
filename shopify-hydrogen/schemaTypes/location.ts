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
      of: [{type: 'string'}],
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
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'city',
    },
  },
})
