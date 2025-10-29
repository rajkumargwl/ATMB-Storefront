import {defineType, defineField} from 'sanity'

export const acceleratorPageModule = defineType({
  name: 'acceleratorPageModule',
  title: 'Accelerator Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        {type: 'businessAcceleratorSection'},
        {type: 'businessGrowthToolkitSection'},
        {type: 'businessProfitSection'},
        {type: 'businessStrategySection'},
        {type: 'businessSupportSection'},
        {type: 'businessTransformationSection'},
        {type: 'webinarsTopicsSection'},
        {type: 'buisnesshowitwork'},
         {type: 'businessAcceleratorBannerSection'},
        {type: 'faq'},
         {type: 'testimonial'},
        {type: 'plans'},
        
      ],
      validation: (Rule) => Rule.min(1).error('At least one module should be added to the Accelerator Page.'),
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
        title: `Accelerator Page (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
