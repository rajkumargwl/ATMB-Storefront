import { defineType, defineField } from "sanity";

export default defineType({
  name: "solutions",
  title: "Solutions",
  type: "document",
  fields: [
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
       
        { type: "featuresModule" },
        { type: "pricingModule" },
        { type: "extraFeatures" },
        { type: "howItWorks" },
        { type: "whyChooseAnytimePhones" },
        { type: "review" },
        { type: "faq" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Solutions", // 👈 constant document name
      };
    },
  },
});
