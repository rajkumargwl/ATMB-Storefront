import { defineType, defineField } from "sanity";

export const faqPageModule = defineType({
  name: "faqPageModule",
  title: "FAQ Page Module",
  type: "object",
  fields: [
    defineField({
      name: "modules",
      title: "FAQ Modules",
      type: "array",
      of: [
        { type: "faqCoverModule" }, // ✅ your FAQ schema
        { type: "faqWithCategory" }, 
      ],
    }),
  ],
  preview: {
    select: {
      modules: "modules",
    },
    prepare(selection) {
      const { modules } = selection;
      const firstModule =
        modules && modules.length > 0 ? modules[0]._type : "No modules";
      const count = modules ? modules.length : 0;

      return {
        title: `FAQ Page Module (${count} section${count !== 1 ? "s" : ""})`,
        subtitle:
          firstModule !== "No modules"
            ? `First: ${firstModule}`
            : "No FAQ sections added yet",
      };
    },
  },
});
