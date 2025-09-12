import { defineField, defineType } from 'sanity'

export const plansType = defineType({
  name: 'plan',
  title: 'Plans',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'monthlyPrice',
      title: 'Monthly Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearlyPrice',
      title: 'Yearly Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'incomingMail',
      title: 'Incoming Mail',
      type: 'string',
    }),
    defineField({
      name: 'incomingMailExtraFee',
      title: 'Incoming Mail Extra Fee',
      type: 'number',
    }),
    defineField({
      name: 'openAndScan',
      title: 'Open & Scan',
      type: 'string',
    }),
    defineField({
      name: 'openAndScanExtraFee',
      title: 'Open & Scan Extra Fee',
      type: 'number',
    }),
    defineField({
      name: 'forwarding',
      title: 'Forwarding Fee',
      type: 'string',
    }),
    defineField({
      name: 'checkDeposit',
      title: 'Check Deposit',
      type: 'string',
    }),
    defineField({
      name: 'recycling',
      title: 'Recycling',
      type: 'string',
    }),
    defineField({
      name: 'shredding',
      title: 'Shredding',
      type: 'string',
    }),
    defineField({
      name: 'localPickup',
      title: 'Local Pickup',
      type: 'string',
    }),
    defineField({
      name: 'physicalStorage',
      title: 'Physical Storage',
      type: 'text',
    }),
    defineField({
      name: 'recipients',
      title: 'Recipients',
      type: 'number',
    }),
    defineField({
      name: 'recipientsExtraFee',
      title: 'Recipients Extra Fee',
      type: 'number',
    }),
    defineField({
      name: 'onlineStorage',
      title: 'Online Storage',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'monthlyPrice',
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title} Plan`,
        subtitle: `$${subtitle} / month`,
      }
    },
  },
})
