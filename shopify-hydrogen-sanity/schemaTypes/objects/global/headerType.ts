import { defineType, defineField } from "sanity";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "menu",
      title: "Menu",
      type: "array",
      of: [
        defineType({
          name: "menuItem",
          title: "Menu Item",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({
              name: "hasSubmenu",
              title: "Has Submenu?",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "subMenu",
              title: "Sub Menu",
              type: "array",
              hidden: ({ parent }) => !parent?.hasSubmenu,
              of: [
                defineType({
                  name: "subLink",
                  title: "Sub Link",
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "url", title: "URL", type: "url" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // ✅ 2 Icon fields
    defineField({
      name: "icon1",
      title: "Icon 1",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "icon2",
      title: "Icon 2",
      type: "image",
      options: { hotspot: true },
    }),

    // ✅ Login button
    defineField({
      name: "loginButton",
      title: "Login Button",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "link", type: "url", title: "Link" }),
      ],
    }),

    // ✅ Get Started button
    defineField({
      name: "getStartedButton",
      title: "Get Started Button",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "link", type: "url", title: "Link" }),
      ],
    }),
  ],

  preview: {
    select: {
      media: "logo",
      login: "loginButton.label",
      getStarted: "getStartedButton.label",
    },
    prepare({ media, login, getStarted }) {
      return {
        title: "Header",
        subtitle: `Login: ${login || "N/A"} | Get Started: ${getStarted || "N/A"}`,
        media,
      };
    },
  },
});
