import {defineType, defineField} from 'sanity'
// import {CaseIcon} from '@sanity/icons'

export const businessGrowthToolkitSection = defineType({
  name: 'businessGrowthToolkitSection',
  title: 'Business Growth Toolkit Section',
  type: 'object',
  // icon: CaseIcon,
  fields: [
    // 👉 Section Title
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'What’s Included with our Business Growth Toolkit',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Section Subtitle / Description
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle',
      type: 'text',
      initialValue:
        'Manage your mail, packages, and calls from anywhere in the world — with the flexibility and control to fit your routine.',
      validation: (Rule) => Rule.required(),
    }),

    // 👉 Toolkit Features (Left Column)
    defineField({
      name: 'features',
      title: 'Toolkit Features',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          title: 'Feature',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Feature Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload an icon for this feature (e.g., video, webinar, playbook, checklist, etc.)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Feature Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one toolkit feature is required'),
      description:
        'Add features such as Videos, Webinars, Playbooks, Checklists, Directory, and Office Hours.',
    }),

    // 👉 Image Section (Right Side)
    defineField({
      name: 'sideImage',
      title: 'Right Side Image',
      type: 'image',
      options: {hotspot: true},
      description:
        'Upload the image displayed on the right side (e.g., mockup showing courses on laptop and mobile).',
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'features.0.title',
      media: 'sideImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Business Growth Toolkit Section',
        subtitle: subtitle ? `First Feature: ${subtitle}` : 'No features added yet',
        media,
      }
    },
  },
})
