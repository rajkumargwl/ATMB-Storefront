import {defineType, defineField} from 'sanity'

export const marketPlaceModule = defineType({
  name: 'marketPlaceModule',
  title: 'Marketplace Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        {type: 'marketPlaceIntroSection'},  
        {type: 'marketPlaceCategoriesSection'},          
        
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
        title: `Marketplace Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
