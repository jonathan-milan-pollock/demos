export const formatJsonLdStory = (): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['TouristDestination'],
    url: 'http://www.disneylandparis.it/',
    name: 'Disneyland Paris',
    description:
      "It's an amusement park in Marne-la-Vallée, near Paris, in France and is the most visited theme park in all of France and Europe.",
    includesAttraction: [
      {
        '@type': ['LocalBusiness', 'TouristAttraction'],
        name: 'Bodegas Protos',
        sameAs: 'http://www.bodegasprotos.com',
        image:
          'https://commons.wikimedia.org/wiki/File%3AFoto_Bodega_Rogers2.jpg',
      },
      {
        '@type': ['City', 'TouristAttraction'],
        name: 'Peñafiel',
        image:
          'https://commons.wikimedia.org/wiki/File:Castillo_pe%C3%B1afiel_desde_plaza_coso_valladolid.jpg',
      },
    ],
    video: [
      {
        '@type': 'VideoObject',
      },
      {
        '@type': 'VideoObject',
      },
    ],
  });
};
