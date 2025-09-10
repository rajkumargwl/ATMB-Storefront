// ./schemas/modules/review.ts
import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons"; // 👈 You can change the icon if you want

export const review = defineType({
  name: "review",
  title: "Customer Reviews",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      initialValue: "Thousand trust Anytime Mailbox",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "See What Our Customers Are Saying",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        defineField({
          name: "reviewItem",
          title: "Review Item",
          type: "object",
          fields: [
            {
              name: "authorImage",
              title: "Author Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "rating",
              title: "Rating",
              type: "number",
              validation: (Rule) => Rule.min(0).max(5),
            },
            {
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 4,
            },
            {
              name: "authorName",
              title: "Author Name",
              type: "string",
            },
            {
              name: "authorTitle",
              title: "Author Title / Role",
              type: "string",
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "badge",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Customer Reviews",
        subtitle: subtitle || "Reviews module",
      };
    },
  },
});
