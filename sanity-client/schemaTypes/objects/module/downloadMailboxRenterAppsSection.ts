import { defineType, defineField } from "sanity";

export const downloadMailboxRenterAppsSection = defineType({
  name: "downloadMailboxRenterAppsSection",
  title: "Download Mailbox Renter Apps Section",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: "Main heading for the section (e.g., 'Download Mailbox Renter Apps')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Section Description",
      type: "text",
      rows: 3,
      description: "Supporting text describing the app and download options.",
      validation: (Rule) => Rule.required(),
    }),
    // App Store Button
    defineField({
      name: "appStoreIcon",
      title: "App Store Icon (SVG)",
      type: "file",
      options: { accept: ".svg" },
      description: "Upload the App Store SVG icon.",
    }),
     defineField({
      name: "appalt",
      title: "Alt text for icon",
      type: "string", 
      description: "add the alt text here",
    }),
    defineField({
      name: "appStoreLink",
      title: "App Store Link",
      type: "url",
      description: "Link to the App Store download page.",
    }),
    // Google Play Button
    defineField({
      name: "googlePlayIcon",
      title: "Google Play Icon (SVG)",
      type: "file",
      options: { accept: ".svg" },
      description: "Upload the Google Play SVG icon.",
    }),
     defineField({
      name: "googlealt",
      title: "Alt text for icon",
      type: "string", 
      description: "add the alt text here",
    }),
    defineField({
      name: "googlePlayLink",
      title: "Google Play Link",
      type: "url",
      description: "Link to the Google Play Store download page.",
    }),
    // Phone Mockup
    defineField({
      name: "mockupImage",
      title: "Phone Mockup Image",
      type: "image",
      options: { hotspot: true },
      description: "Image showing the app interface on the phone screen.",
    }),
    
  ],
  preview: {
    select: {
      title: "title",
      media: "mockupImage",
    },
    prepare({ title, media }) {
      return {
        title: title || "Download Mailbox Renter Apps Section",
        media,
      };
    },
  },
});
