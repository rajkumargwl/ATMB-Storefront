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
        {type: 'aboutIntroSection'},          
        {type: 'aboutHowItStartedSection'},   
        {type: 'aboutFeaturesSection'},       
        {type: 'aboutDetailedFeaturesSection'},
        {type: 'aboutFoundersSection'},
        {type: 'aboutResourceAuthorsSection'},
        {type: 'coreValuesSection'}, 
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
        title: `About Us Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
