import {defineField, defineType} from 'sanity';
import {Building2} from 'lucide-react';

export  const pdpmailCenterHighlightsSection =  defineType({
  name: 'pdpmailCenterHighlightsSection',
  title: 'Mail Center Highlights Section',
  type: 'object',
  icon: Building2,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      description: 'e.g., Infinity Diagnostics Services',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'isVerified',
      title: 'Verified Badge',
      type: 'boolean',
      description: 'Enable if this company is verified (blue tick).',
      initialValue: true,
    }),
    defineField({
          name: 'icon',
          title: 'Varified Icon',
          type: 'image',
          options: {hotspot: true},
          description: 'Upload  Varified Icon here (supports .svg, .png, .jpg)',
        }),

    defineField({
      name: 'designation',
      title: 'Subtitle / Designation',
      type: 'string',
      description: 'e.g., Mail Center Operator',
    }),

    defineField({
      name: 'partnerLogos',
      title: 'Courier / Partner Logos',
      type: 'array',
      description: 'Upload courier partner logos like USPS, FedEx, UPS, DHL.',
      of: [
        defineField({
          name: 'logo',
          title: 'Logo',
          type: 'image',
          options: {hotspot: true},
          description: 'Upload courier company logo (supports .svg, .png, .jpg)',
        }),
      ],
    }),

    defineField({
      name: 'highlightsTitle',
      title: 'Highlights Title',
      type: 'string',
      description: 'Title for the highlights section (e.g., Location Key Highlights)',
      initialValue: 'Location Key Highlights',
    }),

    defineField({
      name: 'highlights',
      title: 'Key Highlights',
      type: 'array',
      description: 'List of location highlights like Parking, 24/7 Access, etc.',
      of: [
        defineField({
          name: 'highlight',
          title: 'Highlight',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'companyName',
      subtitle: 'designation',
      media: 'partnerLogos.0.logo',
    },
  },
});
