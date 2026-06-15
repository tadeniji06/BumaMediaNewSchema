import {defineType, defineField} from 'sanity'

const beltOptions = [
  {title: 'Prime Time (AAA)', value: 'prime_time_aaa'},
  {title: 'Regular Time (AA)', value: 'regular_time_aa'},
  {title: 'Overnight (A)', value: 'overnight_a'},
]

const secondsOptions = [
  {title: '60 Sec', value: '60_sec'},
  {title: '45 Sec', value: '45_sec'},
  {title: '30 Sec', value: '30_sec'},
  {title: '15 Sec', value: '15_sec'},
]

const minutesOptions = [
  {title: '60 Minutes', value: '60_minutes'},
  {title: '45 Minutes', value: '45_minutes'},
  {title: '30 Minutes', value: '30_minutes'},
  {title: '15 Minutes', value: '15_minutes'},
]

const wordCountOptions = [
  {title: '60 Words', value: '60_words'},
  {title: '45 Words', value: '45_words'},
  {title: '30 Words', value: '30_words'},
  {title: '15 Words', value: '15_words'},
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
              options: {list: beltOptions},
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
              name: 'duration',
              title: 'Duration',
              type: 'string',
              options: {list: minutesOptions},
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
              name: 'wordCount',
              title: 'Word Count',
              type: 'string',
              options: {list: wordCountOptions},
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
            select: {title: 'wordCount', price: 'pricing.basePrice', currency: 'pricing.currency'},
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
      type: 'pricing',
    }),
  ],
})
