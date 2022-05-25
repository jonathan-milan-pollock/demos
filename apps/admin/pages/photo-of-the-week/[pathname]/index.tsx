import React from 'react';

import { EntityType, ImagePublic } from '@dark-rush-photography/shared/types';
import { MainPage } from '@dark-rush-photography/admin/feature';

interface IndexProps {
  images: ImagePublic[];
}

function Index(props: IndexProps): JSX.Element {
  return <MainPage entityType={EntityType.PhotoOfTheWeek}></MainPage>;
}

export async function getStaticPaths() {
  return {
    paths: [
      '/photo-of-the-week/2023',
      '/photo-of-the-week/2022',
      '/photo-of-the-week/2021',
      '/photo-of-the-week/2020',
    ],
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {
      images: [{}] as ImagePublic[], // will get images for events
    },
  };
}

export default Index;
