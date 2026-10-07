import {defineType, defineField} from 'sanity'

const influencerCategoryOptions = [
  {title: 'Mega (1M+ Followers)', value: 'mega'},
  {title: 'Macro (100K - 1M Followers)', value: 'macro'},
  {title: 'Micro (10K - 100K Followers)', value: 'micro'},
  {title: 'Nano (1K - 10K Followers)', value: 'nano'},
]

const contentCategoryOptions = [
  {title: 'Lifestyle', value: 'lifestyle'},
  {title: 'Fashion & Style', value: 'fashion_style'},
  {title: 'Comedy & Entertainment', value: 'comedy_entertainment'},
  {title: 'Tech & Gadgets', value: 'tech_gadgets'},
  {title: 'Beauty & Skincare', value: 'beauty_skincare'},
  {title: 'Food & Culinary', value: 'food_culinary'},
  {title: 'Fitness & Wellness', value: 'fitness_wellness'},
  {title: 'Business & Finance', value: 'business_finance'},
  {title: 'Travel & Adventure', value: 'travel_adventure'},
  {title: 'Music & Art', value: 'music_art'},
  {title: 'Gaming & Esports', value: 'gaming_esports'},
  {title: 'Education & Career', value: 'education_career'},
  {title: 'Parenting & Family', value: 'parenting_family'},
]

const platformOptions = [
  {title: 'Instagram', value: 'instagram'},
  {title: 'TikTok', value: 'tiktok'},
  {title: 'YouTube', value: 'youtube'},
  {title: 'Facebook', value: 'facebook'},
  {title: 'X (formerly Twitter)', value: 'x_twitter'},
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'Snapchat', value: 'snapchat'},
  {title: 'Threads', value: 'threads'},
]

export default defineType({
  name: 'influencer',
  title: 'Influencer',
  type: 'document',
  fieldsets: [
    {name: 'identity', title: 'Influencer Profile', options: {collapsible: true, collapsed: false}},
    {name: 'metrics', title: 'Followers & Metrics', options: {collapsible: true, collapsed: false}},
    {name: 'categorization', title: 'Platforms & Categorization', options: {collapsible: true, collapsed: false}},
    {name: 'management', title: 'Management & Contact', options: {collapsible: true, collapsed: false}},
    {name: 'rateCards', title: 'Posts & Deliverables Pricing', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // ── Influencer identity ───────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Influencer Name',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      fieldset: 'identity',
      options: {hotspot: true},
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'identity',
      description: 'e.g. Lagos, Nigeria / London, UK',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'Languages spoken / content produced in (e.g. English, Pidgin, Yoruba, French)',
    }),

    // ── Followers & Metrics ───────────────────────────────────────────────────
    defineField({
      name: 'igFollowers',
      title: 'Instagram Followers',
      type: 'string',
      fieldset: 'metrics',
      description: 'Supports compact values like 1.2M or 450K.',
    }),
    defineField({
      name: 'facebookFollowers',
      title: 'Facebook Followers',
      type: 'string',
      fieldset: 'metrics',
      description: 'Supports compact values like 1.2M or 450K.',
    }),
    defineField({
      name: 'ytSubscribers',
      title: 'YouTube Subscribers',
      type: 'string',
      fieldset: 'metrics',
      description: 'Supports compact values like 1.2M or 450K.',
    }),
    defineField({
      name: 'ytViews',
      title: 'YouTube Views',
      type: 'string',
      fieldset: 'metrics',
      description: 'Supports compact values like 1.2M or 450K.',
    }),
    defineField({
      name: 'tiktokFollowers',
      title: 'TikTok Followers',
      type: 'string',
      fieldset: 'metrics',
      description: 'Supports compact values like 1.2M or 450K.',
    }),

    // ── Categorization ────────────────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Influencer Category',
      type: 'string',
      fieldset: 'categorization',
      options: {
        list: influencerCategoryOptions,
      },
    }),
    defineField({
      name: 'contentCategory',
      title: 'Content Category',
      type: 'array',
      fieldset: 'categorization',
      of: [{type: 'string'}],
      options: {
        list: contentCategoryOptions,
      },
    }),
    defineField({
      name: 'platform',
      title: 'Primary Platform(s)',
      type: 'array',
      fieldset: 'categorization',
      of: [{type: 'string'}],
      options: {
        list: platformOptions,
      },
    }),

    // ── Management & Contact ──────────────────────────────────────────────────
    defineField({
      name: 'manager',
      title: 'Manager',
      type: 'string',
      fieldset: 'management',
      description: 'Manager name or agency rep',
    }),
    defineField({
      name: 'managementTeam',
      title: 'Management Team',
      type: 'string',
      fieldset: 'management',
      description: 'Talent management agency name or team',
    }),
    defineField({
      name: 'managementEmail',
      title: 'Management Email',
      type: 'string',
      fieldset: 'management',
      description: 'Email for bookings and inquiries',
    }),

    // ── Posts & Deliverables ──────────────────────────────────────────────────
    defineField({
      name: 'postPricing',
      title: 'Posts & Pricing',
      type: 'array',
      fieldset: 'rateCards',
      description: 'Add influencer deliverables such as Instagram Story, Reel, TikTok Video, or Sponsored Post.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Deliverable Name',
              type: 'string',
              description: 'e.g. 1x Instagram Reel, 1x TikTok Post, Story Mention',
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
            select: {title: 'name', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title || 'Post pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
  ],
})
