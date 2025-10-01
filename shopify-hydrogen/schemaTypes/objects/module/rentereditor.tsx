import {defineType, defineField} from 'sanity'

export const renterEditor = defineType({
  name: 'renterEditor',
  title: 'Renter Editor',
  type: 'object',
  fields: [
     defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main heading text',
      
    }),
    defineField({
      name: 'terms',
      title: 'Terms & Conditions',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
