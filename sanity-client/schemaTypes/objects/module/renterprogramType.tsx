import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const renterreferralprogramType = defineType({
  name: 'renterreferralprogram',
  title: 'Renter Referral Program',
  type: 'object',
  icon: DocumentIcon,
   fields: [
    defineField({
      name: 'modules',
      type: 'array',
      of: [
      
       
       { type: 'inviteAFriendSection' },
         { type: 'referralStep' }, 
         { type: 'renterReferralBannerModule' }, 
        { type: 'renterEditor' }, 
         { type: 'renterReferralBannerBottomModule' }, 
       

      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Renter Referral Program',
      }
    },
  },
})