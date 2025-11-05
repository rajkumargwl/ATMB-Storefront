import {defineType, defineField} from 'sanity'
// import {RocketIcon} from '@sanity/icons'

export const businessAcceleratorSection = defineType({
  name: 'businessAcceleratorSection',
  title: 'Business Accelerator Section',
  type: 'object',
  // icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Accelerate your path to business success',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description: 'Words to highlight in color ',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      initialValue:
        'A curated community to give you the guidance and knowledge to make record profits this year.',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Join for $9/month',
        }),
        defineField({
  name: 'buttonLink',
  title: 'Button URL',
  type: 'string',
  description: 'Enter full or relative link',
})
      ],
    }),
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Upload the image displayed beside the text (e.g., business meeting or growth chart)',
      validation: (Rule) => Rule.required(),
    }),
  
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'cta.label',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Accelerator Section',
        subtitle: subtitle ? `CTA: ${subtitle}` : 'No CTA added',
        media,
      }
    },
  },
})
