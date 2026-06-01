import {defineType, defineField} from 'sanity'

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

const countryOptions = [
  {title: 'Nigeria', value: 'nigeria'},
  {title: 'South Africa', value: 'south_africa'},
  {title: 'Ghana', value: 'ghana'},
  {title: 'Kenya', value: 'kenya'},
  {title: 'Angola', value: 'angola'},
  {title: 'Mozambique', value: 'mozambique'},
  {title: 'Benin Republic', value: 'benin_republic'},
  {title: "Cote d'Ivoire", value: 'cote_divoire'},
  {title: 'Namibia', value: 'namibia'},
  {title: 'Botswana', value: 'botswana'},
  {title: 'Zambia', value: 'zambia'},
]

const countryCityStateMap: Record<string, string[]> = {
  nigeria: [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT Abuja', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos',
    'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers (Port Harcourt)',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
  ],
  south_africa: [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
    'Mpumalanga', 'North West', 'Northern Cape', 'Western Cape',
  ],
  ghana: [
    'Ahafo', 'Ashanti', 'Bono', 'Bono East', 'Central', 'Eastern', 'Greater Accra',
    'North East', 'Northern', 'Oti', 'Savannah', 'Upper East', 'Upper West',
    'Volta', 'Western', 'Western North',
  ],
  kenya: [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa',
    'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi',
    'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos',
    'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Muranga', 'Nairobi',
    'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya',
    'Taita-Taveta', 'Tana River', 'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu',
    'Vihiga', 'Wajir', 'West Pokot',
  ],
  angola: [
    'Bengo', 'Benguela', 'Bie', 'Cabinda', 'Cuando Cubango', 'Cuanza Norte',
    'Cuanza Sul', 'Cunene', 'Huambo', 'Huila', 'Luanda', 'Lunda Norte',
    'Lunda Sul', 'Malanje', 'Moxico', 'Namibe', 'Uige', 'Zaire',
  ],
  mozambique: [
    'Cabo Delgado', 'Gaza', 'Inhambane', 'Manica', 'Maputo', 'Maputo City',
    'Nampula', 'Niassa', 'Sofala', 'Tete', 'Zambezia',
  ],
  benin_republic: [
    'Alibori', 'Atacora', 'Atlantique', 'Borgou', 'Collines', 'Couffo',
    'Donga', 'Littoral', 'Mono', 'Oueme', 'Plateau', 'Zou',
  ],
  cote_divoire: [
    'Abidjan', 'Bas-Sassandra', 'Comoe', 'Denguele', 'Goh-Djiboua', 'Lacs',
    'Lagunes', 'Montagnes', 'Sassandra-Marahoue', 'Savanes', 'Vallee du Bandama',
    'Woroba', 'Yamoussoukro', 'Zanzan',
  ],
  namibia: [
    'Erongo', 'Hardap', 'Karas', 'Kavango East', 'Kavango West', 'Khomas',
    'Kunene', 'Ohangwena', 'Omaheke', 'Omusati', 'Oshana', 'Oshikoto',
    'Otjozondjupa', 'Zambezi',
  ],
  botswana: [
    'Central', 'Ghanzi', 'Kgalagadi', 'Kgatleng', 'Kweneng', 'North East',
    'North West', 'South East', 'Southern',
  ],
  zambia: [
    'Central', 'Copperbelt', 'Eastern', 'Luapula', 'Lusaka', 'Muchinga',
    'Northern', 'North-Western', 'Southern', 'Western',
  ],
}

const getCityStateOptions = (countryValue?: string) => {
  if (!countryValue) return []

  return (countryCityStateMap[countryValue] ?? []).map((location) => ({
    title: location,
    value: `${countryValue}:${location.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`,
  }))
}

const cityStateOptions = countryOptions.flatMap((country) => getCityStateOptions(country.value))

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
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: displayTypeOptions,
      },
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
      description: 'Select a city/state. Options are grouped by country prefix.',
      options: {
        list: cityStateOptions,
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
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Cost of booking this billboard placement.',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
})
