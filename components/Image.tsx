import * as React from 'react';

/*
    <source
      media='(min-width: 1000px)'
      srcSet='kookaburra_large_1x.jpg 1x, kookaburra_large_2x.jpg 2x'
    />
    <source
      media='(min-width: 500px)'
      srcSet='kookaburra_medium_1x.jpg 1x, kookaburra_medium_2x.jpg 2x'
    />
 */
const Image = () => (
  <picture>
    <img
      srcSet='https://dark-rush-photography-images.azureedge.net/dark-rush-photography-photo-of-the-week/through-the-looking-glass/best-of-image/small/through-the-looking-glass-1.jpg'
      alt='logo'
    />
  </picture>
);

export default Image;
