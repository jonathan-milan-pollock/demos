import Head from 'next/head';
import React from 'react';

import { ImagePublic } from '@dark-rush-photography/shared/types';
import { AboutPage } from '@dark-rush-photography/website/feature';

interface IndexProps {
  images: ImagePublic[];
}

function Index(props: IndexProps): JSX.Element {
  return <AboutPage />;
}

export async function getStaticProps() {
  return {
    props: {
      images: [{}] as ImagePublic[], // will get images for events
    },
  };
}

export default Index;
