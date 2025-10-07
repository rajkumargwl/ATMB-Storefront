import {defineType, defineField} from 'sanity'

export const affiliatedProgramPageModule = defineType({
  name: 'affiliatedProgramPageModule',
  title: 'Affiliated Program Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {type: 'affiliateProgramSection'}, // Hero / Promotion
        {type: 'whyJoinSection'},          // Why Join?
        {type: 'stepsSection'},            // Steps with icons
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
        title: `Affiliate Program Page Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle:
          firstModule !== 'No modules'
            ? `First: ${firstModule}`
            : 'No sections added yet',
      }
    },
  },
})
