import {defineType, defineField, defineArrayMember} from 'sanity'

const mediaCategoryOptions = [
  {title: 'Print / Newspaper', value: 'print_newspaper'},
  {title: 'Online / Digital News', value: 'online_digital_news'},
  {title: 'Magazine / Periodical', value: 'magazine'},
  {title: 'PR & Communications Agency', value: 'pr_agency'},
  {title: 'TV News Media', value: 'tv_news'},
  {title: 'Radio News Media', value: 'radio_news'},
  {title: 'Newswire / Press Release Distribution', value: 'newswire_pr'},
]

const contentCategoryOptions = [
  {title: 'General News', value: 'general_news'},
  {title: 'Business & Finance', value: 'business_finance'},
  {title: 'Politics & Governance', value: 'politics_governance'},
  {title: 'Tech & Innovation', value: 'tech_innovation'},
  {title: 'Lifestyle & Entertainment', value: 'lifestyle_entertainment'},
  {title: 'Health & Wellness', value: 'health_wellness'},
  {title: 'Real Estate & Construction', value: 'real_estate'},
  {title: 'Energy & Oil/Gas', value: 'energy_oil_gas'},
  {title: 'Sports', value: 'sports'},
  {title: 'Fashion & Culture', value: 'fashion_culture'},
]

const audienceTypeOptions = [
  {title: 'General Public (Mass Market)', value: 'mass_market'},
  {title: 'Business-to-Business (B2B)', value: 'b2b'},
  {title: 'Policy Makers & Government', value: 'policy_makers'},
  {title: 'High-Net-Worth Individuals (HNWI)', value: 'hnwi'},
  {title: 'Corporate Executives & Decision Makers', value: 'executives'},
  {title: 'Youth & Gen Z', value: 'youth_gen_z'},
  {title: 'Tech Enthusiasts & Professionals', value: 'tech_professionals'},
]

const specialPositionOptions = [
  {title: 'Front Page Strip / Bottom', value: 'front_page_strip'},
  {title: 'Back Page Full', value: 'back_page_full'},
  {title: 'Back Page Strip', value: 'back_page_strip'},
  {title: 'Inside Front Cover (IFC)', value: 'inside_front_cover'},
  {title: 'Inside Back Cover (IBC)', value: 'inside_back_cover'},
  {title: 'Center Spread Full Page', value: 'center_spread'},
  {title: 'Page 2 / Page 3 Premium', value: 'page_2_3_premium'},
  {title: 'Wrap Around (Front & Back)', value: 'wrap_around'},
  {title: 'Header Banner (Online)', value: 'online_header_banner'},
  {title: 'Sponsored Editorial / Op-Ed', value: 'sponsored_editorial'},
]

export default defineType({
  name: 'prMedia',
  title: 'PR x Media',
  type: 'document',
  fieldsets: [
    {name: 'identity', title: 'Media Agency / Outlet Profile', options: {collapsible: true, collapsed: false}},
    {name: 'rates', title: 'Standard Advertising & PR Rates', options: {collapsible: true, collapsed: false}},
    {name: 'specialPlacements', title: 'Special Positions & Custom Packages', options: {collapsible: true, collapsed: false}},
    {name: 'contactInfo', title: 'Contact & Company Details', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // ── Agency / Outlet Identity ──────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Media Agency / Outlet Name',
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
      name: 'mediaCategories',
      title: 'Media Categories',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      options: {list: mediaCategoryOptions},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverage',
      title: 'Coverage',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      description: 'Geographic circulation / coverage, e.g. National, Lagos, Abuja, Regional',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'identity',
      description: 'Headquarters location, e.g. Victoria Island, Lagos',
    }),
    defineField({
      name: 'contentCategory',
      title: 'Content Category',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      options: {list: contentCategoryOptions},
    }),
    defineField({
      name: 'audienceType',
      title: 'Audience Type',
      type: 'array',
      fieldset: 'identity',
      of: [{type: 'string'}],
      options: {list: audienceTypeOptions},
    }),

    // ── Standard Advertising & PR Rates ───────────────────────────────────────
    defineField({
      name: 'publicNoticeBlackPricing',
      title: 'Public Notice (Black & White)',
      type: 'pricing',
      fieldset: 'rates',
    }),
    defineField({
      name: 'productsColourPricing',
      title: 'Products (Colour)',
      type: 'pricing',
      fieldset: 'rates',
    }),
    defineField({
      name: 'productsBlackPricing',
      title: 'Products (Black & White)',
      type: 'pricing',
      fieldset: 'rates',
    }),
    defineField({
      name: 'politicsColorPricing',
      title: 'Politics (Colour)',
      type: 'pricing',
      fieldset: 'rates',
    }),
    defineField({
      name: 'politicsBlackPricing',
      title: 'Politics (Black & White)',
      type: 'pricing',
      fieldset: 'rates',
    }),
    defineField({
      name: 'allureRatePricing',
      title: 'Allure Rate',
      type: 'pricing',
      fieldset: 'rates',
    }),

    // ── Special Positions & Custom Packages ───────────────────────────────────
    defineField({
      name: 'specialPositions',
      title: 'Special Positions Pricing',
      type: 'array',
      fieldset: 'specialPlacements',
      description: 'Add special positions (e.g. Front page strip, Center spread, Wrap around) with pricing.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {list: specialPositionOptions},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'pricing',
              title: 'Pricing',
              type: 'pricing',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'position', price: 'pricing.price', basePrice: 'pricing.basePrice', currency: 'pricing.currency'},
            prepare: ({title, price, basePrice, currency}) => {
              const val = price ?? basePrice
              return {
                title: title ? title.replace(/_/g, ' ').toUpperCase() : 'Special position',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'customPackages',
      title: 'Additional Placements & PR Packages',
      type: 'array',
      fieldset: 'specialPlacements',
      description: 'Add custom PR or media packages (e.g. Press Release Distribution, Media Tour, Op-Ed).',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Package / Placement Name',
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
                title: title || 'Custom package',
                subtitle: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price entered',
              }
            },
          },
        }),
      ],
    }),

    // ── Contact & Company Details ─────────────────────────────────────────────
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      fieldset: 'contactInfo',
    }),
    defineField({
      name: 'companyEmail',
      title: 'Company Email',
      type: 'string',
      fieldset: 'contactInfo',
    }),
    defineField({
      name: 'companyPhone',
      title: 'Company Phone Number',
      type: 'string',
      fieldset: 'contactInfo',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      fieldset: 'contactInfo',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      fieldset: 'contactInfo',
      description: 'Role of contact person, e.g. Lead Publicist, Media Buyer, Agency Director',
    }),
  ],
})
