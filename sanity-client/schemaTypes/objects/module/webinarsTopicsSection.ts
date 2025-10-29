import {defineType, defineField} from 'sanity'
// import {BookIcon} from '@sanity/icons'

export const webinarsTopicsSection = defineType({
  name: 'webinarsTopicsSection',
  title: 'Webinars on Various Topics Section',
  type: 'object',
  // icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Webinars on Various Topics',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      initialValue:
        'Learn directly from experts every month with practical sessions on multiple topics.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [
        defineField({
          name: 'topic',
          title: 'Topic Card',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Topic Icon',
              type: 'image',
              options: {hotspot: true},
              description: 'Upload an icon representing this topic (e.g., marketing, security, etc.)',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Topic Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'points',
              title: 'Key Points',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Add multiple points related to this topic (e.g., SEO, Social Media Strategy)',
              validation: (Rule) => Rule.min(1).required(),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'points',
              media: 'icon',
            },
            prepare({title, subtitle, media}) {
              return {
                title,
                subtitle: subtitle ? `${subtitle.length} points` : 'No points added',
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).error('At least one topic card is required'),
      description: 'Add topic cards like “Marketing and Optimization”, “Business Development and Technology”, “Security and Privacy”.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Webinars on Various Topics Section',
        subtitle: subtitle,
      }
    },
  },
})
