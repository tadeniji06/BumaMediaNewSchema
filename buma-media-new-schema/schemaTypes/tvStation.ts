import {defineType, defineField, defineArrayMember} from 'sanity'

// ─── Dropdown options ──────────────────────────────────────────────────────────

const secondsOptions = [
  {title: '15 Sec', value: '15_sec'},
  {title: '30 Sec', value: '30_sec'},
  {title: '45 Sec', value: '45_sec'},
  {title: '60 Sec', value: '60_sec'},
]

const categoryOptions = [
  {title: 'National', value: 'national'},
  {title: 'State', value: 'state'},
  {title: 'Religious', value: 'religious'},
  {title: 'Other', value: 'other'},
]

// ─── TV Station document ───────────────────────────────────────────────────────

export default defineType({
  name: 'tvStation',
  title: 'TV Station',
  type: 'document',
  fields: [
    // ── Station identity ──────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'TV Station Name',
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
      name: 'viewership',
      title: 'Viewership',
      type: 'number',
      description: 'Total audience size or reach estimate',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'programmes',
      title: 'Programmes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of programme names broadcast by the station',
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Locations covered by the station, e.g. Lagos, Abuja',
    }),

    // ── Run of Spot (timed dropdown) ──────────────────────────────────────────
    defineField({
      name: 'runOfSpotPricing',
      title: 'Run of Spot Pricing',
      description: 'Select a duration and enter pricing for run-of-spot TV adverts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {list: secondsOptions},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pricing',
              title: 'Pricing',
              type: 'pricing',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'duration', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Run of spot pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),

    // ── Advert Spot (timed dropdown) ──────────────────────────────────────────
    defineField({
      name: 'advertSpotPricing',
      title: 'Advert Spot Pricing',
      description: 'Select a duration and enter pricing for advert spot placements',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {list: secondsOptions},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'pricing',
              title: 'Pricing',
              type: 'pricing',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'duration', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Advert spot pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),

    // ── Live Coverage (placeholder) ───────────────────────────────────────────
    defineField({
      name: 'liveCoveragePricing',
      title: 'Live Coverage Pricing',
      description: 'Add live coverage packages with descriptions and prices',
      type: 'array',
      of: [
        defineArrayMember({
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
            select: {title: 'name', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Live coverage pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),

    // ── Guest Appearance (placeholder) ────────────────────────────────────────
    defineField({
      name: 'guestAppearancePricing',
      title: 'Guest Appearance Pricing',
      description: 'Add guest appearance packages with descriptions and prices',
      type: 'array',
      of: [
        defineArrayMember({
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
            select: {title: 'name', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Guest appearance pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),

    // ── Sponsored Programme (placeholder) ────────────────────────────────────
    defineField({
      name: 'sponsoredProgrammePricing',
      title: 'Sponsored Programme Pricing',
      description: 'Add sponsored programme packages with descriptions and prices',
      type: 'array',
      of: [
        defineArrayMember({
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
            select: {title: 'name', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Sponsored programme pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),

    // ── Announcement (placeholder) ────────────────────────────────────────────
    defineField({
      name: 'announcementPricing',
      title: 'Announcement Pricing',
      description: 'Add announcement packages with descriptions and prices',
      type: 'array',
      of: [
        defineArrayMember({
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
            select: {title: 'name', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Announcement pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        }),
      ],
    }),
  ],
})
