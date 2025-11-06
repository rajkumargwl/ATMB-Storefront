import {defineType, defineField} from 'sanity'

export const businessTrustedSection =  defineType({
  name: 'businessTrustedSection',
  title: 'Business Trusted Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      description: 'Example: "Trusted by Businesses Around the World"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subHeading',
      title: 'Sub Heading / Tagline',
      type: 'string',
      description: 'Example: "15+ Years powering virtual operations"',
    }),
     defineField({
      name: 'highlightedWord',
      title: 'Highlighted Word',
      type: 'string',
     
    }),

    // ⭐ Rating Section
    defineField({
      name: 'ratings',
      title: 'Ratings',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Rating',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (SVG supported)',
              type: 'image',
              description: 'Upload a rating source logo like Google or Shopper Approved (supports .svg)',
              options: {hotspot: true},
            }),
            defineField({
              name: 'ratingnum',
              title: 'Rating Number',
              type: 'string',
             
            }),
            defineField({
              name: 'ratingText',
              title: 'Rating Text',
              type: 'string',
              description: 'Example: "4.5/5 on Google Review"',
            }),
          ],
        },
      ],
    }),

    // 🎥 Video Testimonial
    defineField({
      name: 'testimonialVideo',
      title: 'Testimonial Video',
      type: 'object',
      fields: [
        defineField({
          name: 'thumbnail',
          title: 'Video Thumbnail Image',
          type: 'image',
          description: 'Upload the image that appears before playing the video',
          options: {hotspot: true},
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'Link to video (YouTube, Vimeo, etc.)',
        }),
        defineField({
          name: 'playIcon',
          title: 'Play Button Icon (SVG supported)',
          type: 'image',
          description: 'Upload an SVG icon for the play button overlay',
          options: {hotspot: true},
        }),
        defineField({
          name: 'ratingBadge',
          title: 'Customer Rating Badge',
          type: 'string',
          description: 'Example: "4.5"',
        }),
        defineField({
          name: 'customerImage',
          title: 'Customer Image',
          type: 'image',
          description: 'Profile image of the customer providing testimonial',
          options: {hotspot: true},
        }),
        defineField({
          name: 'customerName',
          title: 'Customer Name',
          type: 'string',
          description: 'Example: "Albert Flores"',
        }),
        defineField({
          name: 'customerRole',
          title: 'Customer Role / Company',
          type: 'string',
          description: 'Example: "E-Commerce Entrepreneur (Zorio Enterprises)"',
        }),
      ],
    }),

    // 💼 Proven Results Section
    defineField({
      name: 'provenResults',
      title: 'Proven Results',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Result Item',
          fields: [
       
            defineField({
              name: 'title',
              title: 'Result Title',
              type: 'string',
              description: 'Example: "Saved $1,200/month in office costs"',
            }),
            defineField({
              name: 'description',
              title: 'Result Description',
              type: 'text',
              description:
                'Example: "Albert was able to eliminate her expensive downtown office by using Anytime Mailbox’s virtual address and mail services..."',
            }),
          ],
        },
      ],
    }),
  ],
})
