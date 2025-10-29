import {defineField, defineType} from 'sanity';
import {Building2} from 'lucide-react';
 
export const pdpmailCenterHighlightsSection = defineType({
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
      description: 'Upload Varified Icon here (supports .svg, .png, .jpg)',
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
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'designation',
      media: 'partnerLogos.0.logo',
    },
  },
});
 