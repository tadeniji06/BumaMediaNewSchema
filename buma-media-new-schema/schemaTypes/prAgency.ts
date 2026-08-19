import {defineType, defineField, defineArrayMember} from 'sanity'

// ─── Dropdown options ──────────────────────────────────────────────────────────

const categoryOptions = [
  {title: 'Press Release', value: 'press_release'},
  {title: 'Media Tour', value: 'media_tour'},
  {title: 'Event PR', value: 'event_pr'},
  {title: 'Crisis Management', value: 'crisis_management'},
  {title: 'Other', value: 'other'},
]

// ─── PR Agency document ────────────────────────────────────────────────────────

export default defineType({
  name: 'prAgency',
  title: 'PR Agency',
  type: 'document',
  fields: [
    // ── Agency identity ───────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'PR Agency / Service Name',
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
      name: 'coverage',
      title: 'Coverage / Markets Served',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Regions or markets the agency serves, e.g. National, Lagos, Abuja',
    }),

    // ── Services & Pricing ────────────────────────────────────────────────────
    defineField({
      name: 'services',
      title: 'Services & Pricing',
      type: 'array',
      description:
        'Add PR services (e.g. Press Release Distribution, Media Pitching) with descriptions and prices.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Service Name',
              type: 'string',
              description: 'e.g. Press Release Distribution, Media Pitching, Influencer Liaison',
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
              title: title || 'Service',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),
  ],
})
