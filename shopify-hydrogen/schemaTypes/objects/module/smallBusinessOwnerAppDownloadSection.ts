import { defineType, defineField } from "sanity";
import { MobileDeviceIcon } from "@sanity/icons";

export const smallBusinessOwnerAppDownloadSection = defineType({
  name: "smallBusinessOwnerAppDownloadSection",
  title: "App Download Section",
  type: "object",
  icon: MobileDeviceIcon,

  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Main heading, e.g. 'Download Mail Center Operator Apps'",
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description:
        "Short paragraph describing the app download info, e.g. ‘We offer a mobile web and native app experience...’",
    }),

    defineField({
      name: "buttons",
      title: "App Buttons",
      type: "array",
      of: [
        defineField({
          name: "button",
          title: "Button",
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "SVG Icon",
              type: "image",
              options: { accept: ".svg" },
              description: "Upload the SVG icon for the button",
            }),
            defineField({
              name: "link",
              title: "Button Link",
              type: "url",
              description: "App store link for the button",
            }),
          ],
          preview: {
            select: {
              title: "link",
              media: "icon",
            },
            prepare({ title, media }) {
              return {
                title: title || "App Button",
                media,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),

    defineField({
      name: "image",
      title: "Right Side Image (Phone Mockup)",
      type: "image",
      description: "Upload the mockup or device image shown on the right side",
      options: { hotspot: true },
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "App Download Section",
        media,
      };
    },
  },
});
