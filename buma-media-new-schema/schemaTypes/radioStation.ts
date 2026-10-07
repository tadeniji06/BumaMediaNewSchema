import {defineType, defineField} from 'sanity'

const beltOptions = [
  {title: 'Prime Time (AAA)', value: 'prime_time_aaa'},
  {title: 'Regular Time (AA)', value: 'regular_time_aa'},
  {title: 'Overnight (A)', value: 'overnight_a'},
]

const secondsOptions = [
  {title: '15 Sec', value: '15_sec'},
  {title: '30 Sec', value: '30_sec'},
  {title: '45 Sec', value: '45_sec'},
  {title: '60 Sec', value: '60_sec'},
]

const minutesOptions = [
  {title: '15 Minutes', value: '15_minutes'},
  {title: '30 Minutes', value: '30_minutes'},
  {title: '45 Minutes', value: '45_minutes'},
  {title: '60 Minutes', value: '60_minutes'},
]

const wordCountOptions = [
  {title: '15 Words', value: '15_words'},
  {title: '30 Words', value: '30_words'},
  {title: '45 Words', value: '45_words'},
  {title: '60 Words', value: '60_words'},
]

const transmissionTypeOptions = [
  {title: 'FM (Frequency Modulation)', value: 'fm'},
  {title: 'AM (Amplitude Modulation)', value: 'am'},
  {title: 'Digital Audio Broadcasting (DAB)', value: 'dab'},
  {title: 'Internet / Online Radio', value: 'online'},
  {title: 'Shortwave (SW)', value: 'shortwave'},
  {title: 'Satellite Radio', value: 'satellite'},
]

const programmeTypeOptions = [
  {title: 'News & Current Affairs', value: 'news_current_affairs'},
  {title: 'Talk Shows & Discussion', value: 'talk_shows'},
  {title: 'Music & Entertainment', value: 'music_entertainment'},
  {title: 'Sports & Live Commentary', value: 'sports'},
  {title: 'Business & Economy', value: 'business_economy'},
  {title: 'Religious & Faith', value: 'religious_faith'},
  {title: 'Infotainment & Lifestyle', value: 'infotainment'},
  {title: 'Youth & Campus', value: 'youth_campus'},
]

export default defineType({
  name: 'radioStation',
  title: 'Radio Station',
  type: 'document',
  fieldsets: [
    {name: 'identity', title: 'Station Identity', options: {collapsible: true, collapsed: false}},
    {name: 'metadata', title: 'Station Details & Formats', options: {collapsible: true, collapsed: false}},
    {name: 'ownershipContact', title: 'Ownership & Contact', options: {collapsible: true, collapsed: false}},
    {name: 'rateCards', title: 'Rate Cards & Pricing', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // ── Station identity ──────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Radio Station Name',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'frequency',
      title: 'Frequency',
      type: 'string',
      fieldset: 'identity',
      description: 'e.g. 99.9 FM, 105.5 FM',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'identity',
      options: {hotspot: true},
    }),
    defineField({
      name: 'transmissionType',
      title: 'Transmission Type',
      type: 'string',
      fieldset: 'identity',
      options: {list: transmissionTypeOptions},
    }),
    defineField({
      name: 'listenership',
      title: 'Listenership',
      type: 'number',
      fieldset: 'identity',
      description: 'Total audience size or reach estimate',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'identity',
      description: 'e.g. Lagos, Nigeria / Abuja, Nigeria',
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'Locations covered by the station, e.g. Lagos, Port Harcourt, Southwest',
    }),

    // ── Station details & formats ─────────────────────────────────────────────
    defineField({
      name: 'programmes',
      title: 'Programmes',
      type: 'array',
      fieldset: 'metadata',
      of: [{type: 'string'}],
      description: 'List of programme names broadcast by the station',
    }),
    defineField({
      name: 'programmeType',
      title: 'Programme Type',
      type: 'array',
      fieldset: 'metadata',
      of: [{type: 'string'}],
      options: {list: programmeTypeOptions},
      description: 'Formats or genre focus of the radio station',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'array',
      fieldset: 'metadata',
      of: [{type: 'string'}],
      description: 'Broadcast languages (e.g. English, Pidgin, Yoruba, Hausa, Igbo)',
    }),

    // ── Ownership & Contact ───────────────────────────────────────────────────
    defineField({
      name: 'mediaOwner',
      title: 'Media Owner',
      type: 'string',
      fieldset: 'ownershipContact',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      fieldset: 'ownershipContact',
    }),
    defineField({
      name: 'stationManager',
      title: 'Station Manager',
      type: 'string',
      fieldset: 'ownershipContact',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      fieldset: 'ownershipContact',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      fieldset: 'ownershipContact',
      description: 'Role of contact person, e.g. Head of Programmes, Marketing Manager',
    }),

    // ── Rate Cards ────────────────────────────────────────────────────────────
    defineField({
      name: 'beltPricing',
      title: 'Belt Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'belt', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace(/_/g, ' ').toUpperCase() : 'Belt pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'jinglesPricing',
      title: 'Jingles Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Jingles pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sponsoredProgrammePricing',
      title: 'Sponsored Programme Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Sponsored programme pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'spotAdvertPricing',
      title: 'Spot Advert Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Spot advert pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'liveAppearancePricing',
      title: 'Live Appearance Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Live appearance pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'announcementPricing',
      title: 'Announcement Pricing',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'wordCount', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Announcement pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'onAirHypePricing',
      title: 'On-Air Hype Pricing',
      type: 'pricing',
      fieldset: 'rateCards',
    }),
  ],
})
