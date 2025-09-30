import {defineType, defineField} from "sanity"
import {UserIcon} from "@sanity/icons"

export const founderModule = defineType({
  name: "founderModule",
  title: "Founder Module",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Main title for the founder page (e.g., 'Our Founder')."
    }),
    defineField({
      name: "founders",
      title: "Founders",
      type: "array",
      of: [
        {
          type: "object",
          name: "founder",
          title: "Founder",
          fields: [
            defineField({
              name: "name",
              title: "Full Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              options: {
                source: "name",
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "role",
              title: "Role / Designation",
              type: "string",
              description: "e.g. CEO & Co-founder",
            }),
            defineField({
              name: "profileImage",
              title: "Profile Image",
              type: "image",
              options: {hotspot: true},
            }),
            defineField({
              name: "shortBio",
              title: "Short Bio",
              type: "text",
              rows: 3,
              description: "Brief description of the founder."
            }),
            defineField({
              name: "longBio",
              title: "Detailed Bio",
              type: "array",
              of: [{type: "block"}],
              description: "Full biography / story of the founder."
            }),
            defineField({
              name: "socialLinks",
              title: "Social Links",
              type: "object",
              fields: [
                {
                  name: "linkedin",
                  title: "LinkedIn",
                  type: "url",
                },
                {
                  name: "twitter",
                  title: "Twitter",
                  type: "url",
                },
                {
                  name: "website",
                  title: "Personal Website",
                  type: "url",
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
})
