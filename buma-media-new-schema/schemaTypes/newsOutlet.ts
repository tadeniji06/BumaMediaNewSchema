import {defineType, defineField, defineArrayMember} from 'sanity'

// ─── Dropdown options ──────────────────────────────────────────────────────────

const categoryOptions = [
  {title: 'Print', value: 'print'},
  {title: 'Online / Digital', value: 'online_digital'},
  {title: 'TV News', value: 'tv_news'},
  {title: 'Radio News', value: 'radio_news'},
]

// ─── News Outlet document ──────────────────────────────────────────────────────

export default defineType({
  name: 'newsOutlet',
  title: 'News Outlet',
  type: 'document',
  fields: [
    // ── Outlet identity ───────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'News Outlet Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: categoryOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reach',
      title: 'Reach / Readership',
      type: 'number',
      description: 'Estimated audience or readership size',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Regions or locations covered by the outlet, e.g. National, Lagos',
    }),

    // ── Placements & Pricing ──────────────────────────────────────────────────
    defineField({
      name: 'placements',
      title: 'Placements & Pricing',
      type: 'array',
      description:
        'Add placement types (e.g. Front Page Ad, Banner Ad, Sponsored Article) with descriptions and prices.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Placement Name',
              type: 'string',
              description: 'e.g. Front Page Ad, Half Page, Banner, Sponsored Article',
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
            select: {title: 'name', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Placement',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),
  ],
})
