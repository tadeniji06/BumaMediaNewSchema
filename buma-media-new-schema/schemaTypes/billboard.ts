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
  {title: 'Lamp Poles', value: 'lamp_poles'},
  {title: 'Circular', value: 'circular'},
  {title: 'Eye catcher', value: 'eye_catcher'},
  {title: 'Under pass pillar', value: 'under_pass_pillar'},
  {title: 'Building branding', value: 'building_branding'},
  {title: 'Bus branding', value: 'bus_branding'},
  {title: 'Portrait', value: 'portrait'},
  {title: 'Landscape', value: 'landscape'},
  {title: 'Mega board', value: 'mega_board'},
  {title: 'Static Wrap', value: 'static_wrap'},
  {title: 'Lightbox', value: 'lightbox'},
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
  fieldsets: [
    {name: 'siteInfo', title: 'Site & Specification', options: {collapsible: true, collapsed: false}},
    {name: 'locationInfo', title: 'Location & Geo-Coordinates', options: {collapsible: true, collapsed: false}},
    {name: 'agencyContact', title: 'Agency & Contact Details', options: {collapsible: true, collapsed: false}},
    {name: 'pricingAvailability', title: 'Pricing & Availability', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    // ── Site & Specification ──────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Site Name / Agency Title',
      type: 'string',
      fieldset: 'siteInfo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'agency',
      title: 'Agency Name',
      type: 'string',
      fieldset: 'siteInfo',
      description: 'The OOH media owner or agency running the board',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      fieldset: 'siteInfo',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      fieldset: 'siteInfo',
      rows: 4,
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      fieldset: 'siteInfo',
      options: {
        list: displayTypeOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'billboardSize',
      title: 'Billboard Size',
      type: 'string',
      fieldset: 'siteInfo',
      options: {
        list: billboardSizeOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'billboardDimensions',
      title: 'Billboard Dimension (e.g. 12ft x 24ft / 24M x 14M)',
      type: 'string',
      fieldset: 'siteInfo',
      description: 'Enter the exact billboard dimensions.',
    }),

    // ── Location & Geo-Coordinates ────────────────────────────────────────────
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      fieldset: 'locationInfo',
      options: {
        list: countryOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      fieldset: 'locationInfo',
      description: 'e.g. Lagos, Rivers, FCT Abuja',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'locationInfo',
      description: 'e.g. Ikeja, Lekki, Victoria Island, Port Harcourt',
    }),
    defineField({
      name: 'cityState',
      title: 'City / State Selector',
      type: 'string',
      fieldset: 'locationInfo',
      description: 'Dropdown helper for country city/state.',
      components: {
        input: CityStateInput,
      },
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      fieldset: 'locationInfo',
      description: 'e.g. 6.5244',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      fieldset: 'locationInfo',
      description: 'e.g. 3.3792',
    }),

    // ── Agency & Contact ──────────────────────────────────────────────────────
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      fieldset: 'agencyContact',
    }),
    defineField({
      name: 'contactPersonEmail',
      title: 'Contact Person Email',
      type: 'string',
      fieldset: 'agencyContact',
    }),
    defineField({
      name: 'contactPersonPhone',
      title: 'Contact Person Phone Number',
      type: 'string',
      fieldset: 'agencyContact',
    }),
    defineField({
      name: 'companyEmail',
      title: 'Company E-mail',
      type: 'string',
      fieldset: 'agencyContact',
    }),
    defineField({
      name: 'companyPhone',
      title: 'Company Phone Number',
      type: 'string',
      fieldset: 'agencyContact',
    }),

    // ── Pricing & Availability ────────────────────────────────────────────────
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      fieldset: 'pricingAvailability',
      options: {
        list: availabilityOptions,
      },
      initialValue: 'available',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'pricing',
      fieldset: 'pricingAvailability',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
