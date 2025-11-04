import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'
 
export const operatorsignupType = defineType({
name: 'operatorsignup',
  title: 'Operator SignUp',
  type: 'object',
  icon: DocumentIcon,
   fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
  { type: 'affiliateProgramSection' },    
  { type: 'whyJoinSection' }, 
  { type: 'operatorYourCompetitors' },  
   { type: 'howitworks3steps' },  
    {type: 'operatorSignupVideo'}, 
      {type: 'businessAtFingertips'},  
       {type: 'whyBusinessChooseUs'}, 
         {type: 'joinTeamSection'}, 
          {type: 'testimonial'}, 
          {type: 'operatorOurAdvantage'}, 
          
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Operator SignUp',
      }
    },
  },
})