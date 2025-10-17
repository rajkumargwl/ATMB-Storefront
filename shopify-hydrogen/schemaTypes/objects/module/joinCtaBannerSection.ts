import { defineType, defineField } from 'sanity'


export const joinCtaBannerSection = defineType({
  name: 'joinCtaBannerSection',
  title: 'Join CTA Banner Section',
  type: 'object',
 

  fields: [
 

    // 🧩 Main Content
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'text',
      rows: 2,
      description: 'Main title (e.g., "Join 25,000+ satisfied small business owners today.")',
    }),
    defineField({
      name: 'subText',
      title: 'Sub Text',
      type: 'string',
      description: 'Short supporting line (e.g., "30-day money-back guarantee. No risk.")',
    }),

    // 🔘 CTA Button
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          description: 'E.g., "Get Started Today"',
        }),
        defineField({
          name: 'url',
          title: 'Button Link',
          type: 'url',
          description: 'Where the CTA button should navigate',
        }),
      ],
    }),

    // 👤 Notification (small bottom-left info)
    defineField({
      name: 'notification',
      title: 'Recent Signup Notification',
      type: 'object',
      fields: [
        defineField({
          name: 'avatar',
          title: 'User Avatar',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'text',
          title: 'Notification Text',
          type: 'string',
          description: 'E.g., "David from Miami just signed up 2 minutes ago."',
        }),
      ],
    }),

    // 🖼️ Side Image (the person holding phone)
    defineField({
      name: 'sideImage',
      title: 'Side Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image displayed on the right side of the banner',
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      media: 'sideImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Join CTA Banner Section',
        subtitle: 'Call-to-action with image and signup notification',
        media,
      }
    },
  },
})
