export const formatJsonLdStory = (
  slug: string,
  title: string,
  seoDescription: string,
  datePublished: string,
  lovedImageUrls: string[]
): string => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://darkrushphotography.com/${slug}`,
    },
    headline: title,
    description: seoDescription,
    image: [...lovedImageUrls],
    datePublished, // TODO: verify that format '2019-01-05T08:00:00+08:00'
    author: {
      '@type': 'Person',
      name: 'Dark Rush',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dark Rush Photography',
      logo: {
        '@type': 'ImageObject',
        //TODO: Create this image
        url: 'https://darkrushphotography.com/dark-rush-photography.png',
      },
    },
  });
};
