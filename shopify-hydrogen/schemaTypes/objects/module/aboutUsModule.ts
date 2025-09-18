import {defineType, defineField} from 'sanity'

export const aboutUsModule = defineType({
  name: 'aboutUsModule',
  title: 'About Us Module',
  type: 'object',
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'aboutIntroSection'},          // 1st
        {type: 'aboutHowItStartedSection'},   // 2nd
        {type: 'aboutFeaturesSection'},       // 3rd
        {type: 'aboutDetailedFeaturesSection'},// ✅ 4th
        {type: 'aboutFoundersSection'},
        {type: 'aboutResourceAuthorsSection'}
      ],
    }),
  ],
})
