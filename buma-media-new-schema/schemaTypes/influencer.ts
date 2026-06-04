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
      name: 'postPricing',
      title: 'Posts & Pricing',
      type: 'array',
      description: 'Add influencer deliverables such as Instagram Story, Reel, or TikTok Post.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'pricing',
              title: 'Pricing',
              type: 'pricing',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'description'},
            prepare: ({title, subtitle}) => ({
              title: title || 'Post pricing',
              subtitle: subtitle || 'No description entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'igFollowers',
      title: 'IG Followers',
      type: 'string',
      description: 'Supports compact values like 1.2M or 4.3K.',
    }),
    defineField({
      name: 'facebookFollowers',
      title: 'Facebook Followers',
      type: 'string',
      description: 'Supports compact values like 1.2M or 4.3K.',
    }),
    defineField({
      name: 'ytSubscribers',
      title: 'YouTube Subscribers',
      type: 'string',
      description: 'Supports compact values like 1.2M or 4.3K.',
    }),
    defineField({
      name: 'ytViews',
      title: 'YouTube Views',
      type: 'string',
      description: 'Supports compact values like 1.2M or 4.3K.',
    }),
    defineField({
      name: 'tiktokFollowers',
      title: 'TikTok Followers',
      type: 'string',
      description: 'Supports compact values like 1.2M or 4.3K.',
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
  ],
})
