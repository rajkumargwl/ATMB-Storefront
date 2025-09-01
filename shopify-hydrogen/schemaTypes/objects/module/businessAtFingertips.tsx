import {defineType, defineField} from 'sanity'

export const businessAtFingertips = defineType({
  name: 'businessAtFingertips',
  title: 'Your Business - Mobile/Desktop App',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
    }),
    defineField({
      name: 'phoneImage',
      title: 'Phone Mockup Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // 👥 User Personas
    defineField({
      name: 'personas',
      title: 'User Personas',
      type: 'array',
      of: [
        defineField({
          name: 'persona',
          title: 'Persona',
          type: 'object',
          fields: [
            { name: 'authorImage', title: 'Author Image (SVG/PNG)', type: 'image', options: { hotspot: true } },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'string' },
          ],
        }),
      ],
    }),

    // 📋 Features
    defineField({
      name: 'features',
      title: 'App Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (SVG Upload / Code)',
              type: 'object',
              fields: [
                { name: 'iconFile', title: 'SVG File', type: 'file', options: { accept: '.svg' } },
                { name: 'iconCode', title: 'SVG Code', type: 'text' },
              ],
            },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        }),
      ],
    }),

    // 📲 App Store Buttons
    defineField({
      name: 'appButtons',
      title: 'App Store Buttons',
      type: 'array',
      of: [
        defineField({
          name: 'button',
          title: 'Button',
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
            {
              name: 'icon',
              title: 'Store Icon (SVG Upload / Code)',
              type: 'object',
              fields: [
                { name: 'iconFile', title: 'SVG File', type: 'file', options: { accept: '.svg' } },
                { name: 'iconCode', title: 'SVG Code', type: 'text' },
                { name: 'textColor', title: 'Text Color', type: 'color' },
                { name: 'bgColor', title: 'Background Color', type: 'color' },
              ],
            },
          ],
        }),
      ],
    }),

    // ⭐ Social Proof (simplified rating system)
    defineField({
      name: 'socialProof',
      title: 'Social Proof',
      type: 'object',
      fields: [
        defineField({
          name: 'rating',
          title: 'Star Rating',
          type: 'number',
          validation: (Rule) => Rule.min(1).max(5),
        }),
        defineField({
          name: 'starIcon',
          title: 'Star Icon (SVG Upload/Code)',
          type: 'object',
          fields: [
            { name: 'svgFile', title: 'SVG File', type: 'file', options: { accept: '.svg' } },
            { name: 'svgCode', title: 'SVG Code (Inline SVG)', type: 'text' },
          ],
        }),
        defineField({
          name: 'text',
          title: 'Text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'phoneImage',
    },
  },
})