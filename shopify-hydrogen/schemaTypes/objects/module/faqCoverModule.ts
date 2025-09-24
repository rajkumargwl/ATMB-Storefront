import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqCoverModule = defineType({
  name: "faqCoverModule",
  title: "FAQ Cover Module",
  type: "object",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "label",
      title: "Section Label",
      type: "string",
      description: "Small label above the heading (e.g., Mailbox Renter FAQ’s)",
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description:
        "Main title (e.g., Everything you need to know about using our service, explained plainly.)",
      validation: (Rule) => Rule.required(),
    }),
  
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description: "Upload an image for the FAQ cover (e.g., book with FAQ).",
    }),
    
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
      media: "image",
    },
  },
});
