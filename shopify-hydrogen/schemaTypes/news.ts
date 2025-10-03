export default {
  name: 'news',
  title: 'Newsroom',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'logoImage',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'date',
      title: 'Publish Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
  ],
};
