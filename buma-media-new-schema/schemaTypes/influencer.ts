import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'influencer',
  title: 'Influencer',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'igFollowers',
      title: 'IG Followers',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'facebookFollowers',
      title: 'Facebook Followers',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'ytSubscribers',
      title: 'YouTube Subscribers',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'ytViews',
      title: 'YouTube Views',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'tiktokViews',
      title: 'TikTok Views',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Mega', value: 'mega'},
          {title: 'Macro', value: 'macro'},
          {title: 'Micro', value: 'micro'},
          {title: 'Nano', value: 'nano'},
        ],
      },
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'pricing',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
