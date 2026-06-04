import {defineType, defineField} from 'sanity'

import {countryOptions} from './billboardLocations'
import CityStateInput from './CityStateInput'

const displayTypeOptions = [
  {title: 'Gantry', value: 'gantry'},
  {title: 'Unipole', value: 'unipole'},
  {title: 'Digital Billboard', value: 'digital_billboard'},
  {title: 'LED Screen', value: 'led_screen'},
  {title: 'Wall Panel', value: 'wall_panel'},
  {title: 'Wall Drape', value: 'wall_drape'},
  {title: 'Entrance Arcade', value: 'entrance_arcade'},
  {title: 'Backlit', value: 'backlit'},
  {title: 'Lintel', value: 'lintel'},
  {title: 'Rooftop', value: 'rooftop'},
  {title: '48 Sheet', value: '48_sheet'},
  {title: '96 Sheet', value: '96_sheet'},
  {title: 'Bridge Panel', value: 'bridge_panel'},
  {title: 'Portrait', value: 'portrait'},
  {title: 'Landscape', value: 'landscape'},
]

const billboardSizeOptions = [
  {title: 'Small', value: 'small'},
  {title: 'Medium', value: 'medium'},
  {title: 'Large', value: 'large'},
  {title: '48 Sheet', value: '48_sheet'},
  {title: '96 Sheet', value: '96_sheet'},
  {title: 'Custom', value: 'custom'},
]

const availabilityOptions = [
  {title: 'Available', value: 'available'},
  {title: 'Booked', value: 'booked'},
  {title: 'Reserved', value: 'reserved'},
  {title: 'Maintenance', value: 'maintenance'},
]

export default defineType({
  name: 'billboard',
  title: 'OOH / Billboard',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: displayTypeOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'billboardSize',
      title: 'Billboard Size',
      type: 'string',
      options: {
        list: billboardSizeOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: availabilityOptions,
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      options: {
        list: countryOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cityState',
      title: 'City / State',
      type: 'string',
      description: 'Select country first, then choose a city/state.',
      components: {
        input: CityStateInput,
      },
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const country = (context.document?.country as string | undefined) ?? ''
          if (!value || !country) return true
          return value.startsWith(`${country}:`)
            ? true
            : 'City/State must belong to the selected country.'
        }),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'pricing',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
