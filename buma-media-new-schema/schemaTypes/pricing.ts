import {defineType, defineField} from 'sanity'
import AutoMarkupPriceInput from './AutoMarkupPriceInput'

const currencyOptions = [
  {title: 'US Dollar (USD)', value: 'usd'},
  {title: 'Nigerian Naira (NGN)', value: 'ngn'},
  {title: 'Ghanaian Cedi (GHS)', value: 'ghs'},
  {title: 'Kenyan Shilling (KES)', value: 'kes'},
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'priceWithMarkup',
      title: 'Price With 30% Markup',
      type: 'number',
      readOnly: true,
      description: 'Automatically calculated as Base Price x 1.30.',
      components: {
        input: AutoMarkupPriceInput,
      },
    }),
  ],
})
