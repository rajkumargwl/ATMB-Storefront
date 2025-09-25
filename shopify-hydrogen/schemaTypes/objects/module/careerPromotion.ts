import {defineType, defineField} from 'sanity'

export const careerPromotion = defineType({
  name: 'careerPromotionSection',
  title: 'Career Promotion Section',
  type: 'object',
  fields: [
    defineField({
      name: 'smallHeading',
      title: 'Small Heading',
      type: 'string',
      description: 'E.g. Build your future with us',
    }),
    defineField({
      name: 'mainHeading',
      title: 'Main Heading',
      type: 'text',
      rows: 2,
      description: 'Main headline text (e.g., Grow your career with us ...)',
    }),
    defineField({
      name: 'highlightedWords',
      title: 'Highlighted Words',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Words you want to highlight (e.g., innovation, collaboration, growth)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description:
        'Text shown inside the CTA button (e.g., Careers at Anytime Mailbox)',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'Where the button should link to',
    }),
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: { hotspot: true },
      description: 'The image shown on the right side of the module',
    }),
  ],
  preview: {
    select: {
      title: 'mainHeading',
      media: 'image',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Career Promotion Section',
        media,
      }
    },
  },
})
