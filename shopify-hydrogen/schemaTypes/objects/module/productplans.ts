import {defineType, defineField} from 'sanity'


export const productplans = defineType({
  name: 'productplans',
  title: 'Has Plans Section',
  type: 'object',
 
  fields: [
    defineField({
      name: 'enablePlansSection',
      title: 'Has Plans Section',
      type: 'boolean',
      description: 'Enable this to display the Plans section on the Product Detail Page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      enabled: 'enablePlansSection',
    },
    prepare({enabled}) {
      return {
        title: 'Has Plans Section',
        subtitle: enabled ? 'Enabled' : 'Disabled',
      
      }
    },
  },
})
