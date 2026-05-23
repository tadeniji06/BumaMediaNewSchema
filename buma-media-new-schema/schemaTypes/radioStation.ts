import {defineType, defineField} from 'sanity'

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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Commercial', value: 'commercial'},
          {title: 'Marketing', value: 'marketing'},
          {title: 'Music', value: 'music'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
  ],
})
