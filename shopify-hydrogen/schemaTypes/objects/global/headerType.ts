import { defineType, defineField } from "sanity";
 
export const header = defineType({
  name: "header",
  title: "Header",
  type: "document",
 
  // ✅ Restrict to single doc (no create/delete, only update/publish)
//   __experimental_actions: ["update", "publish"],
 
  fields: [
    // ✅ Logo
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Spanish', value: 'en-es'},
        ],
      },
      hidden: true,
    }),
 
    // ✅ Menu with optional submenus
    defineField({
      name: "menu",
      title: "Menu",
      type: "array",
      of: [
        {
          name: "menuItem",
          title: "Menu Item",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "string" }),
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
                {
                  name: "subLink",
                  title: "Sub Link",
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string" }),
                    defineField({ name: "url", title: "URL", type: "string" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
 
    // ✅ 2 Icons
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
    defineField({
      name: "icon3",
      title: "Icon 3",
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
 
  // ✅ Preview config for Studio
  preview: {
    select: {
      media: "logo",
      login: "loginButton.label",
      getStarted: "getStartedButton.label",
      firstMenu: "menu.0.label",
    },
    prepare({ media, login, getStarted, firstMenu }) {
      return {
        title: "Header",
        subtitle: `Menu: ${firstMenu || "N/A"} | Login: ${
          login || "N/A"
        } | Get Started: ${getStarted || "N/A"}`,
        media,
      };
    },
  },
});