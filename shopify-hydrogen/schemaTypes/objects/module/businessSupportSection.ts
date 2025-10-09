import {defineType, defineField} from 'sanity'
// import {UsersIcon} from '@sanity/icons'

export const businessSupportSection = defineType({
  name: 'businessSupportSection',
  title: 'Business Support Section',
  type: 'object',
  // icon: UsersIcon,
  fields: [
    // 👉 Section Title
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: "You're not alone.",
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Primary Description
   defineField({
      name: 'description',
      title: 'Main Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Link URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      description: 'Rich text area describing the main section content',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Secondary Paragraph
   
    // 👉 CTA Button
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Join Business Accelerator',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          validation: (Rule) => Rule.uri({
            allowRelative: true,
            scheme: ['http', 'https'],
          }),
        }),
      ],
    }),

    // 👉 Right Side Image
    defineField({
      name: 'sideImage',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Upload the image that appears on the right side (e.g., confident businessman photo with orange background).',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Background Settings
    
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'cta.label',
      media: 'sideImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Support Section',
        subtitle: subtitle ? `CTA: ${subtitle}` : 'No CTA added yet',
        media,
      }
    },
  },
})
