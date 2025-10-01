import {defineType, defineField} from 'sanity'

export const solutionPageModule = defineType({
  name: 'solutionPageModule',
  title: 'Solution Page Module',
  type: 'object',
  fields: [
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {type: 'solutionHeroModule'},                 // Hero Section
        {type: 'solutionVirtualMailboxModule'},       // Virtual Mailbox Overview
        {type: 'solutionRealLife'},             // Real Life Example / Stories
        {type: 'solutionMailboxFeaturesModule'},      // Features
        {type: 'solutionMailboxBenefitFaqModule'},    // Benefits + FAQ
        {type: 'solutionMailboxLocationHowItWorksModule'},
        {type: 'faq'},
         {type: 'plans'},
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
        title: `Solution Page Module (${count} section${count !== 1 ? 's' : ''})`,
        subtitle:
          firstModule !== 'No modules'
            ? `First: ${firstModule}`
            : 'No sections added yet',
      }
    },
  },
})
