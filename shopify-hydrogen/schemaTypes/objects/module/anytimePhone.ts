import {defineType, defineField} from 'sanity'

export const anytimePhone = defineType({
  name: 'anytimePhone',
  title: 'Anytime Phone Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        {type: 'solutionHeroModule'},
        {type: 'businessAcceleratorBannerSection'},
        {type: 'faq'},
        {type: 'testimonial'},
        {type: 'buisnesshowitwork'},
        {type: 'businessTransformationSection'},
        {type: 'plans'},
        {type: 'noOfficeSection'},
         {type: 'featuresSection'},
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
        title: `Anytime Phone  Page (${count} section${count !== 1 ? 's' : ''})`,
        subtitle: firstModule !== 'No modules' ? `First: ${firstModule}` : 'No sections added yet',
      }
    },
  },
})
