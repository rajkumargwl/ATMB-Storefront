import {defineType, defineField} from 'sanity'
// import {SparkleIcon} from '@sanity/icons'

export const businessTransformationSection = defineType({
  name: 'businessTransformationSection',
  title: 'Business Transformation Section',
  type: 'object',
  // icon: SparkleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Change your business and your life',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'secondlinetitle',
      title: 'Section 2nd line ',
      type: 'string',
      initialValue: 'Change your business and your life',
     
    }),
    defineField({
      name: 'items',
      title: 'Transformation Cards',
      type: 'array',
      of: [
        defineField({
          name: 'card',
          title: 'Card',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              options: {accept: '.svg'},
              description: 'Upload an SVG or small image icon for this card',
            }),
            defineField({
              name: 'heading',
              title: 'Card Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }),
      ],
    }),
   
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'items.0.heading',
      media: 'items.0.icon',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Transformation Section',
        subtitle: subtitle ? `First card: ${subtitle}` : 'No cards added yet',
        media,
      }
    },
  },
})
