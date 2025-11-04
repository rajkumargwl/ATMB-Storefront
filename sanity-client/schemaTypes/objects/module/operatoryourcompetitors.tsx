import {defineField, defineType} from 'sanity'
import {SparkleIcon} from '@sanity/icons'
export const operatorYourCompetitors = defineType({
  name: 'operatorYourCompetitors',
  title: 'Operator Your Competitors',
  type: 'object',
 
  fields: [
       defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Image shown on the right side',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        }),
      ],
    }),
  
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Main heading text',
     
    }),
defineField({
  name: 'description',
  title: 'Description',
  type: 'array',
  of: [{type: 'block'}],
  description: 'Short description under the heading (Rich text supported)',
}),
    defineField({
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      description: 'Text for the call-to-action button',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'string',
      description: 'Link for the call-to-action button',
    }),
 
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'label',
      media: 'image',
    },
  },
})