import { defineType, defineField } from 'sanity'

export const smallBusinessOwnerPage = defineType({
  name: 'smallBusinessOwnerPage',
  title: 'Small Business Owner Page',
  type: 'object',

  fields: [
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        // Newly added sections
        { type: 'smallBusinessOwnerSection' },
        { type: 'smallBusinessChallengesSection' },
        { type: 'smartBusinessSection' },

        // Existing sections
        { type: 'businessBenefitsSection' },
        { type: 'businessIndustryRecognitionSection' },
        { type: 'businessTrustedSection' },
        { type: 'clientSuccessStoriesSection' },
        { type: 'joinCtaBannerSection' },
        { type: 'faqWithComment' },
        { type: 'plans' },
      ],
    }),
  ],

  preview: {
    select: {
      modules: 'modules',
    },
    prepare(selection) {
      const { modules } = selection
      const firstModule =
        modules && modules.length > 0 ? modules[0]._type : 'No modules'
      const count = modules ? modules.length : 0
      return {
        title: `Small Business Owner Page (${count} section${count !== 1 ? 's' : ''})`,
        subtitle:
          firstModule !== 'No modules'
            ? `First: ${firstModule}`
            : 'No sections added yet',
      }
    },
  },
})
