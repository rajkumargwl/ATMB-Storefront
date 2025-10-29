import { defineField, defineType } from 'sanity'


export const renterReferralBannerModule =  defineType({
  name: 'renterReferralBannerModule',
  title: 'Renter Referral Banner Module',
  type: 'document',
 
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Heading text displayed on the banner (e.g., "No catch, just a happy chain of paying goodness forward.")',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text to display inside the button (e.g., "Join The Program")',
    }),

    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'URL the button should link to (e.g., signup or referral link)',
    }),

   
    defineField({
      name: 'image',
      title: 'Right Side Image',
      type: 'image',
      description: 'Upload the banner image shown on the right (e.g., mobile mockup or illustration)',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
 
      ],

  preview: {
    select: {
      title: 'sectionTitle',
      media: 'image',
      subtitle: 'buttonText',
    },
    prepare({ title, media, subtitle }) {
      return {
        title: title || 'Referral Banner Section',
        subtitle: subtitle ? `Button: ${subtitle}` : 'No button set',
        media,
      }
    },
  },
})
