import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const marketPlaceCategoriesSection = defineType({
  name: "marketPlaceCategoriesSection",
  title: "Marketplace Categories",
  type: "object",
  fields: [
    defineField({
      name: 'allIconWhite',
      title: 'All Category Icon(SVG Code)',
      type: 'text',
    }),
    defineField({
      name: 'allIconBlack',
      title: 'All Category Black Icon(SVG Code)',
      type: 'text',
    }),
    defineField({
      name: "categories",
      title: "Marketplace Categories",
      type: "array",
      of: [
        defineField({
          name: "marketplaceCategory",
          title: "Marketplace Category",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Category Title",
              type: "string",
              validation: (Rule) => Rule.required(),
              description:
                "Category name (e.g., Account & Finance, Business registration).",
            }),
            defineField(  { name: 'iconBlack', title: 'Black Icon(SVG Code)', type: 'text' },),
            defineField(  { name: 'iconWhite', title: 'White Icon(SVG Code)', type: 'text' },),
            defineField({
              name: 'image',
              title: 'Category Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: "subcategories",
              title: "Sub Categories",
              type: "array",
              of: [
                defineField({
                  name: "subcategory",
                  title: "Marketplace Item",
                  type: "object",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                     defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                    }),
                    defineField({
                      name: 'logo',
                      title: 'Logo',
                      type: 'image',
                      options: {hotspot: true},
                    }),
                     defineField({
                      name: 'buttonText',
                      title: 'Button Text',
                      type: 'string',
                      description: 'Example: "Learn More"',
                    }),
                    defineField({
                      name: 'buttonLink',
                      title: 'Button Link',
                      type: 'url',
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      subtitle: "description",
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subcategories.0.heading",
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
        title: "Marketplace with Category",
        subtitle: categories
          ? `${categories.length} categor${categories.length > 1 ? "ies" : "y"}`
          : "No categories yet",
      };
    },
  },
});
