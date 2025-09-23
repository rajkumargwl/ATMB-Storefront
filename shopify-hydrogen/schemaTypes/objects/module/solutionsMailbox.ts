import { defineType, defineField } from 'sanity'


export const solutionsMailbox = defineType({
  name: 'solutionsMailbox',
  title: 'Solutions - Mailbox',
  type: 'object',

  fields: [
   
    // 👇 Sub Modules
    defineField({
      name: 'subModules',
      title: 'Sub Modules',
      type: 'array',
      of: [         
        { type: 'prefectvirtualbox' },
         { type: 'whyBusinessChooseUs' },
         { type: 'plans' },    
          { type: 'homeSection4' },                
           { type: 'businessAtFingertips' },    
              { type: 'testimonial' },    
                { type: 'whyChooseVirtualMailbox' },
                 { type: 'faq' },  
        
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Solutions - Mailbox',
      }
    },
  },
})
