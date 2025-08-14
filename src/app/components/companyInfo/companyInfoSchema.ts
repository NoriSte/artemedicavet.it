export const companyInfoSchema = {
  name: 'Clinica Veterinaria Artemedica',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Gavazzi 2',
    addressLocality: 'Valmadrera',
    addressRegion: 'LC',
    postalCode: '23868',
    addressCountry: 'IT',
  },
  telephone: '+390341203337',
  email: 'info@artemedicavet.it',
  additionalProperty: [
    {
      '@type': 'PropertyValue',
      name: 'Partita IVA',
      value: '03748770132',
    },
  ],
} as const
