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
      description: "Main heading (e.g., Success Is Calling — Answer with Anytime Phones)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Supporting text (e.g., Be reachable anytime, anywhere...)",
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      initialValue: "Get Started",
    }),
    defineField({
      name: "ctaUrl",
      title: "Button Link",
      type: "url",
      description: "Link for the CTA button",
    }),
    defineField({
      name: "background",
      title: "Background",
      type: "image",
      description: "Optional background image or gradient",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "background",
    },
  },
});
