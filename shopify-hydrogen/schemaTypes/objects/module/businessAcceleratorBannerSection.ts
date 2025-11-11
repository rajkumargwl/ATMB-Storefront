import {defineType, defineField} from 'sanity'
// import {MegaphoneIcon} from '@sanity/icons'

export const businessAcceleratorBannerSection = defineType({
  name: 'businessAcceleratorBannerSection',
  title: 'Business Accelerator Banner Section',
  type: 'object',
  // icon: MegaphoneIcon,
  fields: [
    // 👉 Title / Headline
    defineField({
      name: 'title',
      title: 'Banner Title',
      type: 'string',
      initialValue: 'Make this your groundbreaking year',
      validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'titleline2',
      title: 'Banner Title Line 2',
      type: 'string',
      initialValue: 'Make this your groundbreaking year',
    
    }),

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
          validation: (Rule) =>
            Rule.uri({
              allowRelative: true,
              scheme: ['http', 'https'],
            }),
        }),
      ],
    }),

    // 👉 Banner Image (Right Side)
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Upload the right-side image (e.g., man holding arrow).',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Background Color
   
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'cta.label',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Accelerator Banner',
        subtitle: subtitle ? `CTA: ${subtitle}` : 'No CTA added yet',
        media,
      }
    },
  },
})
