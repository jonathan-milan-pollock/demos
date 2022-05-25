import React from 'react';

import { EntityType, ImagePublic } from '@dark-rush-photography/shared/types';
import { MainPage } from '@dark-rush-photography/admin/feature';

interface IndexProps {
  images: ImagePublic[];
}

function Index(props: IndexProps): JSX.Element {
  return <MainPage entityType={EntityType.Event}></MainPage>;
}

export async function getStaticPaths() {
  return {
    paths: ['/events/2023', '/events/2022', '/events/2021', '/events/2020'],
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
