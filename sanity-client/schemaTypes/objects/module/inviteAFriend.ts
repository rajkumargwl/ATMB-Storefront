import { defineType, defineField } from 'sanity'

export const inviteAFriendSection = defineType({
  name: 'inviteAFriendSection',
  title: 'Invite a Friend Section',
  type: 'object',

  fields: [
    // 🏷️ Small Title / Tagline
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'Short title shown above the heading (e.g., "Invite a friend")',
    }),

    // 🧩 Main Heading
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Main promotional text (e.g., "Give $10, Get $10")',
    }),

    // 📝 Description
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description:
        'Supporting description (e.g., "Ask a friend to sign up for Anytime Mailbox and you’ll both receive a $10 Amazon Gift Card.")',
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
          description: 'E.g., "Join The Program"',
        }),
        defineField({
          name: 'url',
          title: 'Button Link',
          type: 'url',
          description: 'Where the CTA button should navigate',
        }),
      ],
    }),

    // 🖼️ Main Image / Illustration (right side)
    defineField({
      name: 'mainImage',
      title: 'Main Image / Illustration',
      type: 'image',
      options: { hotspot: true },
      description: 'The illustration image (e.g., phone, Amazon gift card, people, etc.)',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility and SEO.',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'heading',
      subtitle: 'sectionTitle',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Invite a Friend Section',
        subtitle: subtitle || 'Referral program banner with CTA',
        media,
      }
    },
  },
})
