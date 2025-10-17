import { defineType, defineField } from 'sanity';

export const pdpFeatureGridSection = defineType({
  name: 'pdpFeatureGridSection',
  title: 'PDP  Features Grid Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main title of the section (e.g., Detailed Features)',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      description: 'Subtitle below the heading (e.g., Live Receptionist 50 Plan Features)',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      description: 'List of detailed feature items',
      of: [
        defineField({
          name: 'featureItem',
          title: 'Feature Item',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Upload or select icon for the feature',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Feature title (e.g., Unlimited Local and Long Distance Minutes)',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'icon',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subHeading',
    },
  },
});
