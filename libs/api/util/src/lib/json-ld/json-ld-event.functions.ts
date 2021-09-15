export const formatJsonLdStory = (): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://example.com/my-news-article',
    },
    headline: 'Article headline',
    image: [
      'https://patrickcoombe.com/wp-content/uploads/2014/05/patrick-coombe.jpg',
      'https://example.com/photos/4x3/photo.jpg',
      'https://example.com/photos/16x9/photo.jpg',
    ],
    datePublished: '2019-01-05T08:00:00+08:00',
    dateModified: '2019-01-05T09:20:00+08:00',
    author: {
      '@type': 'Person',
      name: 'Dark Rush',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dark Rush Photography',
      logo: {
        '@type': 'ImageObject',
        url:
          'https://elitestrategies-elitestrategies.netdna-ssl.com/wp-content/uploads/2013/04/elitestrategies.png',
      },
    },
    description: 'A most wonderful article',
  });
};
