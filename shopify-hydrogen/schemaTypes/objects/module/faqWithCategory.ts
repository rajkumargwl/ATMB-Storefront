import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqWithCategory = defineType({
  name: "faqWithCategory",
  title: "FAQ Module with Category",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "categories",
      title: "FAQ Categories",
      type: "array",
      of: [
        defineField({
          name: "faqCategory",
          title: "FAQ Category",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Category Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description:
                "Category name (e.g., Account, Mail Handling, Payments & Plans).",
            }),
            defineField({
              name: "faqs",
              title: "FAQs",
              type: "array",
              of: [
                defineField({
                  name: "faqItem",
                  title: "FAQ Item",
                  type: "object",
                  fields: [
                    defineField({
                      name: "question",
                      title: "Question",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "answer",
                      title: "Answer",
                      type: "text",
                      rows: 3,
                      description: "Answer to the question.",
                    }),
                  ],
                  preview: {
                    select: {
                      title: "question",
                      subtitle: "answer",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "faqs.0.question",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      categories: "categories",
    },
    prepare({ categories }) {
      return {
        title: "FAQ Module with Category",
        subtitle: categories
          ? `${categories.length} category${categories.length > 1 ? "ies" : "y"}`
          : "No categories yet",
      };
    },
  },
});
