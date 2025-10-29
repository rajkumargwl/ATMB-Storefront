import {defineType, defineField} from 'sanity'

export const pdpPageModule = defineType({
  name: 'pdpPageModule',
  title: 'PDP Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [      
        {type: 'PDPDetailedFeature'},
        {type: 'PDPCommonFeatures'},
        {type:'PDPHighlights'},
        {type: 'PDPWhyChooseAnytimePhone'},
        {type: 'PDPHowItWorks'},
        {type: 'PDPIntroSection'},
        {type:'PDPTestimonials'}
      ],
    }),
  ],
  preview: {
    select: {
      modules: 'modules',
    },
    prepare(selection) {
      const {modules} = selection
      const firstModule = modules && modules.length > 0 ? modules[0]._type : 'No modules'
      const count = modules ? modules.length : 0
      return {
        title: `PDP Page Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
