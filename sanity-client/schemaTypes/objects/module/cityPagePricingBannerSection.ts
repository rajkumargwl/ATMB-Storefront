import {defineType, defineField} from 'sanity'

export const cityPagePricingBannerSection = defineType({
  name: 'cityPagePricingBannerSection',
  title: 'City Page Pricing Banner Section',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Banner Text',
      type: 'string',
      description: 'Main text (e.g., "Plans start at $9.99")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text for the call-to-action button (e.g., "Get a Indiana Address")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Link for the button (e.g., /get-started or external link)',
    //   validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Person or graphic image displayed on the right side',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'text',
      media: 'image',
      subtitle: 'ctaText',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Pricing Banner Section',
        subtitle: subtitle ? `CTA: ${subtitle}` : '',
        media,
      }
    },
  },
})
