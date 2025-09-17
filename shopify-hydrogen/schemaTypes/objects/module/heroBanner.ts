import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const heroBanner = defineType({
  name: "heroBanner",
  title: "Hero Banner",
  type: "object",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading (e.g., Run Your Business From Anywhere.)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlightedWord",
      title: "Highlighted Word",
      type: "string",
      description: "Word inside the title that should be highlighted (e.g., Business)",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Supporting text under the heading.",
    }),
    // Search Bar
    defineField({
      name: "searchPlaceholder",
      title: "Search Placeholder",
      type: "string",
      initialValue: "Address, City or Zip Code...",
    }),
    defineField({
      name: "searchButtonText",
      title: "Search Button Text",
      type: "string",
      initialValue: "Search",
    }),
    // Trusted By Section
    defineField({
      name: "trustedText",
      title: "Trusted Text",
      type: "string",
      initialValue: "Trusted by over 10,000+ professionals",
    }),
    defineField({
      name: "trustedAvatars",
      title: "Trusted Avatars",
      type: "array",
      of: [{ type: "image" }],
      options: { hotspot: true },
    }),
    // Features List
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        defineField({
          name: "feature",
          title: "Feature",
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "image",
              description: "Feature icon",
              options: { hotspot: true },
            },
            {
              name: "title",
              title: "Title",
              type: "string",
              description: "Feature title (e.g., Real Street Addresses)",
            },
          ],
        }),
      ],
    }),
    // Right Side Images
    defineField({
      name: "rightImages",
      title: "Right Side Images",
      type: "array",
      of: [
        defineField({
          name: "imageBlock",
          title: "Image Block",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "overlayText",
              title: "Overlay Text",
              type: "string",
              description: "Optional floating text (e.g., Your Cheques is cleared successfully)",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "rightImages.0.image",
    },
  },
});
