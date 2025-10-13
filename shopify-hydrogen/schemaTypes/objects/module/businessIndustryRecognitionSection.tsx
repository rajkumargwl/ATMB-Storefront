import {defineType, defineField} from 'sanity'

export const businessIndustryRecognitionSection = defineType({
  name: 'businessIndustryRecognitionSection',
  title: 'Business Industry Recognition Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Example: "Industry Recognition"',
      validation: (Rule) => Rule.required(),
    }),

    // 🏆 Awards & Certificates
    defineField({
      name: 'awards',
      title: 'Awards & Certificates',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Award Item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Award Icon (SVG supported)',
              type: 'image',
              description: 'Upload the award or certificate icon (supports .svg)',
              options: {hotspot: true},
            }),
            defineField({
              name: 'title',
              title: 'Award Title',
              type: 'string',
              description: 'Example: "Best SMB Tool 2024"',
            }),
            defineField({
              name: 'subTitle',
              title: 'Award Sub Title',
              type: 'string',
              description: 'Example: "Business Tech Awards"',
            }),
          ],
        },
      ],
    }),

    // 📰 Media & Press Coverage
    defineField({
      name: 'mediaCoverage',
      title: 'Media & Press Coverage',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Media Coverage Item',
          fields: [
            defineField({
              name: 'logo',
              title: 'Media Logo (SVG supported)',
              type: 'image',
              description: 'Upload the logo of the media publication (e.g., Forbes, TechCrunch)',
              options: {hotspot: true},
            }),
            defineField({
              name: 'link',
              title: 'Media Website Link',
              type: 'url',
              description: 'Optional link to the media article or publication site',
            }),
          ],
        },
      ],
    }),

    // 🤝 Industry Partnerships
    defineField({
      name: 'industryPartners',
      title: 'Industry Partnerships',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Industry Partner Item',
          fields: [
            defineField({
              name: 'logo',
              title: 'Partner Logo (SVG supported)',
              type: 'image',
              description: 'Upload the partner’s logo (supports .svg)',
              options: {hotspot: true},
            }),
            defineField({
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              description: 'Example: "Annex Brands"',
            }),
            defineField({
              name: 'link',
              title: 'Partner Website Link',
              type: 'url',
              description: 'Optional partner website link',
            }),
          ],
        },
      ],
    }),
  ],
})
