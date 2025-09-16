import {defineType, defineField} from 'sanity'

export const homeSection4 = defineType({
  name: 'homeSection4',
  title: 'Find a Virtual Mailbox',
  type: 'object',
  fields: [
    // Section heading
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),

    // Search bar placeholder
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
      initialValue: 'Search by city...',
    }),

    // Section title (e.g. "Most Popular Locations")
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Heading above the top locations list',
    }),

    // Locations list
    defineField({
      name: 'locations',
      title: 'Top Locations',
      type: 'array',
      of: [
        defineField({
          name: 'locationItem',
          title: 'Location Item',
          type: 'object',
          fields: [
            {
              name: 'city',
              title: 'City',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'state',
              title: 'State',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'operatorCount',
              title: 'Number of Operators',
              type: 'number',
              validation: (Rule) => Rule.min(0),
            },
            {
              name: 'image',
              title: 'City Image',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'locationUrl',
              title: 'Location URL',
              type: 'url',
              description: 'Link to map or detail page for this location',
            },
          ],
          preview: {
            select: {
              title: 'city',
              subtitle: 'state',
              media: 'image',
              operatorCount: 'operatorCount',
            },
            prepare({title, subtitle, media, operatorCount}) {
              return {
                title: `${title}, ${subtitle}`,
                subtitle: `${operatorCount || 0} Operators`,
                media,
              }
            },
          },
        }),
      ],
    }),

    // Browse All Locations button
    defineField({
      name: 'browseAllText',
      title: 'Browse All Locations Button Text',
      type: 'string',
      initialValue: 'Browse All Locations',
    }),
    defineField({
      name: 'browseAllUrl',
      title: 'Browse All Locations URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'title',
    },
  },
})
