import {defineType, defineField} from 'sanity'

export const careersPageModule = defineType({
  name: 'careersPageModule',
  title: 'Careers Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        {type: 'careerPromotionSection'}, // Hero section
        {type: 'whyWorkSection'},         // Why work here
        {type: 'aboutCompanySection'},    // About Anytime Mailbox
        {type: 'coreValuesSection'},      // Core values
        {type: 'joinTeamSection'},        // CTA join team
      ],
    }),
  ],
  preview: {
    select: {
      modules: 'modules',
    },
    prepare(selection) {
      const {modules} = selection
      const firstModule =
        modules && modules.length > 0 ? modules[0]._type : 'No modules'
      const count = modules ? modules.length : 0
      return {
        title: `Careers Page Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle:
          firstModule !== 'No modules'
            ? `First: ${firstModule}`
            : 'No sections added yet',
      }
    },
  },
})
