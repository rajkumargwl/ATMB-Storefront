import {defineType, defineField} from 'sanity'

export const homeSection4 = defineType({
  name: 'homeSection4',
  title: 'Find a Anytime ',
  type: 'object',
  fields: [
    // Section heading
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),

    // Search bar
    defineField({
      name: 'searchPlaceholder',
      title: 'Search Placeholder',
      type: 'string',
    }),
    // defineField({
    //   name: 'searchActionUrl',
    //   title: 'Search Action URL',
    //   type: 'url',
    // }),
    // defineField({
    //   name: 'searchIcon',
    //   title: 'Search Icon',
    //   type: 'object',
    //   fields: [
    //     {
    //       name: 'svgFile',
    //       title: 'Upload SVG File',
    //       type: 'file',
    //       options: {accept: '.svg'},
    //     },
    //     {
    //       name: 'svgCode',
    //       title: 'SVG Code',
    //       type: 'text',
    //       rows: 4,
    //     },
    //   ],
    // }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Heading top loactions',
    }),

    // Sorting
    // defineField({
    //   name: 'sortLabel',
    //   title: 'Sort Label',
    //   type: 'string',
    // }),
    // defineField({
    //   name: 'sortOptions',
    //   title: 'Sort Options',
    //   type: 'array',
    //   of: [{type: 'string'}],
    // }),

    // View on Map button with icon
    // defineField({
    //   name: 'viewOnMapText',
    //   title: 'View on Map Button Text',
    //   type: 'string',
    //   initialValue: 'View on Map',
    // }),
    // defineField({
    //   name: 'viewOnMapIcon',
    //   title: 'View on Map Icon',
    //   type: 'object',
    //   fields: [
    //     {
    //       name: 'svgFile',
    //       title: 'Upload SVG File',
    //       type: 'file',
    //       options: {accept: '.svg'},
    //     },
    //     {
    //       name: 'svgCode',
    //       title: 'SVG Code',
    //       type: 'text',
    //       rows: 4,
    //     },
    //   ],
    //   description: 'SVG icon shown on View on Map button',
    // }),
    // defineField({
    //   name: 'viewOnMapUrl',
    //   title: 'View on Map URL',
    //   type: 'url',
    // }),

    // Browse all locations button
    // defineField({
    //   name: 'browseAllText',
    //   title: 'Browse All Locations Button Text',
    //   type: 'string',
    //   initialValue: 'Browse All Locations',
    // }),
    // defineField({
    //   name: 'browseAllUrl',
    //   title: 'Browse All Locations URL',
    //   type: 'url',
    // }),

    // 🔹 One global location icon for all items
    // defineField({
    //   name: 'locationIcon',
    //   title: 'Location Icon',
    //   type: 'object',
    //   fields: [
    //     {
    //       name: 'svgFile',
    //       title: 'Upload SVG File',
    //       type: 'file',
    //       options: {accept: '.svg'},
    //     },
    //     {
    //       name: 'svgCode',
    //       title: 'SVG Code',
    //       type: 'text',
    //       rows: 4,
    //     },
    //   ],
    //   description: 'This icon will be used for all top locations',
    // }),

    // Locations list (state removed, only city now)
    // defineField({
    //   name: 'locations',
    //   title: 'Top Locations',
    //   type: 'array',
    //   of: [
    //     defineField({
    //       name: 'locationItem',
    //       title: 'Location Item',
    //       type: 'object',
    //       fields: [
    //         {
    //           name: 'city',
    //           title: 'City',
    //           type: 'string',
    //           validation: (Rule) => Rule.required(),
    //         },
    //         {
    //           name: 'operatorCount',
    //           title: 'Number of Operators',
    //           type: 'number',
    //           validation: (Rule) => Rule.min(0),
    //         },
    //         {
    //           name: 'locationUrl',
    //           title: 'Location URL',
    //           type: 'url',
    //           description: 'Link to map or page for this location',
    //         },
    //       ],
    //       preview: {
    //         select: {
    //           title: 'city',
    //           operatorCount: 'operatorCount',
    //         },
    //         prepare({title, operatorCount}) {
    //           return {
    //             title: title,
    //             subtitle: `${operatorCount || 0} Operators`,
    //           }
    //         },
    //       },
    //     }),
    //   ],
    // }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
  },
})