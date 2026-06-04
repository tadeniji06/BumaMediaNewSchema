import {defineType, defineField} from 'sanity'

const timeBandOptions = [
  {title: 'Prime Time (AAA)', value: 'prime_time_aaa'},
  {title: 'Regular Time (AA)', value: 'regular_time_aa'},
  {title: 'Overnight (A)', value: 'overnight_a'},
]

export default defineType({
  name: 'radioStation',
  title: 'Radio Station',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Radio Station Name',
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
      name: 'listenership',
      title: 'Listenership',
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
      description: 'Locations covered by the station, e.g. Lagos, Port Harcourt',
    }),
    defineField({
      name: 'beltPricing',
      title: 'Belt Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'belt',
              title: 'Belt',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'belt', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Belt pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'jinglesPricing',
      title: 'Jingles Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Jingles pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'sponsoredProgrammePricing',
      title: 'Sponsored Programme Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Sponsored programme pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'spotAdvertPricing',
      title: 'Spot Advert Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Spot advert pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'liveAppearancePricing',
      title: 'Live Appearance Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Live appearance pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'announcementPricing',
      title: 'Announcement Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'Announcement pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'onAirHypePricing',
      title: 'On-Air Hype Pricing',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'timeBand',
              title: 'Time Band',
              type: 'string',
              options: {list: timeBandOptions},
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
            select: {title: 'timeBand', price: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, currency}) => ({
              title: title || 'On-Air hype pricing',
              subtitle: price ? `${currency?.toUpperCase() ?? ''} ${price}` : 'No price entered',
            }),
          },
        },
      ],
    }),
  ],
})
