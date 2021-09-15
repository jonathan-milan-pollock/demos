export const formatJsonLdStory = (): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'http://example.com/peanut-butter-cookies.html',
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'http://example.com/triple-chocolate-chunk.html',
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'http://example.com/snickerdoodles.html',
      },
    ],
  });
};
