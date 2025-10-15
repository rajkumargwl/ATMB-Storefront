import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
 
export const builtForHowYouWorkToday = defineType({
  name: 'builtForHowYouWorkToday',
  title: 'Built for How You Work Today',
  type: 'object',
  icon: DocumentIcon, // ✅ now valid
  fields: [
    // Top Section
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    
    }),
 
    // Tabs (Industries / Use Cases)
    defineField({
      name: 'tabs',
      title: 'Industries / Use Cases Tabs',
      type: 'array',
      of: [
        defineField({
          name: 'tab',
          title: 'Tab',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Tab Icon',
              type: 'image',
              options: { accept: '.svg,.png' },
            }),
              defineField({
                      name: 'tooltip',
                      title: 'Tool Tip',
                      type: 'string',
                    }),
            defineField({
              name: 'label',
              title: 'Tab Label',
              type: 'string',
            }),
 
            // Right Side Content
            defineField({
              name: 'avatars',
              title: 'Avatars',
              type: 'array',
              of: [{ type: 'image' }],
              description: 'Upload avatar images (e.g. people icons)',
            }),
            defineField({
              name: 'sideText',
              title: 'Side Text',
               type: "array",
              of: [{ type: "block" }],
              description: 'E.g. Includes: Remote Workers, Digital Nomads...',
            }),
            defineField({
              name: 'detailsHeading',
              title: 'Details Heading',
              type: 'string',
              description: 'Heading shown in the right content area',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [
                defineField({
                  name: 'feature',
                  title: 'Feature',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'icon',
                      title: 'Feature Icon',
                      type: 'image',
                      options: { accept: '.svg,.png' },
                    }),
                    defineField({
                      name: 'tooltip',
                      title: 'Tool Tip',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Feature Description',
                      type: 'text',
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
 