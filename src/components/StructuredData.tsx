import React from 'react';

const StructuredData: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    '@id': 'https://floristssy.com/#florist',
    'name': 'Florist SSY',
    'image': 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOBezEnOkXa_JG5txXSaNZb36cMH99W9NkEqnWViN31w3gps4mP21gTVhXhR5wI7CLGs9lxBBT0zkeLMilRfwNRphqv4ssmwSiZYsBPnNXezmwLcc4o76vqRQqHzNVBbvIPhe-Qb4ENeCaw2ma1m8rmMDuehSShx_Ojo4N4e1xiBrS37QS6_EjOssj_NZr2vpUB_QmAM4Kf5hCstt3tF0EuebA4jGOA6ElfJdw2_Tf2-9j9vCQoXaPxp-oK54vaq5OFK9Cf2q-1cU',
    'description': "Creating romantic & refined floral moments for weddings and destinations. Buford, Atlanta, Georgia. Now booking 2026/2027 weddings.",
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Buford',
      'addressLocality': 'Atlanta',
      'addressRegion': 'GA',
      'addressCountry': 'US',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '34.1207',
      'longitude': '-84.0044',
    },
    'email': 'hello@floristssy.com',
    'url': 'https://floristssy.com',
    'priceRange': '$$$$',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        'opens': '09:00',
        'closes': '18:00',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default StructuredData;
