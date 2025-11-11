import {defineType, defineField} from 'sanity'

export const solutionHeroModule = defineType({
  name: 'solutionHeroModule',
  title: 'Solution Hero Module',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: "Main headline text (e.g. 'Access Your Postal Mail from Anywhere')",
    }),
    defineField({
      name: 'headingLine2',
      title: 'Heading Line 2',
      type: 'string',
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      description: "Highlighted part of heading (e.g. 'Instantly and Securely')",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Supporting text under the heading',
    }),
    defineField({
      name: 'cta',
      title: 'CTA Button',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Get Started',
        }),
        defineField({
          name: 'url',
          title: 'Button URL',
          type: 'url',
          description: 'Where the button should link',
        }),
        defineField({
          name: 'variant',
          title: 'Button Style',
          type: 'string',
          options: {
            list: [
              {title: 'Primary (Orange)', value: 'primary'},
              {title: 'Secondary', value: 'secondary'},
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
    defineField({
      name: 'trustSection',
      title: 'Trust Section',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Trust Text',
          type: 'string',
          initialValue: 'Trusted by over 10,000+ professionals',
        }),
        defineField({
          name: 'avatars',
          title: 'Avatars',
          type: 'array',
          of: [{type: 'image'}],
          description: 'Small profile images',
        }),
        defineField({
          name: 'licensedText',
          title: 'Licensed & Secure Text',
          type: 'string',
          initialValue: 'Licensed & Secure',
        }),
        defineField({
          name: 'licensedIcon',
          title: 'Licensed Icon',
          type: 'image',
          description: 'Upload an icon for licensed & secure',
        }),
      ],
    }),
    defineField({
      name: 'rightImage',
      title: 'Right Side Image',
      type: 'image',
      description: 'Main image on the right side of hero',
    }),

    // ✅ Fixed two overlay objects instead of array
    defineField({
      name: 'overlayOne',
      title: 'Overlay One',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Overlay Title',
          type: 'string',
          description: "e.g. 'Your Forwarding request has been submitted'",
        }),
       
        defineField({
          name: 'icon',
          title: 'Overlay Icon',
          type: 'image',
          description: 'Small icon displayed in the overlay',
        }),
      ],
    }),
    defineField({
      name: 'overlayTwo',
      title: 'Overlay Two',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Overlay Title',
          type: 'string',
          description: "e.g. 'New mail received at your address'",
        }),
        defineField({
          name: 'icon',
          title: 'Overlay Icon',
          type: 'image',
          description: 'Small icon displayed in the overlay',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
      media: 'rightImage',
    },
  },
})
