import {defineType, defineField} from 'sanity'

const currencyOptions = [
  {title: 'Nigerian Naira (NGN)', value: 'ngn'},
  {title: 'US Dollar (USD)', value: 'usd'},
  {title: 'Ghanaian Cedi (GHS)', value: 'ghs'},
  {title: 'Kenyan Shilling (KES)', value: 'kes'},
  {title: 'British Pound (GBP)', value: 'gbp'},
  {title: 'Euro (EUR)', value: 'eur'},
]

export default defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  fields: [
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: currencyOptions,
      },
      initialValue: 'ngn',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Original listing price',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      price: 'price',
      basePrice: 'basePrice',
      currency: 'currency',
    },
    prepare({price, basePrice, currency}) {
      const val = price ?? basePrice
      return {
        title: val != null ? `${(currency || 'NGN').toUpperCase()} ${Number(val).toLocaleString()}` : 'No price',
      }
    },
  },
})
