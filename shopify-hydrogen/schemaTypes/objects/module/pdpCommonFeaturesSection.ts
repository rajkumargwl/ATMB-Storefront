import { defineType, defineField } from 'sanity';

export const pdpCommonFeaturesSection = defineType({
  name: 'pdpCommonFeaturesSection',
  title: 'PDP Common Features Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading for the section (e.g., Common Features)',
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading',
      type: 'string',
      description: 'Subtitle under the heading (e.g., Extra Features Available For All Plans)',
    }),
    defineField({
      name: 'featureCategories',
      title: 'Feature Categories',
      type: 'array',
      of: [
        defineField({
          name: 'featureCategory',
          title: 'Feature Category',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Upload or select an icon for the category',
              options: { hotspot: true },
            }),
            defineField({
              name: 'categoryTitle',
              title: 'Category Title',
              type: 'string',
              description: 'Title of the category (e.g., Call Handling & Routing)',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineField({
                  name: 'feature',
                  title: 'Feature',
                  type: 'string',
                  description: 'Single feature item text (e.g., Call Screening / Attended Transfer)',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'categoryTitle',
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
