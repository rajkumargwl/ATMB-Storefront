import {defineType, defineField} from 'sanity'

export const cityPageModule = defineType({
  name: 'cityPageModule',
  title: 'City Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        {type: 'cityPageIntroSection'}, 
        {type: 'cityPageAdvantagesSection'},
        {type: 'cityPageVideoSection'},
        {type: 'cityPageVirtualMailboxSection'},
        {type: 'testimonial'},        
        {type: 'cityPagePricingBannerSection'},
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
        title: `City Page Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
