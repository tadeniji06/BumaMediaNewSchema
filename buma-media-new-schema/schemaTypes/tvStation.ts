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
  {title: 'State / Regional', value: 'state_regional'},
  {title: 'Commercial', value: 'commercial'},
  {title: 'Religious', value: 'religious'},
  {title: 'International', value: 'international'},
  {title: 'Other', value: 'other'},
]

const transmissionTypeOptions = [
  {title: 'Terrestrial', value: 'terrestrial'},
  {title: 'Satellite (DStv, GOtv, StarTimes)', value: 'satellite'},
  {title: 'Cable', value: 'cable'},
  {title: 'Digital Terrestrial Television (DTT)', value: 'digital_terrestrial'},
  {title: 'Free-to-Air (FTA)', value: 'free_to_air'},
  {title: 'IPTV / Online Streaming', value: 'iptv_online'},
]

// ─── TV Station document ───────────────────────────────────────────────────────

export default defineType({
  name: 'tvStation',
  title: 'TV Station',
  type: 'document',
  fieldsets: [
    {name: 'identity', title: 'Station Identity', options: {collapsible: true, collapsed: false}},
    {name: 'ownershipContact', title: 'Ownership & Contact Details', options: {collapsible: true, collapsed: false}},
    {name: 'rateCards', title: 'Rate Cards & Pricing', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // ── Station identity ──────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'TV Station Name',
      type: 'string',
      fieldset: 'identity',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      fieldset: 'identity',
      options: {hotspot: true},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      fieldset: 'identity',
      options: {list: categoryOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transmissionType',
      title: 'Transmission Type',
      type: 'string',
      fieldset: 'identity',
      options: {list: transmissionTypeOptions},
      description: 'e.g. Terrestrial, Satellite, Cable, DTT, IPTV',
    }),
    defineField({
      name: 'programmes',
      title: 'Programmes',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'List of programme names broadcast by the station',
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'Locations covered by the station, e.g. Lagos, Abuja, Nationwide',
    }),
    defineField({
      name: 'advertType',
      title: 'Advert Type',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'Types of adverts accepted, e.g. Commercials, Infomercials, Billboards, Lower Thirds, Crawlers',
      options: {
        list: [
          {title: 'Spot Commercial', value: 'spot_commercial'},
          {title: 'Infomercial', value: 'infomercial'},
          {title: 'Billboard / Bumper', value: 'billboard_bumper'},
          {title: 'Lower Third / Ticker / Crawler', value: 'lower_third_ticker'},
          {title: 'Programme Sponsorship', value: 'programme_sponsorship'},
          {title: 'Live Squeeze Back', value: 'squeeze_back'},
          {title: 'Time Check', value: 'time_check'},
        ],
      },
    }),

    // ── Ownership & Contact ───────────────────────────────────────────────────
    defineField({
      name: 'mediaOwner',
      title: 'Media Owner',
      type: 'string',
      fieldset: 'ownershipContact',
      description: 'Entity or parent company that owns the station',
    }),
    defineField({
      name: 'ownershipGroup',
      title: 'Ownership Group',
      type: 'string',
      fieldset: 'ownershipContact',
      description: 'e.g. Private, State Government, Federal Government, Network Group',
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
      description: 'Role of contact person, e.g. Head of Commercial, Marketing Director',
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      fieldset: 'ownershipContact',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      fieldset: 'ownershipContact',
    }),

    // ── Run of Spot (timed dropdown) ──────────────────────────────────────────
    defineField({
      name: 'runOfSpotPricing',
      title: 'Run of Spot Pricing',
      description: 'Select a duration and enter pricing for run-of-spot TV adverts',
      type: 'array',
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Run of spot pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
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
      fieldset: 'rateCards',
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
            select: {title: 'duration', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace('_', ' ').toUpperCase() : 'Advert spot pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
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
      fieldset: 'rateCards',
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
            select: {title: 'name', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title || 'Live coverage pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
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
      fieldset: 'rateCards',
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
            select: {title: 'name', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title || 'Guest appearance pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
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
      fieldset: 'rateCards',
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
            select: {title: 'name', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title || 'Sponsored programme pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
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
      fieldset: 'rateCards',
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
            select: {title: 'name', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title || 'Announcement pricing',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        }),
      ],
    }),
  ],
})
