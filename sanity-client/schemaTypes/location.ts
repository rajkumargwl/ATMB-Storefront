import {defineType, defineField} from 'sanity'
import {PinIcon} from '@sanity/icons'

export default defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  icon: PinIcon,
  fields: [
    // ---------- Basic Info ----------
    defineField({
      name: 'locationId',
      title: 'Location ID',
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
      name: 'addressLine2',
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
      type: 'geopoint',
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

    // ---------- Plan Availability ----------
    defineField({
      name: 'planList',
      title: 'Available Plans',
      description: 'Select which plans are available at this location',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Bronze', value: 'BRONZE' },
          { title: 'Silver', value: 'SILVER' },
          { title: 'Gold', value: 'GOLD' },
          { title: 'Unlimited', value: 'UNLIMITED' },
        ],
        layout: 'tags', // Displays as tags or checkboxes in Studio
      },
    }),

    // ---------- Feature List ----------
    defineField({
      name: 'featureList',
      title: 'Feature List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Feature Item',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature Details',
              type: 'object',
              fields: [
                { name: 'feature_id', title: 'Feature ID', type: 'string' },
                { name: 'label', title: 'Label', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
                { name: 'category', title: 'Category', type: 'string' },
                { name: 'class', title: 'Class', type: 'string' },
                { name: 'status', title: 'Status', type: 'string' },
                { name: 'type', title: 'Feature Type', type: 'string' },
              ],
            }),
            { name: 'sort_order', title: 'Sort Order', type: 'number' },
            { name: 'status', title: 'Status', type: 'string' },
            {
              name: 'type',
              title: 'Plan Type',
              description: 'Select one or more plans this feature applies to',
              type: 'array',
              of: [{ type: 'string' }],
              options: {
                list: [
                  { title: 'Bronze', value: 'BRONZE' },
                  { title: 'Silver', value: 'SILVER' },
                  { title: 'Gold', value: 'GOLD' },
                  { title: 'Unlimited', value: 'UNLIMITED' },
                  { title: 'Site', value: 'SITE' },
                ],
                layout: 'checkbox', // ✅ multiple selection allowed
              },
            },
          ],
        },
      ],
    }),

    // ---------- Rating List ----------
    defineField({
      name: 'ratingList',
      title: 'Rating List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Rating Item',
          fields: [
            { name: 'rating_id', title: 'Rating ID', type: 'string' },
            { name: 'value', title: 'Value', type: 'number' },
            { name: 'sort_order', title: 'Sort Order', type: 'number' },
            { name: 'status', title: 'Status', type: 'string' },
            { name: 'type', title: 'Type', type: 'string' },
          ],
        },
      ],
    }),

    // ---------- Attribute List ----------
    defineField({
      name: 'attributeList',
      title: 'Attribute List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Attribute Item',
          fields: [
            { name: 'attribute_id', title: 'Attribute ID', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'sort_order', title: 'Sort Order', type: 'number' },
            { name: 'status', title: 'Status', type: 'string' },
            { name: 'type', title: 'Type', type: 'string' },
          ],
        },
      ],
    }),

    // ---------- Calendar List ----------
    defineField({
      name: 'calendarList',
      title: 'Calendar List',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Calendar Item',
          fields: [
            { name: 'calendar_id', title: 'Calendar ID', type: 'string' },
            { name: 'calendar_item_id', title: 'Calendar Item ID', type: 'string' },
            { name: 'day_of_the_week', title: 'Day of the Week', type: 'number' },
            { name: 'item_date', title: 'Item Date', type: 'datetime' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'time_begin', title: 'Start Time', type: 'string' },
            { name: 'time_end', title: 'End Time', type: 'string' },
            { name: 'type', title: 'Type', type: 'string' },
          ],
        },
      ],
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
